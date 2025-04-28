// TaskItem.jsx
import React, { useState, useEffect, memo } from "react";

//memo() envuelve un componente: 
// Recibe props para no renderizar otra vez si esas props son iguales
export const TaskItem = memo(function TaskItem({task, onToggleEdit, onSave,
  onDelete, isHovered, onHover, onUnhover}) {

  const [editText, setEditText] = useState(task.label);

  useEffect(() => {
    if (task.isEditing) {
      setEditText(task.label);
    }
  }, [task.isEditing, task.label]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await onSave(task.id, editText);
    }
  };

  return (
    <div className="input-group my-2" onMouseEnter={() => onHover(task.id)}
      onMouseLeave={onUnhover}>
      {task.isEditing ? (
        <input
          type="text"
          className="form-control"
          value={editText}                    
          onChange={e => setEditText(e.target.value)} 
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p className="form-control" onClick={() => onToggleEdit(task.id)}>
          {task.label}
        </p>
      )}

      {isHovered && (
        <div className="input-group-append">
          <button className="btn btn-outline-secondary btn-danger text-white"
            type="button" onClick={() => onDelete(task.id)}>
            &times;   {/*&times en html es la x*/}
          </button>
        </div>
      )}
    </div>
  );
});
