import { AuthProvider } from './AuthContext';
import { FavoritesProvider } from './FavoritesContext';
import { CartProvider } from './CartContext';
import { ToastProvider } from './ToastContext';
import { ProductProvider } from './ProductContext';

const MainProvider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <FavoritesProvider>
            <CartProvider>{children}</CartProvider>
          </FavoritesProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default MainProvider;
