import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameRoute from "./routes/GameRoute";
import IndexRoute from "./routes/IndexRoute";

function App() {
  return (
    <Router>
      <main style={{ margin: "5px" }}>
        <Switch>
          <Route exact path="/game/:gameId" component={GameRoute} />
          <Route path="/" component={IndexRoute} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
