import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast/Toast'


const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast.message} show={toast.show} />
    </ToastContext.Provider>
  );
};
export const useToast = () => useContext(ToastContext);
