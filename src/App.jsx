import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://back-crud-pgec.onrender.com/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // изначально отрисовываем данные с сервера

  const handleChange = (event) => {
    setNewNoteContent(event.target.value);
  }; // получаем и записываем в newNoteContent данные, которые пользователь вводит в textarea

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://back-crud-pgec.onrender.com/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newNoteContent }),
      });
      if (response.status === 204) {
        fetchData();
      } else {
        console.error("Error adding note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
    setNewNoteContent('');
  }; // после нажатия кнопки "Добавить заметку" отправляем post запрос на сервер, в случае успешного ответа отправляем get запрос 

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`https://back-crud-pgec.onrender.com/notes/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        const fetchData = async () => {
          try {
            const response = await fetch('https://back-crud-pgec.onrender.com/notes');
            const data = await response.json();
            setNotes(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      } else {
        console.error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app">
      <Notes
        className="note"
        notes={notes}
        onClick={(id) => deleteNote(id)}
      />
      <AddNote onSubmit={handleSubmit} handleChange={handleChange} value={newNoteContent} />
    </div>
  );
}

export default App;
