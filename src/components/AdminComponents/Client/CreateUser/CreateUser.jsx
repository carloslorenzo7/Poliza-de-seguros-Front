import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const CreateUser = ({ closeModal }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/usuario/nuevoUsuario", {
        nombre,
        apellido,
        dni,
        telefono,
        direccion,
        email,
        password,
      });
      console.log("Usuario creado:", response.data);
      closeModal(); 
      toast.success("Usuario creado con exito")
    } catch (error) {
        toast.error("Error al crear el usuario")
      console.error("Error al crear usuario:", error);
    
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        
        <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-gray-300 text-lg w-full p-3"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 w-full py-3 rounded text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Crear cuenta
          </button>
        </form>

        <button
          onClick={closeModal}
          className="mt-4 w-full py-3 text-red-500 hover:text-white border border-red-500 hover:bg-red-500 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

CreateUser.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default CreateUser;
