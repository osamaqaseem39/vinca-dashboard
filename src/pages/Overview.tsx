import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const Overview = () => {
  const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1% from last month', trend: 'up' as const },
    { title: 'Active Users', value: '2,350', change: '+180.1% from last month', trend: 'up' as const },
    { title: 'Orders', value: '1,234', change: '+19% from last month', trend: 'up' as const },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5% from last month', trend: 'down' as const },
  ]

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Overview</h2>
        <p className="text-gray-600 font-medium">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white border-2 border-black rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
            <p className="text-3xl font-bold text-black mb-1">{stat.value}</p>
            <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Sales Overview</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500 font-medium">Chart visualization area</p>
          </div>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-6">
          <h3 className="text-xl font-bold text-black mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/products">
              <Button variant="outline" className="w-full justify-center">
                Manage Products
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="outline" className="w-full justify-center">
                View Orders
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" className="w-full justify-center">
                Manage Categories
              </Button>
            </Link>
            <Link to="/users">
              <Button variant="outline" className="w-full justify-center">
                Manage Users
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview

