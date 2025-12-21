import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import { CartContextProvider } from "./contexts/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
