
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal"; 
import Footer from "./containers/footer";
import Hero from "./containers/hero";
import Main from "./containers/main";
import PratosRestaurante from "./containers/pratos";
import { GlobalStyle } from "./style";
import Header from "./containers/header";
import RestauranteHeader from "./containers/restauranteHeader";
import ScrollToTop from "./components/scroll";

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
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
          <Route
            path="/restaurantes/:id/pratos"
            element={
              <>
                <Header />
                <RestauranteHeader />
                <PratosRestaurante />
              </>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
