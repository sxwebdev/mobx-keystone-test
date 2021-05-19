import { observer } from "mobx-react-lite";
import { useStoreKS } from "stores/";

const App: React.FC = observer(() => {
  const { todoList } = useStoreKS();

  return (
    <>
      <h3>mobx-keystone-test</h3>
      <div>
        {todoList.todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => todo.setDone(!todo.done)}
            style={{ color: todo.done ? "green" : "black" }}
            role="note"
            aria-hidden="true"
          >
            {todo.text}
          </div>
        ))}
      </div>
      <div>
        <h5>Total: {todoList.stats.total}</h5>
        <h5>Pending: {todoList.stats.pending}</h5>
        <h5>Done: {todoList.stats.done}</h5>
      </div>
    </>
  );
});

export default App;
