import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages";
import {
  AboutUs,
  AddHotel,
  SharedLayout,
  Contact,
  Stats,
  Cart,
  DeleteHotel,
  WishList,
  Profile,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="add-hotel" element={<AddHotel />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="delete-hotel" element={<DeleteHotel />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
