import React from 'react'

const Toast = ({message, show}) => {
  return (
    <div className={`
      fixed bottom-10 left-1/2 -translate-x-1/2 
     bg-white text-gray-700 font-semibold text-md
     px-6 py-3 rounded shadow-lg
      transition-all duration-500 ease-in-out z-50
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
    `}>
      {message}
    </div>
  );
}

export default Toast
