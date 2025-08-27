import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "create js project", done: true, datetime: "" },
    { id: 2, text: "deploy that", done: false, datetime: "" },
    { id: 3, text: "like this video", done: false, datetime: "" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      done: false,
      datetime: "",
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
    setEditingId(null);
    setEditText("");
  };

  const setTaskDateTime = (id, value) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, datetime: value } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-[#0b0b2a] flex justify-center items-start p-10">
      <div className="w-full max-w-md bg-[#1b1b3a] rounded-2xl p-6 space-y-6 text-white shadow-xl">
        
        {/* Header with progress */}
        <div className="flex justify-between items-center bg-[#1a1a35] p-4 rounded-xl">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Todo App</h1>
            <p className="text-sm text-gray-300">Keep it up!</p>
            <div className="w-full bg-[#111133] h-2 rounded mt-2">
              <div
                className="h-2 rounded bg-cyan-400 transition-all duration-300"
                style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">
            {completedCount}/{tasks.length}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded-xl bg-[#111133] focus:outline-none placeholder-gray-400 text-white"
            type="text"
            placeholder="Write your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold hover:bg-purple-600 transition"
            onClick={addTask}
          >
            +
          </button>
        </div>

        {/* Tasks */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-2 bg-[#111133] p-3 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                    className="w-5 h-5 accent-cyan-400"
                  />
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-[#111133] border-b border-gray-400 text-white focus:outline-none"
                    />
                  ) : (
                    <span className={task.done ? "line-through text-gray-400" : "text-white"}>
                      {task.text}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {editingId === task.id ? (
                    <button onClick={() => saveEdit(task.id)} className="text-green-400">✔️</button>
                  ) : (
                    <button onClick={() => startEdit(task)} className="text-gray-400 hover:text-white">✏️</button>
                  )}
                  <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-400">🗑️</button>
                </div>
              </div>
              {/* Date & Time */}
              <input
                type="datetime-local"
                value={task.datetime}
                onChange={(e) => setTaskDateTime(task.id, e.target.value)}
                className="w-full p-2 rounded-xl bg-[#0f0f2a] text-white focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
