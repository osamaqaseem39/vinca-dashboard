import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  children: ReactNode
}

const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-xl font-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 border-2 border-black focus:ring-black',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-100 focus:ring-black',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 focus:ring-red-600',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:ring-black'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

