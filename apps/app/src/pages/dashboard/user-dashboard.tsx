import SimpleBarChart from "../../components/charts/barchart";
import SimpleLineChart from "../../components/charts/linechart";
import BasicPie from "../../components/charts/piechart";

function UserDashBoard() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Here you can see your profile and other user-specific information</p>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-200 px-4 py-8">Profile</div>
        <div className="bg-gray-200 px-4 py-8">Applications</div>
        <div className="bg-gray-200 px-4 py-8">Bookmarks</div>
        <div className="bg-gray-200 px-4 py-8">Settings</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div className="bg-gray-200 px-4 py-8">
          line Chartjs
          <SimpleLineChart />
        </div>
        <div className="bg-gray-200 px-4 py-8">
          Pie Chart
          <SimpleBarChart />
          <BasicPie />
        </div>
      </div>
      <div>
        <h1>Recent jobs</h1>
        <table className="border-collapse border border-green-800">
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
          <tr>
            <td>Software Engineer</td>
            <td>Google</td>
            <td>Mountain View, CA</td>
            <td>$150,000</td>
          </tr>
          <tr>
            <td>Product Manager</td>
            <td>Facebook</td>
            <td>Menlo Park, CA</td>
            <td>$200,000</td>
          </tr>
          <tr>
            <td>UX Designer</td>
            <td>Apple</td>
            <td>Cupertino, CA</td>
            <td>$120,000</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default UserDashBoard;
