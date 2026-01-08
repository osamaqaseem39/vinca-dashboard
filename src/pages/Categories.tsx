import { useState } from 'react'
import { Category } from '../types'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'
import AddCategoryForm from '../components/forms/category/AddCategoryForm'
import UpdateCategoryForm from '../components/forms/category/UpdateCategoryForm'
import CategoryDetail from '../components/detail/CategoryDetail'

const Categories = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories] = useState<Category[]>([]) // Replace with actual data fetching

  const handleAdd = (data: Partial<Category>) => {
    console.log('Add category:', data)
    // Implement API call
    setShowAddModal(false)
  }

  const handleUpdate = (data: Partial<Category>) => {
    console.log('Update category:', data)
    // Implement API call
    setShowUpdateModal(false)
  }

  const handleDelete = () => {
    console.log('Delete category:', selectedCategory?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedCategory(null)
  }

  const handleViewDetail = (category: Category) => {
    setSelectedCategory(category)
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
        <h1 className="text-3xl font-bold text-black">Categories</h1>
        <Button onClick={() => setShowAddModal(true)}>Add Category</Button>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-semibold text-black">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Slug</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-600 font-medium">
                    No categories found. Click "Add Category" to create one.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-black">{category.name}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">{category.slug}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                        category.isActive
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-red-100 text-red-700 border border-red-300'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleViewDetail(category)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => { setSelectedCategory(category); setShowUpdateModal(true) }}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => { setSelectedCategory(category); setShowDeleteModal(true) }}>
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
        title="Add Category"
        footer={null}
      >
        <AddCategoryForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showUpdateModal}
        onClose={() => { setShowUpdateModal(false); setSelectedCategory(null) }}
        title="Update Category"
        footer={null}
      >
        {selectedCategory && (
          <UpdateCategoryForm
            category={selectedCategory}
            onSubmit={handleUpdate}
            onCancel={() => { setShowUpdateModal(false); setSelectedCategory(null) }}
          />
        )}
      </Modal>

      <Modal
        isOpen={showDetail}
        onClose={() => { setShowDetail(false); setSelectedCategory(null) }}
        title="Category Details"
        footer={null}
      >
        {selectedCategory && (
          <CategoryDetail
            category={selectedCategory}
            onEdit={handleEdit}
            onDelete={handleDeleteFromDetail}
          />
        )}
      </Modal>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setSelectedCategory(null) }}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        itemName={selectedCategory?.name}
      />
    </div>
  )
}

export default Categories

