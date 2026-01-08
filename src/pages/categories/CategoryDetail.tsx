import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Category } from '../../types'
import CategoryDetailComponent from '../../components/detail/CategoryDetail'
import Button from '../../components/common/Button'
import DeleteConfirmModal from '../../components/delete/DeleteConfirmModal'

const CategoryDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [category] = useState<Category | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    // Fetch category by id
    // For now, using placeholder
    // TODO: Implement API call to fetch category
    console.log('Fetching category:', id)
  }, [id])

  const handleEdit = () => {
    navigate(`/categories/${id}/edit`)
  }

  const handleDelete = () => {
    console.log('Delete category:', id)
    // Implement API call
    setShowDeleteModal(false)
    navigate('/categories')
  }

  if (!category && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/categories')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Category Details</h1>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/categories')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-black">Category Details</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {category && (
          <CategoryDetailComponent
            category={category}
            onEdit={handleEdit}
            onDelete={() => setShowDeleteModal(true)}
          />
        )}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        itemName={category?.name}
      />
    </div>
  )
}

export default CategoryDetail

