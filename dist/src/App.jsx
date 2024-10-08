import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StyleProvider } from './Styles'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import NavBar from './components/NavBar'

function App() {
  return (
    <StyleProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </StyleProvider>
  )
}

export default App
