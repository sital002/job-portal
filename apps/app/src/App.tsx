import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Layout from "./components/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import JobPage from "./pages/jobs-page/Jobs-page";
import Custom404 from "./pages/custom404page/404-error";
import SingleJob from "./pages/single-job/single-job";
import { BookMarkPage } from "./pages/bookmark-page/bookmark-page";

import JobForm from "./components/job-form/job-form";

import Unauthorized from "./pages/unauthorized";
import { ProtectedRoute } from "./routes/job-seeker-route";
import RecruiterRoute from "./routes/recruiter-route";
import AdminRoute from "./routes/admin-route";
import RecruiterLayout from "./components/recruiter-layout";
import RecruitersJob from "./pages/recruiters-job/recruiters-job";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="jobs" element={<JobPage />} />
          <Route path="jobs/:jobId" element={<SingleJob />} />

          <Route path="jobs/bookmarks" element={<BookMarkPage />} />
        </Route>

        {/* Recruiter Routes */}
        <Route element={<RecruiterRoute />}>
          <Route element={<RecruiterLayout />}>
            <Route path="recruiter/jobs/new" element={<JobForm />} />
            <Route path="recruiter/jobs/:jobId" element={<SingleJob />} />
            <Route path="recruiter/jobs/edit/:jobId" element={<JobForm />} />

            <Route path="recruiter/jobs" element={<RecruitersJob />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          {/* <Route path="admin/dashboard" element={<AdminDashboard />} /> */}
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Custom404 />} />
    </Routes>
  );
}

export default App;
