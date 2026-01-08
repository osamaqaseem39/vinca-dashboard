import { InputHTMLAttributes, LabelHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

const Input = ({ label, error, labelProps, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          {...labelProps}
          className={`block text-sm font-semibold text-black mb-2 ${labelProps?.className || ''}`}
        >
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium ${
          error ? 'border-red-600' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input

