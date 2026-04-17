import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useProductActions = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!user){
      navigate('/login');
      return;
    }
    addToCart(product);
    showToast(`'${product.title} Added to cart'`);
  };

  
  const handleToggleFavorite = (product) => {
    if (!user){
      navigate('/login');
      return;
    }
    const isFavorite = favorites.some(fav => fav.id === product.id);
    toggleFavorite(product);
    
    showToast(
      isFavorite
      ? `'${product.title} Removed from favorites'`
      : `'${product.title} Added to favorites'`
    );
  };
  const checkIfFavorite = (productId) => favorites.some((fav) => fav.id === productId);
  
  const buyNow = (product) => {
    navigate('/checkout', { state: { amount: product.price, products: [product],
      isBuyNow: true,
      shippingCost: product.price * 0.15} });
  };

  return {
    handleAddToCart,
    handleToggleFavorite,
    buyNow,
    favorites,
    checkIfFavorite
  };
};