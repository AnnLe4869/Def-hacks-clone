import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./index.css";

// Context import
import AppContext from "./context/AppContext";

// Page component
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Learn from "./pages/learn";
// import Profile from "./pages/profile/ExistAccount";
import Auth from "./pages/auth/Login";

function App() {
  const context = useContext(AppContext);
  const { user } = context;
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/learn" component={Learn} />
        {user ? (
          <Route path="/auth" component={Auth} />
        ) : (
          <Route path="/auth" component={Auth} />
        )}

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
