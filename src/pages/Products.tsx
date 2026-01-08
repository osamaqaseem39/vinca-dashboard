import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'
import AddProductForm from '../components/forms/product/AddProductForm'
import UpdateProductForm from '../components/forms/product/UpdateProductForm'
import ProductDetail from '../components/detail/ProductDetail'

const Products = () => {
  const navigate = useNavigate()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products] = useState<Product[]>([]) // Replace with actual data fetching

  const handleAdd = (data: Partial<Product>) => {
    console.log('Add product:', data)
    // Implement API call
    setShowAddModal(false)
  }

  const handleUpdate = (data: Partial<Product>) => {
    console.log('Update product:', data)
    // Implement API call
    setShowUpdateModal(false)
  }

  const handleDelete = () => {
    console.log('Delete product:', selectedProduct?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedProduct(null)
  }

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product)
    setShowDetail(true)
  }

  const handleEdit = () => {
    setShowDetail(false)
    setShowUpdateModal(true)
  }

  const handleDeleteFromDetail = () => {
    setShowDetail(false)
    setShowDeleteModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">Products</h1>
        <Button onClick={() => setShowAddModal(true)}>Add Product</Button>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-semibold text-black">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Brand</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-600 font-medium">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-black">{product.name}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">{product.brand}</td>
                    <td className="py-3 px-4 font-semibold text-black">${product.price}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">{product.stockQuantity}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleViewDetail(product)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => { setSelectedProduct(product); setShowUpdateModal(true) }}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => { setSelectedProduct(product); setShowDeleteModal(true) }}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Product"
        footer={null}
      >
        <AddProductForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showUpdateModal}
        onClose={() => { setShowUpdateModal(false); setSelectedProduct(null) }}
        title="Update Product"
        footer={null}
      >
        {selectedProduct && (
          <UpdateProductForm
            product={selectedProduct}
            onSubmit={handleUpdate}
            onCancel={() => { setShowUpdateModal(false); setSelectedProduct(null) }}
          />
        )}
      </Modal>

      <Modal
        isOpen={showDetail}
        onClose={() => { setShowDetail(false); setSelectedProduct(null) }}
        title="Product Details"
        footer={null}
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onEdit={handleEdit}
            onDelete={handleDeleteFromDetail}
          />
        )}
      </Modal>

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

