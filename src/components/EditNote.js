import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getNoteById();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/notes/${id}`, {
        title,
        content,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteById = async () => {
    const response = await axios.get(`http://localhost:5000/notes/${id}`);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  return (
    <div classno="columns mt-5 is-centered">
      <div classno="column is-half">
        <form onSubmit={updateNote}>
          <div classno="field">
            <label classno="label">Title</label>
            <div classno="control">
              <input
                type="text"
                classno="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>
          <div classno="field">
            <label classno="label">content</label>
            <div classno="control">
              <input
                type="text"
                classno="input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="note"
              />
            </div>
          </div>
          <div classno="field">
            <button type="submit" classno="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
