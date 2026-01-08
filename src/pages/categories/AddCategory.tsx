import { useNavigate } from 'react-router-dom'
import { Category } from '../../types'
import AddCategoryForm from '../../components/forms/category/AddCategoryForm'
import Button from '../../components/common/Button'

const AddCategory = () => {
  const navigate = useNavigate()

  const handleSubmit = (data: Partial<Category>) => {
    console.log('Add category:', data)
    // Implement API call
    // After success, navigate back
    navigate('/categories')
  }

  const handleCancel = () => {
    navigate('/categories')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/categories')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-black">Add Category</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <AddCategoryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

export default AddCategory

