import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateUser from "../../components/AdminComponents/Client/CreateUser/CreateUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/usuario/login", {
        email,
        password,
      });
      console.log(response.data);
      const { userId, role } = response.data;

      // Guardo el rol en el localStorage para usarlo en otras rutas
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", role);

      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "CLIENTE") {
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-800">
      <div className="absolute top-20 w-full text-center">
        <span className="text-5xl font-extrabold text-white">SegureAI</span>
      </div>

      <div className="w-full max-w-md p-8 rounded-md text-black bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesion</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="block relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-gray-300 text-lg w-full p-3 focus:ring-2 ring-offset-2 ring-gray-900 outline-none"
            />
          </div>
          <div className="block relative">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded border border-gray-300 text-lg w-full p-3 focus:ring-2 ring-offset-2 ring-gray-900 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full py-3 rounded text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-4">
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            ¿Aún no tienes una cuenta? Regístrate
          </span>
        </div>
      </div>

     
      {showModal && <CreateUser closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default Login;
