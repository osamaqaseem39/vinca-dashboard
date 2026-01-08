import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Category } from '../types'
import Button from '../components/common/Button'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'

const Categories = () => {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories] = useState<Category[]>([]) // Replace with actual data fetching

  const handleDelete = () => {
    console.log('Delete category:', selectedCategory?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedCategory(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-black tracking-wide">Categories</h1>
        <Button onClick={() => navigate('/categories/add')}>Add Category</Button>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Name</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Slug</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Status</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-600 font-light">
                    No categories found. Click "Add Category" to create one.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-light text-black">{category.name}</td>
                    <td className="py-3 px-4 font-light text-gray-700">{category.slug}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-light ${
                        category.isActive
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : 'bg-red-100 text-red-700 border border-red-300'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(`/categories/${category._id}`)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(`/categories/${category._id}/edit`)}>
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

