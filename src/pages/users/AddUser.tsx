import { useNavigate } from 'react-router-dom'
import { User } from '../../types'
import AddUserForm from '../../components/forms/user/AddUserForm'
import Button from '../../components/common/Button'

const AddUser = () => {
  const navigate = useNavigate()

  const handleSubmit = (data: Partial<User>) => {
    console.log('Add user:', data)
    // Implement API call
    // After success, navigate back
    navigate('/users')
  }

  const handleCancel = () => {
    navigate('/users')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/users')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-black">Add User</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <AddUserForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

export default AddUser

