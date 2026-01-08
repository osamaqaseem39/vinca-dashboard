import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Order } from '../../types'
import OrderDetailComponent from '../../components/detail/OrderDetail'
import Button from '../../components/common/Button'
import DeleteConfirmModal from '../../components/delete/DeleteConfirmModal'

const OrderDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [order] = useState<Order | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    // Fetch order by id
    // For now, using placeholder
    // TODO: Implement API call to fetch order
    console.log('Fetching order:', id)
  }, [id])

  const handleEdit = () => {
    navigate(`/orders/${id}/edit`)
  }

  const handleDelete = () => {
    console.log('Delete order:', id)
    // Implement API call
    setShowDeleteModal(false)
    navigate('/orders')
  }

  if (!order && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/orders')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Order Details</h1>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6 text-center">
          <p className="text-gray-600">Loading order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/orders')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-black">Order Details</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {order && (
          <OrderDetailComponent
            order={order}
            onEdit={handleEdit}
            onDelete={() => setShowDeleteModal(true)}
          />
        )}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        message="Are you sure you want to delete this order?"
        itemName={order?.orderNumber}
      />
    </div>
  )
}

export default OrderDetail

