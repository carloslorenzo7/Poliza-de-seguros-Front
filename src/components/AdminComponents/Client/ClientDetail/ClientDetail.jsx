import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuario/${id}`);
        setCliente(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCliente();
  }, [id]);

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error al cargar información del cliente: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16 border border-gray-300 relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Perfil del Cliente
      </h1>

      {cliente ? (
        <div className="space-y-8">
          
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 pb-2">
              Información del Cliente
            </h2>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <p>
                <strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}
              </p>
              <p>
                <strong>Teléfono:</strong> {cliente.telefono}
              </p>
              <p>
                <strong>DNI:</strong> {cliente.dni}
              </p>
              <p>
                <strong>Email:</strong> {cliente.email}
              </p>
              <p>
                <strong>Dirección:</strong> {cliente.direccion}
              </p>
              <p>
                <strong>Rol:</strong> {cliente.rol}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontró información del cliente.
        </p>
      )}

      <button
        onClick={() => navigate("/admin-dashboard/clients")}
        className="absolute top-4 left-2 flex items-center gap-2 text-blue-700 font-semibold hover:text-white hover:bg-blue-500 px-3 py-2 rounded-md transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <IoArrowBackSharp size={25} />
        Volver
      </button>
    </div>
  );
};

export default ClientDetail;
