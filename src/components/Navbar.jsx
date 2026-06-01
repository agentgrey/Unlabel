import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="navbar bg-base-100 border-b border-base-200 px-6 h-16">
      <div className="flex-1">
        <Link
          to="/"
          className="flex flex-col leading-tight group"
        >
          <span className="text-xl font-bold tracking-tight">
            Unlabel
          </span>
          <span className="text-[11px] text-base-content/40">
            the truth behind every ingredient
          </span>
        </Link>
      </div>

      <div className="flex-none flex items-center gap-3">
        <ThemeToggle />
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold text-sm cursor-pointer hover:opacity-80 active:scale-95 transition-all duration-150 select-none"
            >
              {user.email?.[0].toUpperCase()}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-xl border border-base-200 z-50 w-52 p-2 mt-2"
            >
              <li>
                <span className="text-xs text-base-content/40 truncate block cursor-default">
                  {user.email}
                </span>
              </li>
              <div className="divider my-0.5 h-px bg-base-200" />
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-error hover:bg-error/10 rounded-lg px-2 py-1.5 w-full text-left transition-colors duration-150 cursor-pointer"
                >
                  sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}