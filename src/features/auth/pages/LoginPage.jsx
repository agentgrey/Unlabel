import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Unlabel</h1>
          <p className="text-base-content/40 text-sm mt-1">
            the truth behind every ingredient
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}