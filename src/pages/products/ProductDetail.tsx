import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Product } from '../../types'
import ProductDetailComponent from '../../components/detail/ProductDetail'
import Button from '../../components/common/Button'
import DeleteConfirmModal from '../../components/delete/DeleteConfirmModal'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    // Fetch product by id
    // For now, using placeholder
    // TODO: Implement API call to fetch product
    console.log('Fetching product:', id)
  }, [id])

  const handleEdit = () => {
    navigate(`/products/${id}/edit`)
  }

  const handleDelete = () => {
    console.log('Delete product:', id)
    // Implement API call
    setShowDeleteModal(false)
    navigate('/products')
  }

  if (!product && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/products')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Product Details</h1>
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
        <h1 className="text-3xl font-bold text-black">Product Details</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {product && (
          <ProductDetailComponent
            product={product}
            onEdit={handleEdit}
            onDelete={() => setShowDeleteModal(true)}
          />
        )}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        itemName={product?.name}
      />
    </div>
  )
}

export default ProductDetail

