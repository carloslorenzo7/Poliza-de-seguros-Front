import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div>
      <h1 className="text-xl">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesion</button>
      </form>
    </div>
  );
};

export default Login;
