import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";

function App() {
  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/rq-super-heroes" element={<SuperHeroesPage />} />
          <Route path="/super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
