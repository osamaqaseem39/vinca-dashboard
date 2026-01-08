import { useState } from 'react'
import { User } from '../types'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'
import AddUserForm from '../components/forms/user/AddUserForm'
import UpdateUserForm from '../components/forms/user/UpdateUserForm'
import UserDetail from '../components/detail/UserDetail'

const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users] = useState<User[]>([]) // Replace with actual data fetching

  const handleAdd = (data: Partial<User>) => {
    console.log('Add user:', data)
    // Implement API call
    setShowAddModal(false)
  }

  const handleUpdate = (data: Partial<User>) => {
    console.log('Update user:', data)
    // Implement API call
    setShowUpdateModal(false)
  }

  const handleDelete = () => {
    console.log('Delete user:', selectedUser?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const handleViewDetail = (user: User) => {
    setSelectedUser(user)
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
        <h1 className="text-3xl font-bold text-black">Users</h1>
        <Button onClick={() => setShowAddModal(true)}>Add User</Button>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-semibold text-black">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-600 font-medium">
                    No users found. Click "Add User" to create one.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-black">{user.name}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-600">{user.phone || '-'}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleViewDetail(user)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => { setSelectedUser(user); setShowUpdateModal(true) }}>
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

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add User"
        footer={null}
      >
        <AddUserForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showUpdateModal}
        onClose={() => { setShowUpdateModal(false); setSelectedUser(null) }}
        title="Update User"
        footer={null}
      >
        {selectedUser && (
          <UpdateUserForm
            user={selectedUser}
            onSubmit={handleUpdate}
            onCancel={() => { setShowUpdateModal(false); setSelectedUser(null) }}
          />
        )}
      </Modal>

      <Modal
        isOpen={showDetail}
        onClose={() => { setShowDetail(false); setSelectedUser(null) }}
        title="User Details"
        footer={null}
      >
        {selectedUser && (
          <UserDetail
            user={selectedUser}
            onEdit={handleEdit}
            onDelete={handleDeleteFromDetail}
          />
        )}
      </Modal>

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

