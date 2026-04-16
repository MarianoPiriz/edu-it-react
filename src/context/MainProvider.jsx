import { AuthProvider } from './AuthContext';
import { FavoritesProvider } from './FavoritesContext';
import { CartProvider } from './CartContext';
import { ToastProvider } from './ToastContext';

const MainProvider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>{children}</CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default MainProvider;
