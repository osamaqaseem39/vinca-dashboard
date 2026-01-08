import { Outlet, useLocation, Link } from 'react-router-dom'

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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
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

  const sidebarItems = [
    { icon: '📊', label: 'Overview', path: '/' },
    { icon: '📦', label: 'Products', path: '/products' },
    { icon: '🏷️', label: 'Categories', path: '/categories' },
    { icon: '🛒', label: 'Orders', path: '/orders' },
    { icon: '👥', label: 'Users', path: '/users' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">Vinca Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border-2 border-black rounded-xl font-medium hover:bg-black hover:text-white transition-colors">
                Notifications
              </button>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r-2 border-black min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
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

