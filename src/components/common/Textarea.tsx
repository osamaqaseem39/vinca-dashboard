import { TextareaHTMLAttributes, LabelHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

const Textarea = ({ label, error, labelProps, className = '', ...props }: TextareaProps) => {
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
      <textarea
        className={`w-full px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-medium resize-none ${
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

export default Textarea

