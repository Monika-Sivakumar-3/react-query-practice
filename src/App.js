import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQParallelQueries } from "./components/RQParallelQueries.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQDynamicParallelQueriesPage } from "./components/RQDynamicParallelQueries.page";
import { RQDependentQueriesPage } from "./components/RQDependentQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route
              path="/rq-dependent"
              element={<RQDependentQueriesPage email="vishwas@example.com" />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<RQDynamicParallelQueriesPage heroIds={[1, 3]} />}
            />
            <Route path="/rq-friends" element={<RQParallelQueries />} />
            <Route path="/rq-super-heroes/:id" element={<RQSuperHeroPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </>
      </Router>
      {/* React-Query comes with inbuilt dev tools
        We have two options floating and embedded
        We can send initialIsOpen(don't want to open devtools by default) prop and also style the toggle */}
      <ReactQueryDevtools initialIsOpen={false} />
      {/* Now you can see a button to open y=the dev tools by default it will be in left bottom */}
    </QueryClientProvider>
  );
}

export default App;
