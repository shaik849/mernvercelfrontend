import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <div> 
        <nav className="bg-blue-600 text-white p-4 shadow-md">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/posts" className="hover:underline">
            Posts
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  </div>
  )
}

export default Navbar