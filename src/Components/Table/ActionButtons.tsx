import React from "react";

interface ActionButtonsProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function ActionButtons<T>({ item, onEdit, onDelete }: ActionButtonsProps<T>) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onEdit && onEdit(item)}
        className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete && onDelete(item)}
        className="flex-1 py-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium rounded transition-colors"
      >
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
