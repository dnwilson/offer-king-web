import { useState } from 'react';
import { AppContext } from './AppContext';
import { Route, Routes } from 'react-router-dom';
import { OfferList } from './offers/Offers';
import { useSession } from './hooks/useSession';
import SignUpForm from './signup/SignupForm';
import LoginForm from './login/LoginForm';
import MainLayout from './shared/MainLayout';
import Profile from './profile/Profile';
import ErrorPage from './shared/ErrorPage';
import './App.scss';

const App = () => {
  const { currentUser, setSession, clearSession } = useSession();
  const [offers, setOffers] = useState([]);

  return (
    <AppContext.Provider
      value={{ currentUser, setSession, clearSession, setOffers, offers }}
    >
      <Routes>
        <Route path="/" element={<MainLayout children={<OfferList />} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route
          path="/profile"
          element={<MainLayout children={<Profile />} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
