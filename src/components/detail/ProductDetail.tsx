import { Product } from '../../types'
import Button from '../common/Button'

interface ProductDetailProps {
  product: Product
  onEdit: () => void
  onDelete: () => void
}

const ProductDetail = ({ product, onEdit, onDelete }: ProductDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">{product.name}</h2>
          <p className="text-gray-600 font-medium">{product.brand}</p>
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
              <p className="text-sm font-semibold text-gray-600">SKU</p>
              <p className="text-lg font-bold text-black">{product.sku}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Description</p>
              <p className="text-base font-medium text-black">{product.description}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Price</p>
              <p className="text-lg font-bold text-black">${product.price}</p>
              {product.discountPrice && (
                <p className="text-base font-medium text-gray-500 line-through">${product.discountPrice}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Stock</p>
              <p className="text-lg font-bold text-black">
                {product.stockQuantity} {product.inStock ? '(In Stock)' : '(Out of Stock)'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Specifications</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Frame Type</p>
              <p className="text-base font-bold text-black capitalize">{product.frameType.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Frame Material</p>
              <p className="text-base font-bold text-black capitalize">{product.frameMaterial.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Frame Color</p>
              <p className="text-base font-bold text-black">
                {product.frameColor?.primary}
                {product.frameColor?.secondary && ` / ${product.frameColor.secondary}`}
                {product.frameColor?.finish && ` (${product.frameColor.finish})`}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Lens Type</p>
              <p className="text-base font-bold text-black capitalize">{product.lensType.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Gender</p>
              <p className="text-base font-bold text-black capitalize">{product.gender}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Size</p>
              <p className="text-base font-bold text-black">
                Eye: {product.size.eye} | Bridge: {product.size.bridge} | Temple: {product.size.temple}
              </p>
            </div>
          </div>
        </div>
      </div>

      {product.images && product.images.length > 0 && (
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-48 object-cover border-2 border-black rounded-xl"
              />
            ))}
          </div>
        </div>
      )}

      {product.ratings && (
        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Ratings</h3>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-black">{product.ratings.average.toFixed(1)}</p>
            <p className="text-base font-medium text-gray-600">({product.ratings.count} reviews)</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

