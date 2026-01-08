import { useState, FormEvent, useEffect } from 'react'
import { User } from '../../../types'
import Input from '../../common/Input'
import Select from '../../common/Select'
import Button from '../../common/Button'

interface UpdateUserFormProps {
  user: User
  onSubmit: (data: Partial<User>) => void
  onCancel: () => void
  isLoading?: boolean
}

const UpdateUserForm = ({ user, onSubmit, onCancel, isLoading }: UpdateUserFormProps) => {
  const [formData, setFormData] = useState<Partial<User>>(user)

  useEffect(() => {
    setFormData(user)
  }, [user])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Don't send password if it's empty
    if (!formData.password) {
      const { password, ...dataWithoutPassword } = formData
      onSubmit(dataWithoutPassword)
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="New Password (leave empty to keep current)"
          type="password"
          value={formData.password || ''}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          minLength={6}
        />
        <Input
          label="Phone"
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
        <Select
          label="Role"
          value={formData.role || 'user'}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
          options={[
            { value: 'user', label: 'User' },
            { value: 'admin', label: 'Admin' }
          ]}
          required
        />
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update User'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateUserForm

