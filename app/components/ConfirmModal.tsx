import React from "react";

interface ConfirmModalProps {
  confirmDelete: () => void;
  closeModal: () => void;
}

const ConfirmModal = ({ closeModal, confirmDelete }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4 dark:text-white">
          Are you sure?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Do you really want to delete this task? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
