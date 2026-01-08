import { useState, FormEvent, useEffect } from 'react'
import { Category } from '../../../types'
import Input from '../../common/Input'
import Textarea from '../../common/Textarea'
import Button from '../../common/Button'

interface UpdateCategoryFormProps {
  category: Category
  onSubmit: (data: Partial<Category>) => void
  onCancel: () => void
  isLoading?: boolean
}

const UpdateCategoryForm = ({ category, onSubmit, onCancel, isLoading }: UpdateCategoryFormProps) => {
  const [formData, setFormData] = useState<Partial<Category>>(category)

  useEffect(() => {
    setFormData(category)
  }, [category])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Category Name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Slug"
          value={formData.slug || ''}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
          required
        />
        <Input
          label="Image URL"
          value={formData.image || ''}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>

      <Textarea
        label="Description"
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

      {formData.image && (
        <div>
          <p className="text-sm font-semibold text-black mb-2">Preview</p>
          <img
            src={formData.image}
            alt="Category preview"
            className="w-32 h-32 object-cover border-2 border-black rounded-xl"
          />
        </div>
      )}

      <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Category'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateCategoryForm

