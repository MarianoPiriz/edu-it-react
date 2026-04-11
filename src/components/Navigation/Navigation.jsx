import {Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { IoGlobeOutline } from "react-icons/io5";




const Navigation = () => {
  const { user , logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className ="flex items-center justify-between p-4 bg-transparent text-gray-500 border-b border-gray-300"> 
      <Link to="/">
        <IoGlobeOutline size={24} />
      </Link>

      <h1 className="text-2xl font-bold">Buy Online</h1>

      <div className="flex items-center gap-4">

      {user ? (
      <>
        <Link to="/cart">
        Carrito ({cart.length})
      </Link>
        <Link to="/favorites">
        Favoritos
      </Link>
      <div className="flex items-center gap-2">
        <span>Hi, {user.username}!</span>
        <button
          onClick={handleLogout}
          className="bg-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition-colors"
        >
          Logout
        </button>
      </div> 
      </> 
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </div>    
    </nav>
  )
}

export default Navigation
