import React from "react";
import { computed } from "mobx";
import {
  model,
  Model,
  modelAction,
  ModelAutoTypeCheckingMode,
  registerRootStore,
  setGlobalConfig,
  //tProp,
  prop,
  //types,
} from "mobx-keystone";

setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn,
});

@model("nv/Todo")
export class Todo extends Model({
  //   id: tProp(types.string, () => uuidv4()),
  //   text: tProp(types.string),
  //   done: tProp(types.boolean, false),

  id: prop<string | undefined>(),
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
  //todos: tProp(types.array(types.model(Todo)), () => []),
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

// export function createRootStore(): TodoList {
//   const rootStore = new TodoList({
//     todos: [
//       new Todo({ text: "make mobx-keystone awesome!" }),
//       new Todo({ text: "spread the word" }),
//       new Todo({ text: "buy some milk", done: true }),
//     ],
//   });

//   registerRootStore(rootStore);

//   return rootStore;
// }

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
      new Todo({ text: "buy some milk", done: true }),
    ],
  }),
});

registerRootStore(myRootStore);

const StoreContext2 = React.createContext<RootStore>({} as RootStore);

export const useStoreKS: () => RootStore = () =>
  React.useContext(StoreContext2) as RootStore;
export const StoreProvider2 = StoreContext2.Provider;

export type { RootStore };
