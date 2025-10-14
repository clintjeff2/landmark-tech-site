"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors" aria-label="Toggle theme">
        <Sun size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-foreground group-hover:text-yellow transition-colors" />
      ) : (
        <Moon size={20} className="text-foreground group-hover:text-purple transition-colors" />
      )}
    </button>
  )
}
