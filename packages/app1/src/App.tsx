import { observer } from "mobx-react-lite";
import { useStore } from "@frontend/host/src/stores";

const App: React.FC = observer(() => {
  const { todoList, pets } = useStore();

  return (
    <>
      <h1>{todoList.todos[0].id}</h1>
      <h3>{pets.nested.name}</h3>
      <h3>{pets.nested.name2}</h3>
    </>
  );
});

export default App;
