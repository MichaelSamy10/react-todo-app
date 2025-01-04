import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./App.css";

function App() {
  const [task, setTask] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [editedIndex, setEditedIndex] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const inputRef = useRef();
  const editRef = useRef();

  function addTask() {
    const input = inputRef.current.value;
    const newTask = { completed: false, value: input };

    inputRef.current.value ? setTask([...task, newTask]) : handleAlert();
    inputRef.current.value = "";
  }

  function deleteTask(index) {
    const tasks = [...task];
    tasks.splice(index, 1);
    setTask(tasks);
  }

  function taskDone(index) {
    const newTask = [...task];
    newTask[index].completed = !newTask[index].completed;
    setTask(newTask);
  }

  function editTask() {
    setEditedTask(editRef.current.value);
    const updatedTasks = [...task];
    updatedTasks[editedIndex].value = editedTask;
    setTask(updatedTasks);
  }

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <div className=" p-5" style={{ width: "30rem", marginLeft: "40rem" }}>
        {/* <h2 className="mb-5">To Do list</h2> */}

        {showAlert && (
          <div className="alert alert-danger p-2" role="alert">
            Please enter your note...
          </div>
        )}

        <div className="input-group mb-3">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Enter new note..."
          ></input>
          <button className="btn btn-primary" type="button" onClick={addTask}>
            Add
          </button>
        </div>
        <ul className="list-box p-0 text-center mt-3">
          {task.map((item, index) => (
            <div
              key={index}
              className="bg-primary bg-gradient mb-2 m-auto p-2 d-flex justify-content-between"
            >
              <li
                className={`list-unstyled text-white fs-5 text-start ${
                  item.completed ? "taskDone" : ""
                }`}
                onClick={() => taskDone(index)}
              >
                {item.value}
              </li>
              <div className="icons d-flex ms-4">
                <FaEdit
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="text-white me-1 align-self-center"
                  onClick={() => {
                    setEditedTask(task[index].value);
                    setEditedIndex(index);
                  }}
                />
                <MdDelete
                  className="icon-remove fs-5  align-self-center text-white"
                  onClick={() => deleteTask(index)}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>

      {/*Edit Task Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <input
              type="text"
              className="form-control"
              value={editedTask}
              ref={editRef}
              onChange={(event) => setEditedTask(event.target.value)}
              style={{ maxWidth: "500px" }}
            ></input>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={editTask}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
