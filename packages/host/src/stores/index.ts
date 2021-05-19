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
} from "mobx-keystone";
import { v4 as uuidv4 } from "uuid";

setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
});

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
class RootStore extends Model({ todoList: prop<TodoList>() }) {
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
});

registerRootStore(myRootStore);

const StoreContext = React.createContext<RootStore>({} as RootStore);

export const useStoreKS: () => RootStore = () =>
  React.useContext(StoreContext) as RootStore;
export const StoreProvider = StoreContext.Provider;

export type { RootStore };
