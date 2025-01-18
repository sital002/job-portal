import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "../../pages/jobs-page/Jobs-page";

type FilterSidebarProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filter, setFilter }) => {
  const [datePosted, setDatePosted] = useState<string>("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");

  const getDateRange = (days: number): string => {
    if (days === 0) return "";
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
  };

  useEffect(() => {
    setFilter({
      ...filter,
      datePosted: getDateRange(Number(datePosted)),
      type: jobType,
      minSalary: minSalary ? parseInt(minSalary, 10) : 0,
      maxSalary: maxSalary ? parseInt(maxSalary, 10) : 100000,
    });
  }, [datePosted, jobType, minSalary, maxSalary]);

  const handleSalaryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setter(value);
    }
  };

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
            onChange={(e) => setDatePosted(e.target.value)}
          >
            <option value="">Anytime</option>
            <option value="1">Past 24 hours</option>
            <option value="7">Past week</option>
            <option value="30">Past month</option>
          </select>
        </div>
        <div>
          <h3 className="font-medium mb-2">Job Type</h3>
          <div className="space-y-2">
            {["full time", "part time", "intern", "remote"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={type}
                  checked={jobType.includes(type)}
                  onChange={(e) =>
                    setJobType((prev) =>
                      prev.includes(e.target.value)
                        ? prev.filter((val) => val !== e.target.value)
                        : [...prev, e.target.value]
                    )
                  }
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Salary Range</h3>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label htmlFor="minSalary" className="text-sm text-gray-600">
                Min
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  id="minSalary"
                  type="text"
                  className="w-full pl-6 pr-2 py-1 border rounded-md"
                  value={minSalary}
                  onChange={(e) => handleSalaryChange(e, setMinSalary)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="maxSalary" className="text-sm text-gray-600">
                Max
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  id="maxSalary"
                  type="text"
                  className="w-full pl-6 pr-2 py-1 border rounded-md"
                  value={maxSalary}
                  onChange={(e) => handleSalaryChange(e, setMaxSalary)}
                  placeholder="No limit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default FilterSidebar;
