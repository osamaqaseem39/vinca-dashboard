import { useState } from 'react'
import { Order } from '../types'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import DeleteConfirmModal from '../components/delete/DeleteConfirmModal'
import UpdateOrderForm from '../components/forms/order/UpdateOrderForm'
import OrderDetail from '../components/detail/OrderDetail'

const Orders = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders] = useState<Order[]>([]) // Replace with actual data fetching

  const handleUpdate = (data: Partial<Order>) => {
    console.log('Update order:', data)
    // Implement API call
    setShowUpdateModal(false)
  }

  const handleDelete = () => {
    console.log('Delete order:', selectedOrder?._id)
    // Implement API call
    setShowDeleteModal(false)
    setSelectedOrder(null)
  }

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
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
        <h1 className="text-3xl font-bold text-black">Orders</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-semibold text-black">Order Number</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-600 font-medium">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-black">{order.orderNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border-2 ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border-2 ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-black">${order.totalPrice}</td>
                    <td className="py-3 px-4 font-medium text-gray-600">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleViewDetail(order)}>
                          View
                        </Button>
                        <Button variant="secondary" onClick={() => { setSelectedOrder(order); setShowUpdateModal(true) }}>
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

      <Modal
        isOpen={showUpdateModal}
        onClose={() => { setShowUpdateModal(false); setSelectedOrder(null) }}
        title="Update Order"
        footer={null}
      >
        {selectedOrder && (
          <UpdateOrderForm
            order={selectedOrder}
            onSubmit={handleUpdate}
            onCancel={() => { setShowUpdateModal(false); setSelectedOrder(null) }}
          />
        )}
      </Modal>

      <Modal
        isOpen={showDetail}
        onClose={() => { setShowDetail(false); setSelectedOrder(null) }}
        title="Order Details"
        footer={null}
      >
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            onEdit={handleEdit}
            onDelete={handleDeleteFromDetail}
          />
        )}
      </Modal>

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

