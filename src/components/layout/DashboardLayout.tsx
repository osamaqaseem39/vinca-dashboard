import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface SidebarItemProps {
  icon: string
  label: string
  path: string
  active?: boolean
}

const SidebarItem = ({ icon, label, path, active }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-light transition-all ${
        active
          ? 'bg-black text-white'
          : 'text-black hover:bg-gray-100 border border-transparent hover:border-black'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

const DashboardLayout = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const sidebarItems = [
    { icon: '📊', label: 'Overview', path: '/' },
    { icon: '📦', label: 'Products', path: '/products' },
    { icon: '📊', label: 'Inventory', path: '/inventory' },
    { icon: '🏷️', label: 'Categories', path: '/categories' },
    { icon: '🛒', label: 'Orders', path: '/orders' },
    { icon: '👥', label: 'Users', path: '/users' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light text-black tracking-wide">Vinca Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border-2 border-black rounded-xl font-light hover:bg-black hover:text-white transition-colors">
                Notifications
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-light text-black">{user?.name}</p>
                  <p className="text-xs font-light text-gray-500 capitalize">{user?.role}</p>
                </div>
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                  {getUserInitials()}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border-2 border-black rounded-xl font-light hover:bg-black hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r-2 border-black min-h-[calc(100vh-73px)] flex flex-col p-6">
          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={location.pathname === item.path}
              />
            ))}
          </nav>
          
          {/* Vertical Footer */}
          <footer className="mt-auto pt-6 border-t-2 border-gray-200">
            <div className="space-y-3">
              <div className="text-xs text-gray-500 font-light">
                <p className="mb-1">Vinca Dashboard</p>
                <p>Version 1.0.0</p>
              </div>
              <div className="flex flex-col gap-2">
                <a 
                  href="#" 
                  className="text-xs text-gray-600 hover:text-black font-light transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Help & Support
                </a>
                <a 
                  href="#" 
                  className="text-xs text-gray-600 hover:text-black font-light transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Documentation
                </a>
                <a 
                  href="#" 
                  className="text-xs text-gray-600 hover:text-black font-light transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </div>
              <div className="pt-2 text-xs text-gray-400 font-light">
                © 2024 Vinca. All rights reserved.
              </div>
            </div>
          </footer>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

