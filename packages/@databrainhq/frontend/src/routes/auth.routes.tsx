import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import EmbedDashboard from 'pages/EmbedDashboard';
import AcceptInvitation from 'pages/AccepInvitation';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import InviteRequest from 'pages/InviteRequest';
import Verification from 'pages/SignUp/components/Verifcation';
import AuthLayout from 'components/AuthLayout/AuthLayout';

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/users/sign-in" element={<SignIn />} />
        <Route path="/users/sign-up" element={<SignUp />} />
        <Route path="/users/inviteRequest" element={<InviteRequest />} />
        <Route
          path="/users/acceptInvitation/:token"
          element={<AcceptInvitation />}
        />
        <Route path="/users/verify/:token" element={<Verification />} />
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/embedDashboards" element={<EmbedDashboard />} />
        <Route path="*" element={<Navigate replace to="/users/sign-in" />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoutes;
