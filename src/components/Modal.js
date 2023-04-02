import React from "react";

const Modal = ({ modalData, onClose, onSave }) => {
  const [data, setData] = React.useState(modalData);

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div className="modal">
      <h2>Edit data</h2>
      <input
        type="text"
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Year"
        value={data.year}
        onChange={(e) => setData({ ...data, year: e.target.value })}
      />
      <textarea
        type="text"
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      ></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Modal;
