import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  children: ReactNode
}

const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 border-2 border-black',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-2 border-red-600',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

