import { useState, FormEvent, useEffect } from 'react'
import { Product } from '../../../types'
import Input from '../../common/Input'
import Textarea from '../../common/Textarea'
import Select from '../../common/Select'
import Button from '../../common/Button'

interface UpdateProductFormProps {
  product: Product
  onSubmit: (data: Partial<Product>) => void
  onCancel: () => void
  isLoading?: boolean
}

const UpdateProductForm = ({ product, onSubmit, onCancel, isLoading }: UpdateProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>(product)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    setFormData(product)
  }, [product])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), imageUrl.trim()]
      })
      setImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index) || []
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Brand"
          value={formData.brand || ''}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          required
        />
        <Input
          label="SKU"
          value={formData.sku || ''}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          required
        />
        <Input
          label="Price"
          type="number"
          step="0.01"
          value={formData.price || 0}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          required
        />
        <Input
          label="Discount Price (optional)"
          type="number"
          step="0.01"
          value={formData.discountPrice || ''}
          onChange={(e) => setFormData({ ...formData, discountPrice: parseFloat(e.target.value) || undefined })}
        />
        <Input
          label="Stock Quantity"
          type="number"
          value={formData.stockQuantity || 0}
          onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
          required
        />
      </div>

      <Textarea
        label="Description"
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          label="Frame Type"
          value={formData.frameType || 'full-rim'}
          onChange={(e) => setFormData({ ...formData, frameType: e.target.value as Product['frameType'] })}
          options={[
            { value: 'full-rim', label: 'Full Rim' },
            { value: 'semi-rimless', label: 'Semi Rimless' },
            { value: 'rimless', label: 'Rimless' },
            { value: 'browline', label: 'Browline' },
            { value: 'cat-eye', label: 'Cat Eye' },
            { value: 'round', label: 'Round' },
            { value: 'square', label: 'Square' },
            { value: 'aviator', label: 'Aviator' }
          ]}
          required
        />
        <Select
          label="Frame Material"
          value={formData.frameMaterial || 'acetate'}
          onChange={(e) => setFormData({ ...formData, frameMaterial: e.target.value as Product['frameMaterial'] })}
          options={[
            { value: 'acetate', label: 'Acetate' },
            { value: 'metal', label: 'Metal' },
            { value: 'titanium', label: 'Titanium' },
            { value: 'plastic', label: 'Plastic' },
            { value: 'wood', label: 'Wood' },
            { value: 'carbon-fiber', label: 'Carbon Fiber' }
          ]}
          required
        />
        <Input
          label="Frame Color"
          value={formData.frameColor || ''}
          onChange={(e) => setFormData({ ...formData, frameColor: e.target.value })}
          required
        />
        <Select
          label="Lens Type"
          value={formData.lensType || 'single-vision'}
          onChange={(e) => setFormData({ ...formData, lensType: e.target.value as Product['lensType'] })}
          options={[
            { value: 'single-vision', label: 'Single Vision' },
            { value: 'bifocal', label: 'Bifocal' },
            { value: 'progressive', label: 'Progressive' },
            { value: 'reading', label: 'Reading' },
            { value: 'sunglasses', label: 'Sunglasses' }
          ]}
          required
        />
        <Select
          label="Gender"
          value={formData.gender || 'unisex'}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as Product['gender'] })}
          options={[
            { value: 'men', label: 'Men' },
            { value: 'women', label: 'Women' },
            { value: 'unisex', label: 'Unisex' },
            { value: 'kids', label: 'Kids' }
          ]}
          required
        />
        <div className="flex items-center gap-4 pt-8">
          <input
            type="checkbox"
            id="inStock"
            checked={formData.inStock}
            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            className="w-5 h-5 border-2 border-black rounded"
          />
          <label htmlFor="inStock" className="font-semibold text-black">
            In Stock
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Eye Size"
          type="number"
          value={formData.size?.eye || 50}
          onChange={(e) => setFormData({ ...formData, size: { ...formData.size!, eye: parseInt(e.target.value) || 50 } })}
          required
        />
        <Input
          label="Bridge Size"
          type="number"
          value={formData.size?.bridge || 18}
          onChange={(e) => setFormData({ ...formData, size: { ...formData.size!, bridge: parseInt(e.target.value) || 18 } })}
          required
        />
        <Input
          label="Temple Size"
          type="number"
          value={formData.size?.temple || 140}
          onChange={(e) => setFormData({ ...formData, size: { ...formData.size!, temple: parseInt(e.target.value) || 140 } })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2">Images</label>
        <div className="flex gap-2 mb-2">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="flex-1"
          />
          <Button type="button" onClick={addImage} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.images?.map((img, index) => (
            <div key={index} className="relative group">
              <img src={img} alt={`Product ${index + 1}`} className="w-20 h-20 object-cover border-2 border-black rounded-lg" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Product'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateProductForm

