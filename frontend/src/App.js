import "./App.css";
import { data } from "./data";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <a href="/">Shopping</a>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
