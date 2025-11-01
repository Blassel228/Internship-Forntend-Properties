import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'cancel' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  customSize?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-700 hover:bg-blue-900 text-white',
  secondary: 'bg-orange-500 hover:bg-orange-600 text-white',
  cancel: 'text-blue-600 hover:bg-blue-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const focusRingClasses: Record<ButtonVariant, string> = {
  primary: 'focus:ring-white focus:ring-offset-blue-700',
  secondary: 'focus:ring-white focus:ring-offset-orange-500',
  cancel: 'focus:ring-blue-500 focus:ring-offset-white',
  danger: 'focus:ring-white focus:ring-offset-red-600',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      customSize,
      fullWidth = false,
      className = '',
      children,
      type = 'button',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'font-medium rounded-md transition duration-200 cursor-pointer focus:outline-none focus:ring-2';
    const widthClass = fullWidth ? 'w-full' : 'w-auto';
    const variantClass = variantClasses[variant];
    const focusRingClass = focusRingClasses[variant];
    const sizeClass = customSize ?? sizeClasses[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
          baseClasses,
          widthClass,
          variantClass,
          sizeClass,
          focusRingClass,
          {
            'opacity-60 cursor-not-allowed': disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;