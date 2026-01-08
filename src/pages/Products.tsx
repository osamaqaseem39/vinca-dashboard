import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types'
import Button from '../components/common/Button'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'

const Products = () => {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products] = useState<Product[]>([]) // Replace with actual data fetching

  const handleDelete = () => {
    console.log('Delete product:', selectedProduct?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedProduct(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-black tracking-wide">Products</h1>
        <Button onClick={() => navigate('/products/add')}>Add Product</Button>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Name</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Brand</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Price</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Stock</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Status</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-600 font-light">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const getStockStatus = () => {
                    if (!product.inStock || product.stockQuantity === 0) {
                      return { label: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-50' }
                    }
                    if (product.stockQuantity <= 10) {
                      return { label: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-50' }
                    }
                    return { label: 'In Stock', color: 'text-green-600', bg: 'bg-green-50' }
                  }
                  const status = getStockStatus()
                  return (
                    <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-light text-black">{product.name}</td>
                      <td className="py-3 px-4 font-light text-gray-700">{product.brand}</td>
                      <td className="py-3 px-4 font-light text-black">${product.price}</td>
                      <td className="py-3 px-4 font-light text-gray-700">{product.stockQuantity}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bg}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => navigate(`/products/${product._id}`)}>
                            View
                          </Button>
                          <Button variant="secondary" onClick={() => navigate(`/products/${product._id}/edit`)}>
                            Edit
                          </Button>
                          <Button variant="danger" onClick={() => { setSelectedProduct(product); setShowDeleteModal(true) }}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setSelectedProduct(null) }}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        itemName={selectedProduct?.name}
      />
    </div>
  )
}

export default Products

