import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Users, TrendingUp, Search, PlusCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <main className="container mx-auto px-4 py-12">
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-bold mb-6 text-blue-800">
            Your Gateway to Career Opportunities
          </h2>
          <p className="text-xl mb-10 text-gray-600">
            Connecting talented professionals with amazing job opportunities
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/jobs">
              <motion.a
                href="#"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
                <span>Find Jobs</span>
              </motion.a>
            </Link>
            <motion.a
              href="#"
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Post a Job</span>
            </motion.a>
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-blue-800">
            Featured Jobs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Senior Software Engineer",
                company: "TechCorp Inc.",
                location: "San Francisco, CA",
                description:
                  "Join our innovative team to build cutting-edge solutions that shape the future of technology.",
                salary: "$120k - $180k",
              },
              {
                title: "Marketing Manager",
                company: "BrandBoost",
                location: "New York, NY",
                description:
                  "Lead our marketing efforts and drive growth for our expanding client base.",
                salary: "$90k - $130k",
              },
              {
                title: "UX/UI Designer",
                company: "DesignMasters",
                location: "London, UK",
                description:
                  "Create stunning user experiences for web and mobile applications.",
                salary: "£60k - £90k",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  {job.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {job.company} • {job.location}
                </p>
                <p className="text-sm text-gray-500 mb-4">{job.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-600">
                    {job.salary}
                  </span>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <TrendingUp className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-10 text-blue-800">
            Why Choose JobHub?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <Users className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 text-blue-800">
                Extensive Network
              </h4>
              <p className="text-gray-600">
                Connect with thousands of employers and job seekers worldwide
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 text-blue-800">
                Smart Matching
              </h4>
              <p className="text-gray-600">
                Our AI-powered system finds the perfect fit for your skills and
                aspirations
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <Briefcase className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 text-blue-800">
                Career Resources
              </h4>
              <p className="text-gray-600">
                Access tools and expert advice to advance your career to new
                heights
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h5 className="text-2xl font-bold mb-4">JobHub</h5>
              <p className="text-blue-200">
                Empowering careers, connecting talents with opportunities
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition duration-300"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
