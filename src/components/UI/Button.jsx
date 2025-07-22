import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-400';
      case 'secondary':
        return 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-400';
      case 'outline':
        return 'border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 focus:ring-purple-400';
      case 'ghost':
        return 'text-gray-300 hover:bg-slate-700/50 focus:ring-slate-400';
      default:
        return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-400';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center rounded-lg font-medium
    transition-all duration-200 transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;