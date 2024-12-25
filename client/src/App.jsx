import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState("")
  const [todo, setToDo] = useState("")
  const [editId, setEditId] = useState(null)

  const addToDo = (e) => {
    e.preventDefault()
    
    if (editId) {
      fetch(`http://localhost:4001/update_todo/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            author,
            todo
          })
        }).then(res => res.json())
        .then(() => {
          setAuthor("")
          setToDo("")
        })
    } else{
      fetch("http://localhost:4001/add_todo",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            author,
            todo
          })
        }).then(res => res.json())
        .then(() => {
          setAuthor("")
          setToDo("")
        })
    }
  }

  const deleteToDo = (id) => {  
    fetch(`http://localhost:4001/delete_todo/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
  }

  const editToDo = (item) => {
    setEditId(item.id)
    setAuthor(item.author)
    setToDo(item.todo)
  }

  useEffect(() => {
    fetch("http://localhost:4001/get")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, [addToDo,deleteToDo]);
  return (
    <>
      <div className="container">
        <div className="little-container">
          <h2>To Do App</h2>
          <form action="" className="form" onSubmit={addToDo}>
            <input type="text" className="input" placeholder="Author..." value={author} onChange={e => setAuthor(e.target.value)} required/>
            <input type="text" className="input" placeholder="ToDo..."  value={todo} onChange={e => setToDo(e.target.value)} required/>
            <button type="submit" className="btn">
              {
                editId ? "Update ToDo" : "Add ToDo"
              }
            </button>
          </form>
          <ul className="list">
            {data.length &&
              data.map((item, idx) => (
                <li className="item" key={idx}>
                  <p className="number"><span>Number:</span> {idx + 1}</p>
                  <p className="author"><span>author:</span> {item.author}</p>
                  <p className="todo"><span>todo:</span> {item.todo}</p>
                  <button className="editBtn" onClick={() => editToDo(item)}>Edit✏️</button>
                  <button className="deleteBtn" onClick={() => deleteToDo(item.id)}>Delete🗑️</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
