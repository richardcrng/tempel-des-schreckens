import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameRoute from "./routes/GameRoute";
import IndexRoute from "./routes/IndexRoute";

function App() {
  return (
    <Router>
      <main
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: "url('/assets/tds-main.jpeg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "5px",
        }}
      >
        <div style={{ backgroundColor: 'white', opacity: '0.8', padding: '5px' }}>
          <Switch>
            <Route exact path="/game/:gameId" component={GameRoute} />
            <Route path="/" component={IndexRoute} />
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
