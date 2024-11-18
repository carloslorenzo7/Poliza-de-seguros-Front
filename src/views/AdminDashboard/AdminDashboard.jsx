import PolicyForm from "../../components/AdminComponents/Policy/PolicyForm/PolicyForm";
import PolicyList from "../../components/AdminComponents/Policy/PolicyList/PolicyList";

const AdminDashboard = () => {
  return (
    <div>
      <PolicyList />
      <PolicyForm />
    </div>
  );
};

export default AdminDashboard;
