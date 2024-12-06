import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CreateUser from "../CreateUser/CreateUser";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);
  
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/usuario/todos");
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/usuario/${id}`);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
      toast.success("Cliente eliminado con éxito");
      console.log("Cliente eliminado exitosamente");
    } catch (error) {
      console.error(error.message);
      toast.error("Error al eliminar cliente");
    }
  };

  // Función para cambiar el rol
  const handleChangeRole = async (id, newRole) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/usuario/rol/${id}`,
        { rol: newRole }
      );
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === id ? { ...client, rol: response.data.rol } : client
        )
      );
      toast.success("Rol actualizado con éxito");
    } catch (error) {
      console.error(error.message);
      toast.error("Error al actualizar el rol");
    }
  };

  // funcion para actualizar la carga de clientes luego de crear
  const handleModalClose = () => { 
    setShowModal(false);
     fetchClients();
     
  };
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-full p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Lista de Clientes
      </h2>
      {clients.length > 0 ? (
        <table className="w-full border-collapse border bg-white border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
              <th className="border p-2">Id</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Direccion</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md font-normal">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="border p-2">{client.id}</td>
                <td className="border p-2">
                  <Link
                    to={`/admin-dashboard/client-detail/${client.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {client.nombre}
                  </Link>
                </td>
                <td className="border p-2">{client.apellido}</td>
                <td className="border p-2">{client.email}</td>
                <td className="border p-2">{client.telefono}</td>
                <td className="border p-2">{client.direccion}</td>
                <td className="border p-2">
                  <select
                    className="bg-gray-200 p-2 rounded"
                    value={client.rol}
                    onChange={(e) =>
                      handleChangeRole(client.id, e.target.value)
                    }
                  >
                    <option value="CLIENTE">CLIENTE</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    className="text-red-500 px-2 py-1 rounded"
                    onClick={() => handleDelete(client.id)}
                  >
                    <MdDeleteForever size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes disponibles</p>
      )}
      <button onClick={() => setShowModal(true)} className="fixed bottom-20 right-20 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700" >
         <FaPlus size={24} />
         </button>
          {showModal && <CreateUser closeModal={handleModalClose} />} 
    </div>

  );
};

export default ClientList;
