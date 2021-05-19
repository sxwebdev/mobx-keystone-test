import React from "react";
import { computed } from "mobx";
import {
  model,
  Model,
  modelAction,
  ModelAutoTypeCheckingMode,
  registerRootStore,
  setGlobalConfig,
  prop,
  tProp,
  types,
} from "mobx-keystone";
import { v4 as uuidv4 } from "uuid";

setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
});

@model("mv/pets/nested")
export class PetsNested extends Model({
  name: prop(""),
  available: prop(true),
  count: prop(18),

  name2: tProp(types.string, ""),
  available2: tProp(types.boolean, true),
  count2: tProp(types.number, 18),
}) {}

@model("nv/pet")
export class Pet extends Model({
  id: prop(() => uuidv4()),
  name: prop<string>(),
}) {}

@model("nv/pets")
export class Pets extends Model({
  isLoading: prop(false),
  nested: prop<PetsNested>(),
  pets: prop<Pet[]>(() => []),
}) {}

@model("nv/Todo")
export class Todo extends Model({
  id: prop(() => uuidv4()),
  text: prop<string>(),
  done: prop<boolean>(false),
}) {
  @modelAction
  setDone(done: boolean): void {
    this.done = done;
  }

  @modelAction
  setText(text: string): void {
    this.text = text;
  }
}

@model("nv/TodoList")
export class TodoList extends Model({
  todos: prop<Todo[]>(() => []),
}) {
  @computed
  get pending(): Todo[] {
    return this.todos.filter((t) => !t.done);
  }

  @computed
  get done(): Todo[] {
    return this.todos.filter((t) => t.done);
  }

  @computed
  get stats(): { total: number; pending: number; done: number } {
    return {
      total: this.todos.length,
      pending: this.pending.length,
      done: this.done.length,
    };
  }

  @modelAction
  add(todo: Todo): void {
    this.todos.push(todo);
  }

  @modelAction
  remove(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }
}

@model("nv/RootStore")
export class RootStore extends Model({
  todoList: prop<TodoList>(),
  pets: prop<Pets>(),
}) {
  @modelAction
  setTodos(userPreferences: TodoList): void {
    this.todoList = userPreferences;
  }
}

export const myRootStore = new RootStore({
  todoList: new TodoList({
    todos: [
      new Todo({ text: "make mobx-keystone awesome!" }),
      new Todo({ text: "spread the word" }),
      new Todo({ text: "buy some milk 1", done: true }),
      new Todo({ text: "Some new text" }),
    ],
  }),
  pets: new Pets({
    nested: new PetsNested({}),
  }),
});

registerRootStore(myRootStore);

const StoreContext = React.createContext<RootStore>({} as RootStore);

export const useStore: () => RootStore = () =>
  React.useContext(StoreContext) as RootStore;
export const StoreProvider = StoreContext.Provider;
