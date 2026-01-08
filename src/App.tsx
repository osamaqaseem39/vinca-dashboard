import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Overview from './pages/Overview'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Inventory from './pages/Inventory'
// Product pages
import AddProduct from './pages/products/AddProduct'
import UpdateProduct from './pages/products/UpdateProduct'
import ProductDetail from './pages/products/ProductDetail'
// User pages
import AddUser from './pages/users/AddUser'
import UpdateUser from './pages/users/UpdateUser'
import UserDetail from './pages/users/UserDetail'
// Category pages
import AddCategory from './pages/categories/AddCategory'
import UpdateCategory from './pages/categories/UpdateCategory'
import CategoryDetail from './pages/categories/CategoryDetail'
// Order pages
import UpdateOrder from './pages/orders/UpdateOrder'
import OrderDetail from './pages/orders/OrderDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="products/:id/edit" element={<UpdateProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/:id" element={<CategoryDetail />} />
          <Route path="categories/:id/edit" element={<UpdateCategory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="orders/:id/edit" element={<UpdateOrder />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="users/:id/edit" element={<UpdateUser />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
