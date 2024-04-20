import React, { ReactNode } from 'react';
import RootStore from './data/stores/root.store';
import AppApi from './data/services/api/app-api';
import AppContext from './context/app-context';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './ui/pages/LoginPage';
import MainPage from './ui/pages/MainPage';
import { isAuthenticated } from './utils/isAuthenticated';
import { ROUTES } from './utils/routes';
import { SignupPage } from './ui/pages/SignupPage';

const store = new RootStore();
const api = new AppApi(store);

// Authenticated Route Wrapper
interface AuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<AuthProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

function App() {
  return (
    <AppContext.Provider value={{ store, api }}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route
            path={ROUTES.MAIN}
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
