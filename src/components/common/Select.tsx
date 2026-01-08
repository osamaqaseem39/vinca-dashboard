import { SelectHTMLAttributes, LabelHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

const Select = ({ label, error, options, labelProps, className = '', ...props }: SelectProps) => {
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
      <select
        className={`w-full px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium bg-white ${
          error ? 'border-red-600' : ''
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Select

