import { Link } from "react-router-dom";

const NavBar = () => {
  const isAdminView = location.pathname.startsWith("/admin");
  return (
    <div className="bg-blue-600 p-4 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center h-full">
        {isAdminView && (
          <div className="flex justify-center space-x-4 flex-1">
            <Link
              to="/admin-dashboard/clients"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
            >
              Usuarios
            </Link>
            <Link
              to="/admin-dashboard"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
            >
              Pólizas
            </Link>
          </div>
        )}
        <span className="text-white text-2xl font-bold ml-auto">SegurAI</span>
      </div>
    </div>
  );
};

export default NavBar;
