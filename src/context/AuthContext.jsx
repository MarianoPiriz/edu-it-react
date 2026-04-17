import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = (newUser) => {
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];
    const existingUser = userDB.find(
      (user) => user.username === newUser.username
    );
    const userWithProfile = {
      ...newUser,
      profile: {
        personal: {},
        security: {},
        payment: {},
      },
    };
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }
    userDB.push(userWithProfile);
    localStorage.setItem('userDB', JSON.stringify(userDB));
    return { success: true, message: 'Registration successful, please login' };
  };
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (newData) => {
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];
    const userIndex = userDB.findIndex((u) => u.username === user.username);
    if (userIndex !== -1) {
      const updatedUser = {
        ...userDB[userIndex],
        profile: { ...userDB[userIndex].profile, ...newData },
      };
      userDB[userIndex] = updatedUser;
      localStorage.setItem('userDB', JSON.stringify(userDB));
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, message: 'Profile updated successfully' };
    } else {
      return { success: false, message: 'User not found' };
    }
  };

  const updateAccountPassword = (newPassword) => {
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];

    const userIndex = userDB.findIndex((u) => u.username === user.username);

    if (userIndex !== -1) {
      userDB[userIndex].password = newPassword;
      localStorage.setItem('userDB', JSON.stringify(userDB));

      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true, message: 'Password updated successfully' };
    } else {
      return { success: false, message: 'User not found' };
    }
  };

  const updatePaymentInfo = (newPaymentMethod) => {
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];
    const userIndex = userDB.findIndex((u) => u.username === user.username);
    if (userIndex !== -1) {
      userDB[userIndex].paymentMethod = newPaymentMethod;
      localStorage.setItem('userDB', JSON.stringify(userDB));
      const updatedUser = { ...user, paymentMethod: newPaymentMethod };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, message: 'Payment method updated successfully' };
    } else {
      return { success: false, message: 'User not found' };
    }
  };

  const addBillingAddress = (newAddress) => {
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];
    const userIndex = userDB.findIndex((u) => u.username === user.username);
    if (userIndex !== -1) {
      userDB[userIndex].billingAddress = newAddress;
      localStorage.setItem('userDB', JSON.stringify(userDB));
      const updatedUser = { ...user, billingAddress: newAddress };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, message: 'Billing address added successfully' };
    } else {
      return { success: false, message: 'User not found' };
    }
  };

  const addPurchase = (purchase) => {
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];
    const userIndex = userDB.findIndex((u) => u.username === user.username);

    if (userIndex !== -1) {
      const updatedUser = {
        ...userDB[userIndex],
        purchases: [...(userDB[userIndex].purchases || []), purchase],
      };
      userDB[userIndex] = updatedUser;

      localStorage.setItem('userDB', JSON.stringify(userDB));
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser); // Ahora sí, el estado de React se actualiza

      return { success: true };
    }
    return { success: false };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUserProfile,
        updateAccountPassword,
        updatePaymentInfo,
        addBillingAddress,
        addPurchase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
