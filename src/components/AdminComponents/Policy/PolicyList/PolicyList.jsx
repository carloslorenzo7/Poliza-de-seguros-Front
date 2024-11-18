import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import EditPolicyForm from "../EditPolicy/EditPolicy";


const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);


  useEffect(() => {
    const axiosPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/usuario/todos");
        console.log(response.data);
        setPolicies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las pólizas:", error);
        setLoading(false);
      }
    };
    axiosPolicies();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estas seguro que deseas eliminar la poliza?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/polizas/${id}`);

        setPolicies((prevPolicies) =>
          prevPolicies.map((user) => ({
            ...user,
            polizas: user.polizas.filter((policy) => policy.id !== id),
          }))
        );
        toast.success("Membresía eliminada con éxito");
        console.log("Poliza eliminada exitosamente");
      } catch (error) {
        console.error(error.message);
        toast.error("Error al eliminar poliza");
      }
    }
  };
  
  const handleEdit = (id) => {
    setSelectedPolicyId(id); // Cambia el estado para mostrar el formulario de edición
  };


  // Función para cerrar el formulario de edición
  const handleCloseEdit = () => {
    setSelectedPolicyId(null); // Restablece el estado, cerrando el formulario de edición
  };

  
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6">
    <ToastContainer position="top-right" autoClose={3000} />
    <h2 className="text-2xl">Listado de Polizas</h2>

    {/* Mostrar el formulario de edición solo si se selecciona una póliza */}
    {selectedPolicyId && (
      <EditPolicyForm 
          policyId={selectedPolicyId} 
          onClose={handleCloseEdit}  // Pasamos la función para cerrar el formulario
        />
    )}

    {policies.length > 0 ? (
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-500">
            <th className="border p-2">Id Poliza</th>
            <th className="border p-2">Id Usuario</th>
            <th className="border p-2">Nombre de Usuario</th>
            <th className="border p-2">Numero de Poliza</th>
            <th className="border p-2">Fecha de inicio</th>
            <th className="border p-2">Fecha de vencimiento</th>
            <th className="border p-2">Monto Asegurado</th>
            <th className="border p-2">Editar</th>
            <th className="border p-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((user) =>
            user.polizas.map((policy) => (
              <tr key={policy.id}>
                <td className="border p-2">{policy.id}</td>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">
                  {user.nombre} {user.apellido}
                </td>

                <td className="border p-2">{policy.numeroDePoliza}</td>
                <td className="border p-2">{policy.fechaDeInicio}</td>
                <td className="border p-2">{policy.fechaDeVencimiento}</td>
                <td className="border p-2">{policy.montoAsegurado}</td>
                <td className="border p-2">
                  <button
                    className="text-blue-500 px-2 py-1 rounded"
                    onClick={() => handleEdit(policy.id)}  // Pasar el ID de la póliza para editar
                  >
                    Editar
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    className="text-red-500 px-2 py-1 rounded"
                    onClick={() => handleDelete(policy.id)}
                  >
                    <MdDeleteForever size={25} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    ) : (
      <p>No hay polizas disponibles</p>
    )}
  </div>
);
};


export default PolicyList;
