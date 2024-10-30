import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
import Consignment from '../pages/Consignment';
import WelcomeAdmin from '../pages/admin/welcome/WelcomeAdmin'
import WelcomeStaff from '../pages/staff/welcome/WelcomeStaff'
import ConsignmentForm from '../pages/ConsignmentForm';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SigninPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="/consignment" element={<Consignment/>} />
        <Route path="/consignment-form" element={<ConsignmentForm/>} />
                    {/* Admin Routes */}
        <Route path="/admin" element={<WelcomeAdmin />} />
                    {/* Staff Routes */}
        <Route path="/staff" element={<WelcomeStaff />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
