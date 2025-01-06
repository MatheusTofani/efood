import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./containers/footer";
import Hero from "./containers/hero";
import Main from "./containers/main";
import PratosRestaurante from "./containers/pratos"; 
import { GlobalStyle } from "./style";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Main />
              </>
            }
          />
          <Route path="/restaurantes/:id/pratos" element={<PratosRestaurante />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
