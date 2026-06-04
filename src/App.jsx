import './App.css'
import Home from './pages/Home'
import Spotlight from './pages/Spotlight'
import Loader from './components/HomePage/Loader'
import Layout from './components/common/Layout'

import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div>
        {
          loading ? (
            <Loader />
          ) : (
            <Routes>

              {/* Home page unchanged */}
              <Route
                path="/"
                element={<Home />}
              />

              {/* Spotlight with Navbar + Footer */}
              <Route
                path="/spotlight"
                element={
                  <Layout>
                    <Spotlight />
                  </Layout>
                }
              />

            </Routes>
          )
        }
      </div>
    </BrowserRouter>
  )
}

export default App
