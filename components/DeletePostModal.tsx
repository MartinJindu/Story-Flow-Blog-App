import { Button } from "./ui/button";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
}

const DeletePostModal = ({
  isOpen,
  onClose,
  onDelete,
  title,
}: DeletePostModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this post "
          <span className="font-bold">{title}</span>"?
        </p>
        <div className="flex justify-between">
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
