import Modal from '../common/Modal'
import Button from '../common/Button'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  itemName?: string
  isLoading?: boolean
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isLoading = false
}: DeleteConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">{message}</p>
        {itemName && (
          <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4">
            <p className="font-bold text-black">{itemName}</p>
          </div>
        )}
        <p className="text-sm text-red-600 font-semibold">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal

