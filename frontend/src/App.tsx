import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RentalDetail from './pages/RentalDetail';
import Profile from './pages/Profile';
import AddRentalForm from './pages/AddRentalForm';
import UpdateRentalForm from './pages/UpdateRentalForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/rental/:id"
            element={
              <PrivateRoute>
                <RentalDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/rentals/new"
            element={
              <PrivateRoute>
                <AddRentalForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/rental/:id/update"
            element={
              <PrivateRoute>
                <UpdateRentalForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
