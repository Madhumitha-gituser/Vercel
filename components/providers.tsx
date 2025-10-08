'use client'

import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// User Context
interface User {
  id: string
  email: string
  name: string
  role: 'employee' | 'manager' | 'hr' | 'admin'
  department: string
  designation: string
  avatar?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Providers Component
export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      // Mock user data
      setUser({
        id: '1',
        email: 'madhumitha.m@powergrid.co.in',
        name: 'Madhumitha M',
        role: 'employee',
        department: 'Engineering',
        designation: 'Senior Engineer',
        avatar: ''  // Removed avatar URL
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}