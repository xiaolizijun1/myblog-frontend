import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import NewPost from './pages/NewPost'

import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<NewPost />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
