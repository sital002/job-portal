import { Routes, Route } from "react-router";
import LandingPage from "./pages/landing-page";
import Layout from "./components/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import JobPage from "./pages/jobs-page/Jobs-page";
import Custom404 from "./pages/custom404page/404-error";
import SingleJob from "./pages/single-job/single-job";
import { BookMarkPage } from "./pages/bookmark-page/bookmark-page";
import ProtectedRoute from "./utils/protected-route";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="jobs" element={<JobPage />} />
          <Route path="jobs/:jobId" element={<SingleJob />} />
          <Route path="jobs/bookmarks" element={<ProtectedRoute />}>
            <Route index element={<BookMarkPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </>
  );
}

export default App;
