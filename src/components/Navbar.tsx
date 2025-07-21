import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-sm sm:text-base">
      <div className="flex flex-wrap gap-4 mb-2 sm:mb-0">
        <Link to="/" className="text-blue-600">Home</Link>
        {isAuthenticated && (
          <>
            <Link to="/recipes" className="text-blue-600">All Recipes</Link>
            <Link to="/recipes/my" className="text-blue-600">My Recipes</Link>
            <Link to="/recipes/add" className="text-blue-600">Add Recipe</Link>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/register" className="text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
