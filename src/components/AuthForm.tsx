import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../services/authService'
import { useAuth } from '../hooks/useAuth'

interface Props {
  mode: 'login' | 'register'
}

const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: saveToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = mode === 'login'
        ? await login(email, password)
        : await register(email, password)

      saveToken(res.access_token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {mode === 'login' ? 'Log In' : 'Register'}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-3 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-3 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {mode === 'login' ? 'Log In' : 'Register'}
      </button>
    </form>
  )
}

export default AuthForm
