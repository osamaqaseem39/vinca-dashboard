import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types'
import Button from '../components/common/Button'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'

const Users = () => {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users] = useState<User[]>([]) // Replace with actual data fetching

  const handleDelete = () => {
    console.log('Delete user:', selectedUser?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-black tracking-wide">Users</h1>
        <Button onClick={() => navigate('/users/add')}>Add User</Button>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Name</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Email</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Role</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Phone</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-600 font-light">
                    No users found. Click "Add User" to create one.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-light text-black">{user.name}</td>
                    <td className="py-3 px-4 font-light text-gray-700">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-light ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-light text-gray-600">{user.phone || '-'}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(`/users/${user._id}`)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(`/users/${user._id}/edit`)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => { setSelectedUser(user); setShowDeleteModal(true) }}>
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
        onClose={() => { setShowDeleteModal(false); setSelectedUser(null) }}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        itemName={selectedUser?.name}
      />
    </div>
  )
}

export default Users

