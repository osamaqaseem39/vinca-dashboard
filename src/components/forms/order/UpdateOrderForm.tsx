import { useState, FormEvent, useEffect } from 'react'
import { Order } from '../../../types'
import Input from '../../common/Input'
import Textarea from '../../common/Textarea'
import Select from '../../common/Select'
import Button from '../../common/Button'

interface UpdateOrderFormProps {
  order: Order
  onSubmit: (data: Partial<Order>) => void
  onCancel: () => void
  isLoading?: boolean
}

const UpdateOrderForm = ({ order, onSubmit, onCancel, isLoading }: UpdateOrderFormProps) => {
  const [formData, setFormData] = useState<Partial<Order>>(order)

  useEffect(() => {
    setFormData(order)
  }, [order])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Order Number</p>
          <p className="text-lg font-bold text-black">{order.orderNumber}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Price</p>
          <p className="text-lg font-bold text-black">${order.totalPrice}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Order Status"
          value={formData.orderStatus || 'pending'}
          onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value as Order['orderStatus'] })}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'processing', label: 'Processing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
          required
        />
        <Select
          label="Payment Status"
          value={formData.paymentStatus || 'pending'}
          onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as Order['paymentStatus'] })}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'paid', label: 'Paid' },
            { value: 'failed', label: 'Failed' },
            { value: 'refunded', label: 'Refunded' }
          ]}
          required
        />
        <Input
          label="Tracking Number"
          value={formData.trackingNumber || ''}
          onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
        />
        <Input
          label="Shipping Cost"
          type="number"
          step="0.01"
          value={formData.shippingCost || 0}
          onChange={(e) => setFormData({ ...formData, shippingCost: parseFloat(e.target.value) || 0 })}
          required
        />
        <Input
          label="Tax"
          type="number"
          step="0.01"
          value={formData.tax || 0}
          onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) || 0 })}
          required
        />
      </div>

      <Textarea
        label="Notes"
        value={formData.notes || ''}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        rows={4}
      />

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <h3 className="text-xl font-bold text-black mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-600">Street</p>
            <p className="text-base font-medium text-black">{order.shippingAddress.street}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">City</p>
            <p className="text-base font-medium text-black">{order.shippingAddress.city}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">State</p>
            <p className="text-base font-medium text-black">{order.shippingAddress.state}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Zip Code</p>
            <p className="text-base font-medium text-black">{order.shippingAddress.zipCode}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Order'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateOrderForm

