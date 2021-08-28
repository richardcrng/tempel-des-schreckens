import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameRoute from "./routes/GameRoute";
import IndexRoute from "./routes/IndexRoute";

function App() {
  return (
    <Router>
      <main
        className='background'
        style={{
          backgroundImage: "url('/assets/tds-main.jpeg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className='active-area'>
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
