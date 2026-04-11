import { AuthProvider } from "./AuthContext";
import { WishlistProvider } from "./WhishListContext";
import { CartProvider } from "./CartContext";   


const MainProvider = ({ children }) => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default MainProvider;


