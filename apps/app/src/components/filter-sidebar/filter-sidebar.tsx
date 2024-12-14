import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "../../pages/jobs-page/Jobs-page";

type FilterSidebarProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};
const FilterSidebar: React.FC<FilterSidebarProps> = ({ filter, setFilter }) => {
  const [datePosted, setDatePosted] = useState<number>(0);
  const [jobType, setJobType] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<number>(0);

  useEffect(() => {
    setFilter({
      ...filter,
      datePosted: datePosted.toString(),
      type: jobType,
      minSalary: salaryRange,
    });
  }, [datePosted, jobType, salaryRange]);

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
          <select
            className="w-full px-2 py-1 border rounded-md"
            value={datePosted}
            onChange={(e) => setDatePosted(Number(e.target.value))}
          >
            <option value={0}>Anytime</option>
            <option value={1}>Past 24 hours</option>
            <option value={2}>Past week</option>
            <option value={3}>Past month</option>
          </select>
        </div>
        <div>
          <h3 className="font-medium mb-2">Job Type</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value="full time"
                onChange={(e) =>
                  setJobType((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((val) => val !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Full-time
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value="part time"
                onChange={(e) =>
                  setJobType((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((val) => val !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Part-time
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value="intern"
                onChange={(e) =>
                  setJobType((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((val) => val !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Intern
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value="remote"
                onChange={(e) =>
                  setJobType((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((val) => val !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Remote
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Salary Range</h3>
          <input
            type="range"
            className="w-full"
            value={salaryRange}
            min="0"
            max="50000"
            step="1000"
            onChange={(e) => setSalaryRange(Number(e.target.value))}
          />
        </div>
        <div>
          <h3 className="font-medium mb-2">Company</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Google
          </label>
        </div>
      </div>
    </motion.aside>
  );
};

export default FilterSidebar;
