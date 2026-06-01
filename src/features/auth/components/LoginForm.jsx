import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const copy = {
  signIn: {
    heading: 'welcome back ✌️',
    sub: "let's see what's in your food today",
    btn: 'Sign in',
    toggle: "New here?",
    toggleBtn: 'Create an account',
  },
  signUp: {
    heading: 'welcome aboard 🚀',
    sub: 'join the ones who actually read labels',
    btn: 'Create account',
    toggle: 'Already one of us?',
    toggleBtn: 'Sign in',
  },
}

export default function LoginForm() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const current = isSignUp ? copy.signUp : copy.signIn

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (isSignUp) {
      const { error } = await signUp(email, password)
      if (error) setError(error.message)
      else setMessage('check your inbox — confirmation link sent 📬')
    } else {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
      else navigate('/')
    }

    setLoading(false)
  }

  const handleToggle = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    setMessage(null)
  }

  return (
    <div className="card bg-base-100 border border-base-200 w-full max-w-sm shadow-sm">
      <div className="card-body gap-4 p-6">

        <div>
          <h2 className="text-2xl font-bold">{current.heading}</h2>
          <p className="text-sm text-base-content/50 mt-1">{current.sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-base-content/50">email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered input-sm w-full focus:outline-primary transition-all duration-150"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-base-content/50">password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered input-sm w-full focus:outline-primary transition-all duration-150"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="alert alert-error py-2 text-xs rounded-xl">
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="alert alert-success py-2 text-xs rounded-xl">
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-sm mt-1 active:scale-95 transition-all duration-150"
            disabled={loading}
          >
            {loading
              ? <span className="loading loading-spinner loading-xs" />
              : current.btn}
          </button>
        </form>

        <p className="text-xs text-center text-base-content/40">
          {current.toggle}{' '}
          <button
            onClick={handleToggle}
            className="text-primary underline underline-offset-2 hover:text-primary/70 cursor-pointer transition-colors duration-150"
          >
            {current.toggleBtn}
          </button>
        </p>

      </div>
    </div>
  )
}