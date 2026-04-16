import { useContext, useEffect, useState, createContext } from "react";


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
 
  const [favorites, setFavorites] = useState(() => {
    const savedWishlist = localStorage.getItem('favorites');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) =>{
      const isFavorite = favorites.find((fav)=> fav.id === product.id);
      if(isFavorite){
        const updateFavorites = favorites.filter((fav)=> fav.id !== product.id);
        setFavorites(updateFavorites);
      } else{
        setFavorites([...favorites, product]);
      }
    }

 
  const isInFavorites = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isInFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};


export const useFavorites = () => useContext(FavoritesContext);
