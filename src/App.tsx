import { useState } from 'react'
import './App.css'

function App() {
  const initialData = [
    {id: 1, name: "Olumuyiwa", completed: false},
    {id: 2, name: "James", completed: true},
    {id: 3, name: "John", completed: false},
  ]
  const [data, setData] = useState(initialData)
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState("")

  function handleDelete(taskId: number) {
    const newData = data.filter(dat => dat.id !== taskId)
    setData(newData)
  }

  function handleReload() {
    setData(initialData)
  }

  function handleAddTask() {
    if (newTask.trim() === '') return

    const newTaskItem = {
      completed: false,
      name: newTask,
      id: Date.now()
    }
    setData([...data, newTaskItem])
    setNewTask("")
  }

  function handleInputChange(e) {
    setNewTask(e.target.value)
  }

  function handleToggleComplete(id: number) {
    const updatedData = data.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setData(updatedData)
  }

  function handleEdit(task) {
    setEditingId(task.id)
    setEditedName(task.name)
  }
  
  function handleSaveEdit(id: number) {
    const updated = data.map(task =>
      task.id === id ? { ...task, name: editedName } : task
    )
    setData(updated)
    setEditingId(null)
    setEditedName("")
  }
  
  function handleCancelEdit() {
    setEditingId(null)
    setEditedName("")
  }

  return (
    <>
      <div className="max-w-xl mx-auto flex flex-col justify-center items-center px-6 py-10 bg-gray-50 rounded-lg shadow-lg mt-20">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4 text-teal-700">Welcome to my Test Page!</h1>
          <div>
            <button className="px-5 py-2 rounded-lg bg-teal-500 text-amber-900 font-semibold text-sm mr-3 hover:text-teal-500 hover:bg-amber-900 transition ease-in-out duration-300">Home</button>
            <button className="px-5 py-2 rounded-lg bg-teal-500 text-amber-900 font-semibold text-sm hover:text-teal-500 hover:bg-amber-900 transition ease-in-out duration-300">Contact</button>
          </div>
        </header>

        <main className="w-full">
          <h2 className="text-xl font-semibold mb-3 text-teal-700">Add your tasks below</h2>

          <div className="flex mb-6">
            <input 
              type="text" 
              value={newTask} 
              onChange={handleInputChange} 
              placeholder="Enter task name" 
              className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button 
              onClick={handleAddTask} 
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded-r-lg transition duration-300"
            >
              Add Task
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-teal-700">Check your task status below, everyone</h2>

          <ul className="space-y-3 mb-6">
            {
              data.map((task) => (
                <li key={task.id} className="flex justify-between items-center bg-white shadow-sm rounded-lg px-4 py-3">
              {
                editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{task.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-2 py-1 bg-black text-white rounded hover:bg-white hover:text-black hover:border"
                      >
                        Delete
                      </button>
                    </div>
                  </>
        )
      }             </li>
              ))
            }
          </ul>

          {data.length === 0 && (
            <div className="text-center">
              <p className="mb-4 text-gray-600 font-semibold">No users remaining</p>
              <button 
                onClick={handleReload} 
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
              >
                Reload
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default App