import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routes from './Routes'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (

    <AuthProvider>
      <Routes />
    </AuthProvider>
   
  )
}

export default App
