import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'bumblebee')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dracula' : 'bumblebee'
    )
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-9 h-9 rounded-full flex items-center justify-center text-base-content/50 hover:text-base-content hover:bg-base-200 active:scale-95 transition-all duration-150 cursor-pointer"
      title="toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}