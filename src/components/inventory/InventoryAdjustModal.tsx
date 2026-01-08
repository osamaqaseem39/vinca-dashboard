import { useState, FormEvent, useEffect } from 'react'
import { Product } from '../../types'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Button from '../common/Button'

interface InventoryAdjustModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onComplete: () => void
}

type AdjustmentType = 'set' | 'add' | 'subtract'

const InventoryAdjustModal = ({ isOpen, onClose, product, onComplete }: InventoryAdjustModalProps) => {
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('set')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setQuantity(product.stockQuantity.toString())
      setAdjustmentType('set')
      setReason('')
    }
  }, [product])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!product) return

    setIsLoading(true)
    try {
      // TODO: Implement API call
      // const response = await fetch(`/api/products/${product._id}/inventory`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     adjustmentType,
      //     quantity: parseInt(quantity),
      //     reason
      //   })
      // })
      
      console.log('Adjusting inventory:', {
        productId: product._id,
        adjustmentType,
        quantity: parseInt(quantity),
        reason
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      onComplete()
    } catch (error) {
      console.error('Error adjusting inventory:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateNewQuantity = () => {
    if (!product || !quantity) return product?.stockQuantity || 0
    
    const qty = parseInt(quantity) || 0
    switch (adjustmentType) {
      case 'set':
        return qty
      case 'add':
        return product.stockQuantity + qty
      case 'subtract':
        return Math.max(0, product.stockQuantity - qty)
      default:
        return product.stockQuantity
    }
  }

  const newQuantity = calculateNewQuantity()

  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Inventory">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">Product</p>
          <p className="text-lg font-bold text-black">{product.name}</p>
          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
          <p className="text-sm text-gray-600 mt-2">
            Current Stock: <span className="font-bold text-black">{product.stockQuantity}</span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Adjustment Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setAdjustmentType('set')}
              className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                adjustmentType === 'set'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              Set To
            </button>
            <button
              type="button"
              onClick={() => setAdjustmentType('add')}
              className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                adjustmentType === 'add'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setAdjustmentType('subtract')}
              className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                adjustmentType === 'subtract'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              Subtract
            </button>
          </div>
        </div>

        <Input
          label={adjustmentType === 'set' ? 'Set Quantity To' : adjustmentType === 'add' ? 'Quantity to Add' : 'Quantity to Subtract'}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="0"
        />

        {adjustmentType !== 'set' && (
          <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-4">
            <p className="text-sm font-semibold text-blue-900">
              New Stock Level: <span className="text-lg">{newQuantity}</span>
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Reason (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border-2 border-black rounded-lg px-4 py-2 font-light focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
            placeholder="e.g., Restocked, Damaged items, Returned items..."
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t-2 border-black">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !quantity || parseInt(quantity) < 0}>
            {isLoading ? 'Updating...' : 'Update Inventory'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default InventoryAdjustModal

