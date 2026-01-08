import { useNavigate } from 'react-router-dom'
import { Product } from '../../types'
import AddProductForm from '../../components/forms/product/AddProductForm'
import Button from '../../components/common/Button'

const AddProduct = () => {
  const navigate = useNavigate()

  const handleSubmit = (data: Partial<Product>) => {
    console.log('Add product:', data)
    // Implement API call
    // After success, navigate back
    navigate('/products')
  }

  const handleCancel = () => {
    navigate('/products')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/products')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-black">Add Product</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <AddProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

export default AddProduct

