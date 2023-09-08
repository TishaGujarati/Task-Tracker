import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import axios from 'axios'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks')
        setTasks(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    getTasks()
  }, [])

  // Add Task
  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', task)
      setTasks([...tasks, response.data])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    try {
      const taskToToggle = await axios.get(`http://localhost:3000/tasks/${id}`)
      const updTask = { ...taskToToggle.data, reminder: !taskToToggle.data.reminder }
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, updTask)
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: response.data.reminder } : task
        )
      )
    } catch (error) {
      console.error('Error toggling reminder:', error)
    }
  }
  return (
    <Router>
      <div className='container'>
        <Header
          setShowAddTask={setShowAddTask}
          showAddTask={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
