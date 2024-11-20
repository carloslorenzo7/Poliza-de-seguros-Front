//import PolicyForm from "../../components/AdminComponents/Policy/PolicyForm/PolicyForm";
import { Link } from "react-router-dom";
import PolicyList from "../../components/AdminComponents/Policy/PolicyList/PolicyList";
import { FaPlus } from "react-icons/fa";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
const AdminDashboard = () => {
  return (
    <div > 
    <div className=" pt-10 bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto mt-8"> 
      <PolicyList />
    </div>
    <Link
      to="/admin-dashboard/createPolicy"
      className="fixed bottom-20 right-20 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
    >
      <FaPlus size={24} />
    </Link>
    <div className="flex justify-center mt-6">

    <LogoutButton/>
    </div>
  </div>
  );
};

export default AdminDashboard;
