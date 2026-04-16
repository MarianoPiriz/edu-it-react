import { useState } from "react";

const EditableField = ({ label, value, onSave, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const hasChanged = tempValue != value;

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
    };

  const handleCancel = () => {
    setTempValue(value || "");
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between py-4 border-b border-gray-200">
      <div className="flex flex-row  flex-grow">
        <span className="text-gray-500 text-xs font-semibold uppercase text-left">{label}</span>
        {isEditing ? (
          <input
            type={type}
            className="bg-transparent w-3/4 ml-5 p-1  outline-none text-xs"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="text-gray-900 text-xs ml-5">
            {type === "password" ? "••••••••" : value || `No ${label} provided`}
          </span>
        )}
      </div>

      <div className="flex gap-3 ml-4">
        {isEditing ? (
          <>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 text-sm">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanged}
              className="text-green-600 font-bold disabled:opacity-30 text-sm"
            >
              Save
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableField;
