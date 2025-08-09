import { Link, useLocation } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

export default function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          return (
            <li key={to} className="flex items-center">
              <FaChevronRight className="text-gray-400 mx-2" size={10} />
              {last ? (
                <span className="text-primary font-medium">
                  {value.replace(/-/g, ' ')}
                </span>
              ) : (
                <Link to={to} className="text-gray-500 hover:text-primary">
                  {value.replace(/-/g, ' ')}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}