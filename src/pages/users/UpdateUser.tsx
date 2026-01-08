import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { User } from '../../types'
import UpdateUserForm from '../../components/forms/user/UpdateUserForm'
import Button from '../../components/common/Button'

const UpdateUser = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [user] = useState<User | null>(null)

  useEffect(() => {
    // Fetch user by id
    // For now, using placeholder
    // TODO: Implement API call to fetch user
    console.log('Fetching user:', id)
  }, [id])

  const handleSubmit = (data: Partial<User>) => {
    console.log('Update user:', data)
    // Implement API call
    // After success, navigate back
    navigate('/users')
  }

  const handleCancel = () => {
    navigate('/users')
  }

  if (!user && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/users')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Update User</h1>
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
        <h1 className="text-3xl font-bold text-black">Update User</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {user && (
          <UpdateUserForm
            user={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default UpdateUser

