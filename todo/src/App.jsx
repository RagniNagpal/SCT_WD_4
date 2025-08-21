// App.jsx
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "create js project", done: true },
    { id: 2, text: "deploy that", done: false },
    { id: 3, text: "like this video", done: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
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
              className="flex items-center justify-between bg-[#111133] p-3 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  className="w-5 h-5 accent-cyan-400"
                />
                <span className={task.done ? "line-through text-gray-400" : "text-white"}>
                  {task.text}
                </span>
              </div>
              <div className="flex gap-3">
                <button className="text-gray-400 hover:text-white">✏️</button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-400">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
