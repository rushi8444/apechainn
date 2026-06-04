import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default Layout