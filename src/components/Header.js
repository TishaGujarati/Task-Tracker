import Button from './Button'
import { useLocation } from 'react-router-dom'

export const Content = {
    header:"Task Tracker"
}

const Header = ({ setShowAddTask, showAdd ,showAddTask}) => {
  const location = useLocation()

  console.log("showAddTask",showAddTask)
  console.log("Header called")  
  return (
    <header className='Header'>
      <h1>{Content.header}</h1>
      {location.pathname === '/' && (
      <Button        
          color={showAddTask ? 'red' : 'green'}
          text={showAddTask ? 'Close' : 'Add'}
          onClick={()=>setShowAddTask(!showAddTask)}
      />
      )}
    </header>
  )
}

export default Header
