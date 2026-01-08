import { Category } from '../../types'
import Button from '../common/Button'

interface CategoryDetailProps {
  category: Category
  onEdit: () => void
  onDelete: () => void
}

const CategoryDetail = ({ category, onEdit, onDelete }: CategoryDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">{category.name}</h2>
          <p className="text-gray-600 font-medium">/{category.slug}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Name</p>
              <p className="text-lg font-bold text-black">{category.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Slug</p>
              <p className="text-base font-medium text-black">{category.slug}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Status</p>
              <p className="text-base font-bold text-black">
                {category.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </p>
            </div>
            {category.description && (
              <div>
                <p className="text-sm font-semibold text-gray-600">Description</p>
                <p className="text-base font-medium text-black">{category.description}</p>
              </div>
            )}
          </div>
        </div>

        {category.image && (
          <div className="bg-white border-2 border-black rounded-2xl p-6">
            <h3 className="text-xl font-bold text-black mb-4">Image</h3>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover border-2 border-black rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryDetail

