import { useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/UseAuth';
import Layout from './Layout';
import PrivateRoute  from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import {refreshUser} from '../redux/auth/auth-operations';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch((refreshUser));
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
          />
          <Route path="*" element={<Navigate to="/" />} />{' '}
          
        </Route>
        
    </Routes>
  );
};


export default App;



// import { PhonebookBox, ContactBox, Title } from './App.styaled'


// export const App = () => {
//   return (
    // <PhonebookBox>
    //   <Title>Phonebook</Title>
    //   <ContactForm />
    //   <ContactBox>
    //     <Filter />
    //     <ContactList />
    //   </ContactBox>
    // </PhonebookBox>
//   );
// };