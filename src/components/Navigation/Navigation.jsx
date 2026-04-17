import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { IoGlobeOutline, IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaCircleUser } from 'react-icons/fa6';
import { IoMdLogIn } from 'react-icons/io';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-transparent text-gray-500 border-b border-gray-300">
      <Link to="/" className="cursor-pointer hover:text-blue-600">
        <IoGlobeOutline size={24} />
      </Link>

      <h1 className="text-2xl font-bold">Buy Online!</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="relative flex items-center gap-4 text-xs">
              <Link to="/cart" className="cursor-pointer hover:text-blue-600">
                <IoCartOutline size={18} className="inline-block" />
                <span className="hidden md:inline-block">
                  Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                </span>
              </Link>
              <Link
                to="/favorites"
                className="cursor-pointer hover:text-blue-600"
              >
                <IoHeartOutline size={18} className="inline-block" />
                <span className="hidden md:inline-block">
                  Favorites ({favorites.length})
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 focus:outline-none cursor-poiter hover:text-blue-600"
                >
                  <FaCircleUser size={20} className="inline-block md:hidden" />
                  <span className="hidden md:inline-block text-gray-700">
                    Hi, {user.username}
                  </span>
                  <RiArrowDropDownLine
                    size={20}
                    className="hidden md:inline-block"
                  />
                </button>
                {isOpen && (
                  <div className="absolute right-0 top-5 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Profile
                      </Link>
                      <hr className="border-t border-gray-300" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <Link to="/login">
            <IoMdLogIn size={20} className="inline-block md:hidden" />
            <span className="hidden md:inline-block">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
