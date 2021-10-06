/* import { BrowserRouter, Route, Switch } from "react-router-dom"; */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav/MainNav";
import { Container } from "@mui/material";
import TrendPage from "./Pages/TrendPage/TrendPage";
import MoviePage from "./Pages/MoviePage/MoviePage";
import SearchPage from "./Pages/SearchPage/SearchPage";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" exact>
              <TrendPage />
            </Route>
            <Route path="/moviepage">
              <MoviePage />
            </Route>
            <Route path="/searchpage">
              <SearchPage />
            </Route>
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
