import React, { useState } from "react";
import jsonData from "../data/alldata.json";
import "../style/Admin.css";

const Admin = () => {
  const [data, setData] = useState(jsonData);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [filmName, setFilmName] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const handleDelete = (idToDelete) => {
    setData((prevData) =>
      prevData.map((title) => ({
        ...title,
        film: title.film.filter((film) => film.id !== idToDelete),
      }))
    );
    setEditingId(null);
  };

  const handleEdit = (idToEdit, column, newValue) => {
    setData((prevData) =>
      prevData.map((title) => ({
        ...title,
        film: title.film.map((film) =>
          film.id === idToEdit ? { ...film, [column]: newValue } : film
        ),
      }))
    );
    setEditingId(null);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const newFilm = {
      id: data.length + 1,
      name: filmName,
      year: year,
      description: description,
      img: img,
    };
    const existingTitle = data.find((item) => item.title === title);
    if (existingTitle) {
      setData((prevData) =>
        prevData.map((item) =>
          item.title === title
            ? { ...item, film: [...item.film, newFilm] }
            : item
        )
      );
    } else {
      setData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          title: title,
          film: [newFilm],
        },
      ]);
    }
    setTitle("");
    setFilmName("");
    setYear("");
    setDescription("");
    setImg("");
  };

  const [sortOrder, setSortOrder] = useState("asc");

  
// sort function
const handleSort = (columnName) => {
  setData((prevData) =>
    prevData.map((title) => ({
      ...title,
      film: title.film.sort((a, b) =>
        columnName === "name"
          ? a.name.localeCompare(b.name)
          : a[columnName] < b[columnName] ? -1 : a[columnName] > b[columnName] ? 1 : 0
      ),
    }))
  );

  // Check the current sort order of the clicked column
  if (columnName === "title" && sortOrder === "asc") {
    setData((prevData) =>
      prevData.sort((a, b) =>
        a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      )
    );
    setSortOrder("desc");
  } else if (columnName === "name" && sortOrder === "asc") {
    setData((prevData) =>
      prevData.map((title) => ({
        ...title,
        film: title.film.reverse()
      }))
    );
    setSortOrder("desc");
  } else {
    setData((prevData) =>
      prevData.sort((a, b) =>
        a.title > b.title ? -1 : a.title < b.title ? 1 : 0
      )
    );
    setSortOrder("asc");
  }
};

  

  return (
    <div className="admin-container">
      <table>
        <thead>
          <tr>
            <th>Title ID</th>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("name")}>Film Name</th>
            <th>Year</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((title) =>
            title.film.map((film) => (
              <tr key={film.id}>
                <td>{title.id}</td>
                <td>{title.title}</td>
                <td>
                  {editingId === film.id ? (
                    <input
                      type="text"
                      defaultValue={film.name}
                      onChange={(e) =>
                        handleEdit(film.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    film.name
                  )}
                </td>
                <td>
                  {editingId === film.id ? (
                    <input
                      type="number"
                      defaultValue={film.year}
                      onChange={(e) =>
                        handleEdit(film.id, "year", parseInt(e.target.value))
                      }
                    />
                  ) : (
                    film.year
                  )}
                </td>
                <td>
                  {editingId === film.id ? (
                    <input
                      type="text"
                      defaultValue={film.description}
                      onChange={(e) =>
                        handleEdit(film.id, "description", e.target.value)
                      }
                    />
                  ) : (
                    film.description
                  )}
                </td>
                <td>
                  <img src={film.img} alt={film.name} className="poster" />
                </td>
                <td>
                  {editingId === film.id ? (
                    <>
                      <button onClick={() => handleEdit(film.id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditingId(film.id)}>Update</button>
                      <button onClick={() => handleDelete(film.id)}>Delete</button>
                    </>
                  )}
                </td> </tr>
        ))
      )}
      <tr>
        <td colSpan="7">
          <form onSubmit={handleAdd}>
            <h3>Add New Film</h3>
            <label>
              Title:{sortOrder === "asc" ? <>&uarr;</> : <>&darr;</>}
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="">Select a title</option>
            {data.map((title) => (
              <option key={title.id} value={title.title}>
                {title.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Film Name:{sortOrder === "asc" ? <>&uarr;</> : <>&darr;</>}
          <input
            type="text"
            value={filmName}
            onChange={(e) => setFilmName(e.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </label>
        <button>Add Film</button>
      </form>
    </td>
  </tr>
</tbody>
</table>
</div>
);
};

export default Admin;