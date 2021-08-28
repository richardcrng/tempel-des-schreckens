import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameRoute from "./routes/GameRoute";
import IndexRoute from "./routes/IndexRoute";

function App() {
  useEffect(() => {
    // https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html#comment-4634921967
    function setDocHeight() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`
      );
    }

    setDocHeight();

    window.addEventListener("resize", setDocHeight);
    window.addEventListener("orientationchange", setDocHeight);

    return function cleanup() {
      window.removeEventListener('resize', setDocHeight);
      window.removeEventListener("orientationchange", setDocHeight);
    }
  })

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
