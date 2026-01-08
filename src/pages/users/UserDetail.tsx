import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { User } from '../../types'
import UserDetailComponent from '../../components/detail/UserDetail'
import Button from '../../components/common/Button'
import DeleteConfirmModal from '../../components/delete/DeleteConfirmModal'

const UserDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [user] = useState<User | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    // Fetch user by id
    // For now, using placeholder
    // TODO: Implement API call to fetch user
    console.log('Fetching user:', id)
  }, [id])

  const handleEdit = () => {
    navigate(`/users/${id}/edit`)
  }

  const handleDelete = () => {
    console.log('Delete user:', id)
    // Implement API call
    setShowDeleteModal(false)
    navigate('/users')
  }

  if (!user && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/users')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">User Details</h1>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
          <p className="text-gray-600">Loading user...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/users')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-black">User Details</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {user && (
          <UserDetailComponent
            user={user}
            onEdit={handleEdit}
            onDelete={() => setShowDeleteModal(true)}
          />
        )}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        itemName={user?.name}
      />
    </div>
  )
}

export default UserDetail

