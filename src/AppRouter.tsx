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
import AdminConsignment from './pages/admin/consignment/AdminConsignment';
import About from './pages/About';
import Blog from './pages/Blog';
import Batch from './pages/admin/batch/batch';
import Order from './pages/admin/order/order';
import Shipment from './pages/admin/shipment/shipment';
import AdminPromotionPage from './pages/admin/promotion/AdminPromotionPage';
import AdminPromotionList from './pages/admin/promotion/AdminPromotionList';
import EditPromotion from './pages/admin/promotion/EditPromotion';
import BatchDetail from './pages/BatchDetail';
import PromotionDetails from './pages/admin/promotion/PromotionDetails';
// import Orders from './pages/admin/order/order';

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
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="batch/:batchID" element={<BatchDetail />} />

        <Route path="/consignment-form" element={<ConsignmentForm/>} />
        <Route path="/consignment-list" element={<ConsignmentList/>} />
        <Route path="/consignment/:consignmentId" element={<ConsignmentDetail />} />
        {/* Admin Routes */}
                    {/* Admin Routes */}
        <Route path="/admin" element={<WelcomeAdmin />} />
        <Route path='/admin/product-manage' element={<Product />} />
        <Route path='/admin/manage-orders' element={<Order />} />
        <Route path='/admin/batch' element={<Batch />} />
        <Route path='/admin/shipment' element={<Shipment />} />

        {/* <Route path="/admin/order" element={<Orders />} />  */}
        <Route path="/admin/consignments" element={<AdminConsignment />} />
        <Route path="/admin/promotion" element={<AdminPromotionPage />} />
        <Route path="/admin/promotion-list" element={<AdminPromotionList />} />
        <Route path="/admin/promotion/:id" element={<PromotionDetails />} />
        <Route path="/admin/promotion/edit/:id" element={<EditPromotion />} />



                    {/* Staff Routes */}
        <Route path="/staff" element={<WelcomeStaff />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/order-history' element={<OrderHistory />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
