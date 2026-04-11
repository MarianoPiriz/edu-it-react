import { useContext, useEffect, useState, createContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
 
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {

      const isFavorite = prevWishlist.find((item) => item.id === product.id);

      if (isFavorite) {
      
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
       
        return [...prevWishlist, product];
      }
    });
  };

 
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => useContext(WishlistContext);