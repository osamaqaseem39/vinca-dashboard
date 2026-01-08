import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Product } from '../../types'
import UpdateProductForm from '../../components/forms/product/UpdateProductForm'
import Button from '../../components/common/Button'

const UpdateProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Fetch product by id
    // For now, using placeholder
    // TODO: Implement API call to fetch product
    console.log('Fetching product:', id)
  }, [id])

  const handleSubmit = (data: Partial<Product>) => {
    console.log('Update product:', data)
    // Implement API call
    // After success, navigate back
    navigate('/products')
  }

  const handleCancel = () => {
    navigate('/products')
  }

  if (!product && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/products')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-light text-black tracking-wide">Update Product</h1>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/products')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-light text-black tracking-wide">Update Product</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {product && (
          <UpdateProductForm
            product={product}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default UpdateProduct

