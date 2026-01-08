import { useState, FormEvent, useEffect } from 'react'
import { Product } from '../../../types'
import Input from '../../common/Input'
import Textarea from '../../common/Textarea'
import Select from '../../common/Select'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import AddBrandForm, { Brand } from '../brand/AddBrandForm'

interface UpdateProductFormProps {
  product: Product
  onSubmit: (data: Partial<Product>) => void
  onCancel: () => void
  isLoading?: boolean
}

const UpdateProductForm = ({ product, onSubmit, onCancel, isLoading }: UpdateProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>(product)
  const [imageUrl, setImageUrl] = useState('')
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [isCreatingBrand, setIsCreatingBrand] = useState(false)

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

  const handleCreateBrand = async (brandData: Partial<Brand>) => {
    setIsCreatingBrand(true)
    try {
      // TODO: Implement API call to create brand
      // const response = await fetch('/api/brands', { method: 'POST', ... })
      // const newBrand = await response.json()
      
      // For now, simulate brand creation
      const newBrand: Brand = {
        _id: Date.now().toString(),
        name: brandData.name || '',
        description: brandData.description,
        logo: brandData.logo,
        website: brandData.website,
        isActive: brandData.isActive ?? true
      }
      
      setBrands([...brands, newBrand])
      setFormData({ ...formData, brand: newBrand.name })
      setIsBrandModalOpen(false)
    } catch (error) {
      console.error('Error creating brand:', error)
    } finally {
      setIsCreatingBrand(false)
    }
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
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-semibold text-black">
              Brand
              <span className="text-red-600 ml-1">*</span>
            </label>
          </div>
          <div className="flex gap-2">
            <Select
              value={formData.brand || ''}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              options={[
                { value: '', label: 'Select a brand...' },
                ...brands.map(brand => ({ value: brand.name, label: brand.name })),
                ...(formData.brand && !brands.some(b => b.name === formData.brand)
                  ? [{ value: formData.brand, label: formData.brand }]
                  : [])
              ]}
              required
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsBrandModalOpen(true)}
            >
              + New
            </Button>
          </div>
        </div>
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
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Primary Color"
          value={formData.frameColor?.primary || ''}
          onChange={(e) => setFormData({ ...formData, frameColor: { ...(formData.frameColor || {}), primary: e.target.value } })}
          required
        />
        <Input
          label="Secondary Color (optional)"
          value={formData.frameColor?.secondary || ''}
          onChange={(e) => setFormData({ ...formData, frameColor: { ...(formData.frameColor || {}), secondary: e.target.value || undefined } })}
        />
        <Select
          label="Finish (optional)"
          value={formData.frameColor?.finish || ''}
          onChange={(e) => setFormData({ ...formData, frameColor: { ...(formData.frameColor || {}), finish: e.target.value as 'matte' | 'glossy' | 'satin' | 'metallic' || undefined } })}
          options={[
            { value: '', label: 'None' },
            { value: 'matte', label: 'Matte' },
            { value: 'glossy', label: 'Glossy' },
            { value: 'satin', label: 'Satin' },
            { value: 'metallic', label: 'Metallic' }
          ]}
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

      <Modal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        title="Create New Brand"
      >
        <AddBrandForm
          onSubmit={handleCreateBrand}
          onCancel={() => setIsBrandModalOpen(false)}
          isLoading={isCreatingBrand}
        />
      </Modal>
    </form>
  )
}

export default UpdateProductForm

