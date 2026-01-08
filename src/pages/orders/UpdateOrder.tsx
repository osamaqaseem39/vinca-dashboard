import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Order } from '../../types'
import UpdateOrderForm from '../../components/forms/order/UpdateOrderForm'
import Button from '../../components/common/Button'

const UpdateOrder = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Fetch order by id
    // For now, using placeholder
    // TODO: Implement API call to fetch order
    console.log('Fetching order:', id)
  }, [id])

  const handleSubmit = (data: Partial<Order>) => {
    console.log('Update order:', data)
    // Implement API call
    // After success, navigate back
    navigate('/orders')
  }

  const handleCancel = () => {
    navigate('/orders')
  }

  if (!order && id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/orders')}>
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-black">Update Order</h1>
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
        <h1 className="text-3xl font-bold text-black">Update Order</h1>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6">
        {order && (
          <UpdateOrderForm
            order={order}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default UpdateOrder

