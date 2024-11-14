import { useEffect, useState } from "react";
import axios from "axios";

const ClientDashboard = () => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null)

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const axiosPoliza = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/usuario/${userId}`
        );
        console.log(response.data);
        setCliente(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      axiosPoliza();
    }
  }, [userId]);

  if (loading) return <p>Cargando informacion....</p>;
  if (error) return <p>Error al cargar poliza:{error}</p>;
 
const toggleSection =(section) =>{
setActiveSection(activeSection === section ? null : section)
}

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-500 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-4 text-center">Bienvenido a tu Perfil</h1>
    
    {cliente ? (
      <div>
        {/* Información del Cliente */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("cliente")}
            className="w-full text-left py-3 px-4 focus:outline-none focus:bg-gray-800 hover:bg-gray-700"
          >
            <h2 className="text-lg font-semibold">Información del Cliente</h2>
          </button>
          {activeSection === "cliente" && (
            <div className="px-4 py-2 bg-gray-500">
              <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
              <p><strong>Teléfono:</strong> {cliente.telefono}</p>
              <p><strong>DNI:</strong> {cliente.dni}</p>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Dirección:</strong> {cliente.direccion}</p>
            </div>
          )}
        </div>

        {/* Pólizas */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("polizas")}
            className="w-full text-left py-3 px-4 focus:outline-none focus:bg-gray-800 hover:bg-gray-700"
          >
            <h2 className="text-lg font-semibold">Pólizas</h2>
          </button>
          {activeSection === "polizas" && (
            <div className="px-4 py-2 bg-gray-500 space-y-4">
              {cliente.polizas && cliente.polizas.length > 0 ? (
                cliente.polizas.map((poliza, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-gray-700 shadow">
                    <p><strong>Número de Póliza:</strong> {poliza.numeroDePoliza}</p>
                    <p><strong>Estado:</strong> {poliza.estado}</p>
                    <p><strong>Fecha de Inicio:</strong> {new Date(poliza.fechaDeInicio).toLocaleDateString()}</p>
                    <p><strong>Fecha de Vencimiento:</strong> {new Date(poliza.fechaDeVencimiento).toLocaleDateString()}</p>
                    <p><strong>Monto Asegurado:</strong> {poliza.montoAsegurado}</p>

                    {/* Detalles del Seguro */}
                    {poliza.tipoDeSeguro && (
                      <div className="mt-3">
                        <h5 className="font-bold">Detalles del Seguro</h5>
                        {poliza.tipoDeSeguro.patente && (
                          <div>
                            <h6 className="font-semibold">Seguro de Auto</h6>
                            <p><strong>Descripción:</strong> {poliza.tipoDeSeguro.descripcion}</p>
                            <p><strong>Marca:</strong> {poliza.tipoDeSeguro.marca}</p>
                            <p><strong>Modelo:</strong> {poliza.tipoDeSeguro.modelo}</p>
                            <p><strong>Patente:</strong> {poliza.tipoDeSeguro.patente}</p>
                          </div>
                        )}
                        {poliza.tipoDeSeguro.numeroDeSerie && (
                          <div>
                            <h6 className="font-semibold">Seguro de Celular</h6>
                            <p><strong>Descripción:</strong> {poliza.tipoDeSeguro.descripcion}</p>
                            <p><strong>Marca:</strong> {poliza.tipoDeSeguro.marca}</p>
                            <p><strong>Modelo:</strong> {poliza.tipoDeSeguro.modelo}</p>
                            <p><strong>Número de Serie:</strong> {poliza.tipoDeSeguro.numeroDeSerie}</p>
                          </div>
                        )}
                        {poliza.tipoDeSeguro.tipoDeConstruccion && (
                          <div>
                            <h6 className="font-semibold">Seguro de Inmueble</h6>
                            <p><strong>Descripción:</strong> {poliza.tipoDeSeguro.descripcion}</p>
                            <p><strong>Dirección:</strong> {poliza.tipoDeSeguro.direccion}</p>
                            <p><strong>Tipo de Construcción:</strong> {poliza.tipoDeSeguro.tipoDeConstruccion}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No se encontraron pólizas</p>
              )}
            </div>
          )}
        </div>
      </div>
    ) : (
      <p>No se encontró información del cliente</p>
    )}
  </div>
);
};

export default ClientDashboard;
