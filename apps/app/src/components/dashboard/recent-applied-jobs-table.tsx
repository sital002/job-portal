import { Link } from "react-router-dom";

export interface JobApplication {
  applicant: string;
  coverLetter: string;
  createdAt: string;
  job: {
    salaryRange: {
      min: number;
      max: number;
    };
    _id: string;
    title: string;
    description: string;
    user: string;
  };
  resume: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface JobApplicationsTableProps {
  applications: JobApplication[];
}

const JobApplicationsTable = ({ applications }: JobApplicationsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Applicant ID</th>
            <th className="px-4 py-2 text-left">Job Title</th>
            <th className="px-4 py-2 text-left">Salary Range</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-t border-gray-300">
              <td className="px-4 py-2">{app.applicant}</td>
              <td className="px-4 py-2">{app.job.title}</td>
              <td className="px-4 py-2">
                ${app.job.salaryRange.min.toLocaleString()} - $
                {app.job.salaryRange.max.toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/jobs/${app.job._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
                  onClick={() => handleDownloadResume(app.resume)}
                >
                  Download Resume
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case "APPLIED":
      return "bg-yellow-200 text-yellow-800";
    case "REJECTED":
      return "bg-red-200 text-red-800";
    case "HIRED":
      return "bg-green-200 text-green-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const handleDownloadResume = async (
  url: string,
  filename: string = "resume.pdf"
) => {
  // Implement resume download logic

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading resume:", error);
  }
};

export default JobApplicationsTable;
