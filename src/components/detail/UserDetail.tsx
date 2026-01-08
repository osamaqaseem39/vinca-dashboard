import { User } from '../../types'
import Button from '../common/Button'

interface UserDetailProps {
  user: User
  onEdit: () => void
  onDelete: () => void
}

const UserDetail = ({ user, onEdit, onDelete }: UserDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">{user.name}</h2>
          <p className="text-gray-600 font-medium">{user.email}</p>
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
          <h3 className="text-xl font-bold text-black mb-4">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Name</p>
              <p className="text-lg font-bold text-black">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Email</p>
              <p className="text-base font-medium text-black">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Role</p>
              <p className="text-base font-bold text-black capitalize">
                {user.role === 'admin' ? (
                  <span className="text-red-600">Admin</span>
                ) : (
                  <span className="text-gray-600">User</span>
                )}
              </p>
            </div>
            {user.phone && (
              <div>
                <p className="text-sm font-semibold text-gray-600">Phone</p>
                <p className="text-base font-medium text-black">{user.phone}</p>
              </div>
            )}
            {user.dateOfBirth && (
              <div>
                <p className="text-sm font-semibold text-gray-600">Date of Birth</p>
                <p className="text-base font-medium text-black">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {user.addresses && user.addresses.length > 0 && (
          <div className="bg-white border-2 border-black rounded-2xl p-6">
            <h3 className="text-xl font-bold text-black mb-4">Addresses</h3>
            <div className="space-y-4">
              {user.addresses.map((address, index) => (
                <div key={index} className="border-b-2 border-gray-200 pb-4 last:border-0">
                  <p className="font-bold text-black capitalize mb-2">{address.type}</p>
                  <p className="text-sm font-medium text-black">{address.street}</p>
                  <p className="text-sm font-medium text-black">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm font-medium text-black">{address.country}</p>
                  {address.isDefault && (
                    <span className="inline-block mt-2 px-2 py-1 bg-black text-white text-xs font-semibold rounded">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {user.createdAt && (
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Created At</p>
              <p className="text-base font-medium text-black">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
            {user.updatedAt && (
              <div>
                <p className="text-sm font-semibold text-gray-600">Updated At</p>
                <p className="text-base font-medium text-black">
                  {new Date(user.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetail

