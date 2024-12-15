import { Routes, Route } from "react-router";
import LandingPage from "./pages/landing-page";
import Layout from "./components/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import JobPage from "./pages/jobs-page/Jobs-page";
import Custom404 from "./pages/custom404page/404-error";
import SingleJob from "./pages/single-job/single-job";
import { BookMarkPage } from "./pages/bookmark-page/bookmark-page";

import JobForm from "./components/job-form/job-form";
import JobSeekerRoute from "./routes/job-seeker-route";
import RecruiterRoute from "./components/admin-route";
import AdminRoute from "./routes/admin-route";
import Unauthorized from "./pages/unauthorized";
// import RecruiterDashboard from "./pages/recruiter-dashboard/recruiter-dashboard";
// import AdminDashboard from "./pages/admin-dashboard/admin-dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Job Seeker Routes */}
        <Route element={<JobSeekerRoute />}>
          <Route path="jobs" element={<JobPage />} />
          <Route path="jobs/:jobId" element={<SingleJob />} />
          <Route path="jobs/bookmarks" element={<BookMarkPage />} />
        </Route>

        {/* Recruiter Routes */}
        <Route element={<RecruiterRoute />}>
          {/* <Route path="recruiter/dashboard" element={<RecruiterDashboard />} /> */}
          <Route path="recruiter/create-job" element={<JobForm />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          {/* <Route path="admin/dashboard" element={<AdminDashboard />} /> */}
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Custom404 />} />
    </Routes>
  );
}

export default App;
