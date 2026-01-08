import { useState } from 'react'
import { Product } from '../types'
import Button from '../components/common/Button'
import InventoryAdjustModal from '../components/inventory/InventoryAdjustModal'

const Inventory = () => {
  const [products] = useState<Product[]>([]) // Replace with actual data fetching
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false)
  const [lowStockThreshold] = useState(10) // Configurable threshold

  const getStockStatus = (quantity: number, inStock: boolean) => {
    if (!inStock || quantity === 0) return { label: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-50' }
    if (quantity <= lowStockThreshold) return { label: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-50' }
    return { label: 'In Stock', color: 'text-green-600', bg: 'bg-green-50' }
  }

  const handleAdjustInventory = (product: Product) => {
    setSelectedProduct(product)
    setIsAdjustModalOpen(true)
  }

  const handleAdjustComplete = () => {
    setIsAdjustModalOpen(false)
    setSelectedProduct(null)
    // Refresh products list
  }

  const lowStockProducts = products.filter(p => p.stockQuantity <= lowStockThreshold && p.inStock)
  const outOfStockProducts = products.filter(p => !p.inStock || p.stockQuantity === 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-black tracking-wide">Inventory Management</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => {}}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-600 mb-1">Total Products</p>
          <p className="text-3xl font-bold text-black">{products.length}</p>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-600 mb-1">In Stock</p>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.inStock && p.stockQuantity > 0).length}
          </p>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-600 mb-1">Low Stock</p>
          <p className="text-3xl font-bold text-orange-600">{lowStockProducts.length}</p>
        </div>
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-600 mb-1">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600">{outOfStockProducts.length}</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-orange-50 border-2 border-orange-600 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">Low Stock Alert</h3>
              <p className="text-orange-800">
                {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} have stock levels below {lowStockThreshold}
              </p>
            </div>
            <Button variant="outline" onClick={() => {}}>
              View All
            </Button>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white border-2 border-black rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">All Products</h2>
          <div className="flex gap-2">
            <select className="border-2 border-black rounded-lg px-3 py-2 font-light">
              <option value="all">All Products</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
              <option value="in">In Stock</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Product</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">SKU</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Current Stock</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Status</th>
                <th className="text-left py-3 px-4 font-light text-black uppercase tracking-wide text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-600 font-light">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const status = getStockStatus(product.stockQuantity, product.inStock)
                  return (
                    <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-black">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.brand}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-light text-gray-700">{product.sku}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-black">{product.stockQuantity}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${status.color} ${status.bg}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          onClick={() => handleAdjustInventory(product)}
                        >
                          Adjust
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <InventoryAdjustModal
        isOpen={isAdjustModalOpen}
        onClose={() => {
          setIsAdjustModalOpen(false)
          setSelectedProduct(null)
        }}
        product={selectedProduct}
        onComplete={handleAdjustComplete}
      />
    </div>
  )
}

export default Inventory

