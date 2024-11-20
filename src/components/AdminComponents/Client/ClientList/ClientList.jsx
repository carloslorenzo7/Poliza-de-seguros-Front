import axios from "axios";
import { useEffect, useState } from "react";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchClients();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-full p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center">Lista de Clientes</h2>
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
              
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md font-normal">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="border p-2">{client.id}</td>
                <td className="border p-2">{client.nombre}</td>
                <td className="border p-2">{client.apellido}</td>
                <td className="border p-2">{client.email}</td>
                <td className="border p-2">{client.telefono}</td>
                <td className="border p-2">{client.direccion}</td>
                <td className="border p-2">{client.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay clientes disponibles</p>
      )}
    </div>
  );
};

export default ClientList;
