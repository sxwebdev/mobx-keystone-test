import React from "react";

import { observer } from "mobx-react-lite";
import { useStoreKS } from "stores2";

const App: React.FC = observer(() => {
  const { todoList } = useStoreKS();

  return (
    <>
      <h3>mobx-keystone-test</h3>
      <div>
        {todoList.todos.map((todo) => (
          <p key={todo.text}>{todo.text}</p>
        ))}
      </div>
    </>
  );
});

export default App;
