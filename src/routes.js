import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CameraLayout from 'src/layouts/CameraLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import LoadingView from 'src/views/auth/LoadingView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import UserListView from 'src/views/user/UserListView';
import DesignListView from 'src/views/design/DesignListView';
import UserProfileView from 'src/views/user/UserProfileView';
import DesignDetailView from 'src/views/design/DesignDetailView';
import DesignFormView from 'src/views/design/DesignFormView';
// import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ProtectedRoute from 'src/components/ProtectedRoute';
import TattooListView from 'src/views/tattoos/TattooListView';
import UserTattoos from 'src/views/tattoos/TattooListView/UserTattoos';
import AudioView from 'src/views/tattoos/AudioView';
import ScanForm from './views/tattoos/Scan';
import TattooView from 'src/views/tattoos/TattooListView/Tattoo';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout/>,
    children: [
      {path: 'account', element: <ProtectedRoute element={<AccountView/>}/>},
      {path: 'customers', element: <ProtectedRoute element={<CustomerListView/>}/>},
      {path: 'dashboard', element: <ProtectedRoute element={<DashboardView/>}/>},
      {path: 'products', element: <ProtectedRoute element={<ProductListView/>}/>},
      {path: 'users', element: <ProtectedRoute element={<UserListView/>}/>},
      {path: 'designs', element: <ProtectedRoute element={<DesignListView/>}/>},
      {path: 'user/:id', element: <ProtectedRoute element={<UserProfileView/>}/>},
      {path: 'design/:id', element: <ProtectedRoute element={<DesignDetailView/>}/>},
      {path: 'design/add', element: <ProtectedRoute element={<DesignFormView/>}/>},
      {path: 'tattoos/', element: <ProtectedRoute element={<TattooListView/>}/>},
      {path: 'tattoo/:id', element: <ProtectedRoute element={<TattooView/>}/>},
      {path: 'user/tattoos', element: <ProtectedRoute element={<UserTattoos/>}/>},
      // { path: 'scan/', element: <ProtectedRoute element={<ScanForm />} /> },
      {path: 'settings', element: <ProtectedRoute element={<SettingsView/>}/>},
      {path: '*', element: <Navigate to="/camera/scan2"/>}
    ]
  },
  {
    path: 'camera',
    element: <CameraLayout/>,
    children: [
      { path: 'scan/', element: <ScanForm /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {path: 'login', element: <LoginView/>},
      {path: 'register', element: <RegisterView/>},
      {path: 'loading', element: <LoadingView/>},
      // { path: 'register', element: <RegisterView /> },
      {path: '404', element: <NotFoundView/>},
      {path: '/', element: <Navigate to="/camera/scan"/>},
      {path: 'audio/:id/:type', element: <ProtectedRoute element={<AudioView/>}/>},
      {path: '*', element: <Navigate to="/404"/>}
    ]
  }
];

export default routes;
