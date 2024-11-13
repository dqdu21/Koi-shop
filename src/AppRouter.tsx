import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import ConsignmentForm from './pages/ConsignmentForm';
import Consignment from './pages/Consignment';
import WelcomeStaff from './pages/staff/welcome/WelcomeStaff';
import WelcomeAdmin from './pages/admin/welcome/WelcomeAdmin';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Product from './pages/admin/product/product';
import PaymentSuccess from './pages/payment-successs/PaymentSuccess';
import OrderHistory from './pages/OrderHistory';
import ConsignmentList from './pages/ConsignmentList';
import ConsignmentDetail from './pages/ConsignmentDetail';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productID" element={<ProductDetail />} />
        <Route path="/consignment" element={<Consignment/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/consignment-form" element={<ConsignmentForm/>} />
        <Route path="/consignments" element={<ConsignmentList/>} />
        <Route path="/consignment/:consignmentId" element={<ConsignmentDetail />} />
        {/* Admin Routes */}
                    {/* Admin Routes */}
        <Route path="/admin" element={<WelcomeAdmin />} />
        <Route path='/admin/product-manage' element={<Product />} />
                    {/* Staff Routes */}
        <Route path="/staff" element={<WelcomeStaff />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/order-history' element={<OrderHistory />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
