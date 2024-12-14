import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "../../pages/jobs-page/Jobs-page";

type SearchbarProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};
const SearchBar: React.FC<SearchbarProps> = ({ setFilter, filter }) => {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter({ ...filter, title, location });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search job title or keyword"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Country or timezone"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Find jobs
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
