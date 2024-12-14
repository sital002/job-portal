import React, { useState } from "react";
import SearchBar from "../../components/search-bar/search-bar";
import JobList from "../../components/job-list/job-list";
import FilterSidebar from "../../components/filter-sidebar/filter-sidebar";
import { motion } from "framer-motion";
export type Filter={
  title:string,
  location:string,
  type:string,
  minSalary:number,
  maxSalary:number,
  datePosted:string
}
const JobPage: React.FC = () => {
  const [filter,setFilter]=useState({
    title:"",
    location:"",
    type:"",
    minSalary:0,
    maxSalary:100000,
    datePosted:"Anytime"

  })
  
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
        <SearchBar setFilter={setFilter} filter={filter} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <FilterSidebar setFilter={setFilter} filter={filter} />
          <JobList />
        </div>
      </main>
    </div>
  );
};

export default JobPage;
