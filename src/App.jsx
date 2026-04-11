import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainProvider from "./context/MainProvider";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/Cart/CartPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";


export default function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
}
