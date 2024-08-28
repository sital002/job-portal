import React from "react";
import { motion } from "framer-motion";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Product Designer",
    company: "Gojek",
    location: "Marina East, Singapore",
    type: "Full-time",
    postedAt: "5 mins ago",
  },
  {
    id: 2,
    title: "Copywriting Specialist",
    company: "Odama Studio",
    location: "Paris, France",
    type: "Freelance",
    postedAt: "3 days ago",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Twitter",
    location: "Málaga, Spain",
    type: "Full-time",
    postedAt: "3 days ago",
  },
];

const JobList: React.FC = () => {
  return (
    <div className="flex-grow">
      <h2 className="text-xl font-semibold mb-4">250 Jobs results</h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">{job.location}</span>
              <span className="text-sm text-gray-500">{job.type}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Posted {job.postedAt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
