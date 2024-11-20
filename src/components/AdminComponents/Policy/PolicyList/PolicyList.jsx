
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import EditPolicyForm from "../EditPolicy/EditPolicy";
import PolicyForm from "../PolicyForm/PolicyForm"
import Modal from "../../../Modal/Modal";
import { Link } from "react-router-dom";


const PolicyList = () => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const axiosUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/usuario/todos");
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      }
    };
    axiosUsers();
  }, []);

  const handleDelete = async (id) => {
   
      try {
        await axios.delete(`http://localhost:8080/api/polizas/${id}`);
        setUsers((prevUsers) =>
          prevUsers.map((user) => ({
            ...user,
            polizas: user.polizas.filter((policy) => policy.id !== id),
          }))
        );
        toast.success("Póliza eliminada con éxito");
        console.log("Póliza eliminada exitosamente");
      } catch (error) {
        console.error(error.message);
        toast.error("Error al eliminar póliza");
      }
    
  };

  const handleEdit = (id) => {
    setSelectedPolicyId(id);
  };

  const handleAssignPolicy = (id) => {
    setSelectedUserId(id);
  };

  const handleCloseEdit = () => {
    setSelectedPolicyId(null);
    setSelectedUserId(null);
  };

  
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-full p-6">
     
      <h2 className="text-2xl font-semibold mb-6 text-center">Polizas</h2>

      <Modal show={!!selectedPolicyId || !!selectedUserId} onClose={handleCloseEdit}>
        {selectedPolicyId && (
          <EditPolicyForm policyId={selectedPolicyId} onCancel={handleCloseEdit} />
        )}
        {selectedUserId && (
          <PolicyForm userId={selectedUserId} onCancel={handleCloseEdit} />
        )}
      </Modal>
      {users.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
              <th className="border p-2">Id de Usuario</th>
              <th className="border p-2">Id de Poliza</th>
              <th className="border p-2">Nombre de Usuario</th>
              <th className="border p-2">Número de Póliza</th>
              <th className="border p-2">Fecha de Inicio</th>
              <th className="border p-2">Fecha de Vencimiento</th>
              <th className="border p-2">Monto Asegurado</th>
              <th className="border p-2">Editar</th>
              <th className="border p-2">Eliminar</th>
              <th className="border p-2">Asignar Póliza</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md font-normal">
            {users.map((user) =>
              user.polizas.length > 0 ? (
                user.polizas.map((policy) => (
                  <tr key={policy.id}>
                    <td className="border p-2">{user.id}</td>
                    <td className="border p-2">{policy.id}</td>
                      <td className="border p-2">
                    <Link to={`/admin-dashboard-detail/${user.id}`}>
                        {user.nombre} {user.apellido}
                    </Link>
                      </td>
                    <td className="border p-2">{policy.numeroDePoliza}</td>
                    <td className="border p-2">{policy.fechaDeInicio}</td>
                    <td className="border p-2">{policy.fechaDeVencimiento}</td>
                    <td className="border p-2">{policy.montoAsegurado}</td>
                    <td className="border p-2">
                      <button
                        className="text-blue-500 px-2 py-2 rounded "
                        onClick={() => handleEdit(policy.id)}
                      >
                        <MdEdit size={25} />
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
              ) : (
                <tr key={user.id}>
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">
                    {user.nombre} {user.apellido}
                  </td>
                  <td className="border p-2" colSpan="6">
                    No tiene pólizas
                  </td>
                  <td className="border p-2">
                  <button className="text-green-500 px-2 py-2 rounded"
                  onClick={()=> handleAssignPolicy(user.id)}
                  >

                      Asignar Póliza
                  </button>
                    
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios disponibles</p>
      )}
    </div>
  );
};

export default PolicyList;
