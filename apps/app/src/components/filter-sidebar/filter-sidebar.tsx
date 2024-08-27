import React from 'react';
import { motion } from 'framer-motion';

const FilterSidebar: React.FC = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-64 bg-white rounded-lg shadow-md p-4"
    >
      <h2 className="text-xl font-semibold mb-4">Filter</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Date Posted</h3>
          <select className="w-full px-2 py-1 border rounded-md">
            <option>Anytime</option>
            <option>Past 24 hours</option>
            <option>Past week</option>
            <option>Past month</option>
          </select>
        </div>
        <div>
          <h3 className="font-medium mb-2">Job Type</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Full-time
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Part-time
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Contract
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Salary Range</h3>
          <input type="range" className="w-full" min="0" max="100000" step="1000" />
        </div>
      </div>
    </motion.aside>
  );
};

export default FilterSidebar;