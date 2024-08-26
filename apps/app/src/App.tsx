import { Routes, Route } from "react-router";
import LandingPage from "./pages/landing-page";
import Layout from "./components/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
