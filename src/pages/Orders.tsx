import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Order } from '../types'
import Button from '../components/common/Button'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'

const Orders = () => {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders] = useState<Order[]>([]) // Replace with actual data fetching

  const handleDelete = () => {
    console.log('Delete order:', selectedOrder?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedOrder(null)
  }

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-black tracking-wide">Orders</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Order Number</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Status</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Payment</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Total</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Date</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-600 font-light">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-light text-black">{order.orderNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-light border-2 ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-light border-2 ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-light text-black">${order.totalPrice}</td>
                    <td className="py-3 px-4 font-light text-gray-600">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(`/orders/${order._id}`)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(`/orders/${order._id}/edit`)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => { setSelectedOrder(order); setShowDeleteModal(true) }}>
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
        onClose={() => { setShowDeleteModal(false); setSelectedOrder(null) }}
        onConfirm={handleDelete}
        title="Delete Order"
        message="Are you sure you want to delete this order?"
        itemName={selectedOrder?.orderNumber}
      />
    </div>
  )
}

export default Orders

