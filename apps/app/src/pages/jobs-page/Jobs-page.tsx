import React from "react";
import SearchBar from "../../components/search-bar/search-bar";
import JobList from "../../components/job-list/job-list";
import FilterSidebar from "../../components/filter-sidebar/filter-sidebar";
import { motion } from "framer-motion";

const JobPage: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl  font-bold mb-8 text-center text-blue-800"
        >
          Find your dream job
        </motion.h1>
        <SearchBar />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <FilterSidebar />
          <JobList />
        </div>
      </main>
    </div>
  );
};

export default JobPage;
