import { useState, FormEvent } from 'react'
import Input from '../../common/Input'
import Textarea from '../../common/Textarea'
import Button from '../../common/Button'

export interface Brand {
  _id?: string
  name: string
  description?: string
  logo?: string
  website?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

interface AddBrandFormProps {
  onSubmit: (data: Partial<Brand>) => void
  onCancel: () => void
  isLoading?: boolean
}

const AddBrandForm = ({ onSubmit, onCancel, isLoading }: AddBrandFormProps) => {
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    description: '',
    logo: '',
    website: '',
    isActive: true
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Brand Name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Website (optional)"
          value={formData.website || ''}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          type="url"
        />
        <Input
          label="Logo URL (optional)"
          value={formData.logo || ''}
          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
        />
      </div>

      <Textarea
        label="Description (optional)"
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={4}
      />

      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-5 h-5 border-2 border-black rounded"
        />
        <label htmlFor="isActive" className="font-semibold text-black">
          Active
        </label>
      </div>

      {formData.logo && (
        <div>
          <p className="text-sm font-semibold text-black mb-2">Logo Preview</p>
          <img
            src={formData.logo}
            alt="Brand logo preview"
            className="w-32 h-32 object-contain border-2 border-black rounded-xl"
          />
        </div>
      )}

      <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !formData.name}>
          {isLoading ? 'Creating...' : 'Create Brand'}
        </Button>
      </div>
    </form>
  )
}

export default AddBrandForm

