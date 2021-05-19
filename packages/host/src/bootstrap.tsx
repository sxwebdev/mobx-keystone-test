import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider, myRootStore } from "@frontend/host/src/stores";
import App from "./App";

ReactDOM.render(
  <StoreProvider value={myRootStore}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.querySelector("#root")
);
