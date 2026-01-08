import { Order } from '../../types'
import Button from '../common/Button'

interface OrderDetailProps {
  order: Order
  onEdit: () => void
  onDelete: () => void
}

const OrderDetail = ({ order, onEdit, onDelete }: OrderDetailProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'processing':
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">Order {order.orderNumber}</h2>
          <p className="text-gray-600 font-medium">
            {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
          </p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Order Status</h3>
          <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusColor(order.orderStatus)}`}>
            {order.orderStatus.toUpperCase()}
          </span>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Payment Status</h3>
          <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus.toUpperCase()}
          </span>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Total</h3>
          <p className="text-2xl font-bold text-black">${order.totalPrice}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Shipping Address</h3>
          <div className="space-y-2">
            <p className="font-medium text-black">{order.shippingAddress.street}</p>
            <p className="font-medium text-black">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="font-medium text-black">{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Payment Method</h3>
          <p className="text-lg font-bold text-black capitalize">{order.paymentMethod.replace('-', ' ')}</p>
          {order.trackingNumber && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-600">Tracking Number</p>
              <p className="text-base font-bold text-black">{order.trackingNumber}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <h3 className="text-xl font-bold text-black mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="border-b-2 border-gray-200 pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-black">Product ID: {item.product}</p>
                  <p className="text-sm font-medium text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold text-black">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t-2 border-black flex justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600">Subtotal</p>
            <p className="text-sm font-semibold text-gray-600">Shipping</p>
            <p className="text-sm font-semibold text-gray-600">Tax</p>
            <p className="text-lg font-bold text-black">Total</p>
          </div>
          <div className="space-y-2 text-right">
            <p className="text-sm font-medium text-black">${(order.totalPrice - order.shippingCost - order.tax).toFixed(2)}</p>
            <p className="text-sm font-medium text-black">${order.shippingCost}</p>
            <p className="text-sm font-medium text-black">${order.tax}</p>
            <p className="text-lg font-bold text-black">${order.totalPrice}</p>
          </div>
        </div>
      </div>

      {order.notes && (
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Notes</h3>
          <p className="font-medium text-black">{order.notes}</p>
        </div>
      )}
    </div>
  )
}

export default OrderDetail

