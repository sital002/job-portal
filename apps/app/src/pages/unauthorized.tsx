import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-4">You do not have permission to access this page.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home page
      </Link>
    </div>
  );
};

export default Unauthorized;
