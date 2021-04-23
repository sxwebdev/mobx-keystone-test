import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider2, myRootStore } from "stores2";
import App from "./App";

ReactDOM.render(
  <StoreProvider2 value={myRootStore}>
    <Router>
      <App />
    </Router>
  </StoreProvider2>,
  document.querySelector("#root")
);
