import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

const copy = {
  signIn: {
    heading: 'welcome back ✌️',
    sub: "let's see what's in your food today",
    btn: 'sign in',
    toggle: "new here?",
    toggleBtn: 'create an account',
  },
  signUp: {
    heading: 'welcome aboard 🚀',
    sub: 'join the ones who actually read labels',
    btn: 'create account',
    toggle: 'already one of us?',
    toggleBtn: 'sign in',
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
    <div className="w-full max-w-sm border border-border rounded-2xl p-6 bg-card shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold">{current.heading}</h2>
        <p className="text-sm text-muted-foreground mt-1">{current.sub}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">email</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            minLength={6}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert className="py-2 border-success/30 bg-success/5">
            <AlertDescription className="text-xs text-success">
              {message}
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full mt-1" disabled={loading}>
          {loading
            ? <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                hold on...
              </span>
            : current.btn}
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground">
        {current.toggle}{' '}
        <button
          onClick={handleToggle}
          className="text-primary underline underline-offset-2 hover:text-primary/70 cursor-pointer transition-colors duration-150"
        >
          {current.toggleBtn}
        </button>
      </p>
    </div>
  )
}