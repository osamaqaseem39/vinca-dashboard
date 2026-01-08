import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Category } from '../../types'
import UpdateCategoryForm from '../../components/forms/category/UpdateCategoryForm'
import Button from '../../components/common/Button'

const UpdateCategory = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [category] = useState<Category | null>(null)

  useEffect(() => {
    // Fetch category by id
    // For now, using placeholder
    // TODO: Implement API call to fetch category
    console.log('Fetching category:', id)
  }, [id])

  const handleSubmit = (data: Partial<Category>) => {
    console.log('Update category:', data)
    // Implement API call
    // After success, navigate back
    navigate('/categories')
  }

  const handleCancel = () => {
    navigate('/categories')
  }

  if (!category && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/categories')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Update Category</h1>
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
        <h1 className="text-3xl font-bold text-black">Update Category</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {category && (
          <UpdateCategoryForm
            category={category}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default UpdateCategory

