import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const PolicyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axiosPoliza = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuario/${id}`);
        console.log(response.data);
        setCliente(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) axiosPoliza();
  }, [id]);

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error al cargar póliza: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16 border border-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Poliza del Cliente
      </h1>

      {cliente ? (
        <div className="space-y-8">
          {/* Información del Cliente */}
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
              <p className="col-span-2">
                <strong>Dirección:</strong> {cliente.direccion}
              </p>
            </div>
          </div>

          {/* Pólizas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-green-500 pb-2">
              Pólizas
            </h2>
            <div className="space-y-6">
              {cliente.polizas && cliente.polizas.length > 0 ? (
                cliente.polizas.map((poliza, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg bg-green-50 shadow-md"
                  >
                    <p>
                      <strong>Número de Póliza:</strong> {poliza.numeroDePoliza}
                    </p>
                    <p>
                      <strong>Estado:</strong>{" "}
                      <span
                        className={`px-2 py-1 rounded ${
                          poliza.estado === "ACTIVA"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {poliza.estado}
                      </span>
                    </p>
                    <p>
                      <strong>Fecha de Inicio:</strong>{" "}
                      {new Date(poliza.fechaDeInicio).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Fecha de Vencimiento:</strong>{" "}
                      {new Date(poliza.fechaDeVencimiento).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Monto Asegurado:</strong> {poliza.montoAsegurado}
                    </p>

                    {/* Detalles del Seguro */}
                    {poliza.tipoDeSeguro && (
                      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                        <h5 className="font-bold text-gray-700 mb-2">
                          Detalles del Seguro
                        </h5>
                        {poliza.tipoDeSeguro.patente && (
                          <div>
                            <h6 className="font-semibold text-blue-600">
                              Seguro de Auto
                            </h6>
                            <p>
                              <strong>Descripción:</strong>{" "}
                              {poliza.tipoDeSeguro.descripcion}
                            </p>
                            <p>
                              <strong>Marca:</strong>{" "}
                              {poliza.tipoDeSeguro.marca}
                            </p>
                            <p>
                              <strong>Modelo:</strong>{" "}
                              {poliza.tipoDeSeguro.modelo}
                            </p>
                            <p>
                              <strong>Patente:</strong>{" "}
                              {poliza.tipoDeSeguro.patente}
                            </p>
                          </div>
                        )}
                        {poliza.tipoDeSeguro.numeroDeSerie && (
                          <div>
                            <h6 className="font-semibold text-blue-600">
                              Seguro de Celular
                            </h6>
                            <p>
                              <strong>Descripción:</strong>{" "}
                              {poliza.tipoDeSeguro.descripcion}
                            </p>
                            <p>
                              <strong>Marca:</strong>{" "}
                              {poliza.tipoDeSeguro.marca}
                            </p>
                            <p>
                              <strong>Modelo:</strong>{" "}
                              {poliza.tipoDeSeguro.modelo}
                            </p>
                            <p>
                              <strong>Número de Serie:</strong>{" "}
                              {poliza.tipoDeSeguro.numeroDeSerie}
                            </p>
                          </div>
                        )}
                        {poliza.tipoDeSeguro.tipoDeConstruccion && (
                          <div>
                            <h6 className="font-semibold text-blue-600">
                              Seguro de Inmueble
                            </h6>
                            <p>
                              <strong>Descripción:</strong>{" "}
                              {poliza.tipoDeSeguro.descripcion}
                            </p>
                            <p>
                              <strong>Dirección:</strong>{" "}
                              {poliza.tipoDeSeguro.direccion}
                            </p>
                            <p>
                              <strong>Tipo de Construcción:</strong>{" "}
                              {poliza.tipoDeSeguro.tipoDeConstruccion}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No se encontraron pólizas</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontró información del cliente
        </p>
      )}

      <button
        onClick={() => navigate("/admin-dashboard")}
        className="absolute top-20 left-20 flex items-center gap-2 text-blue-700 font-semibold hover:text-white hover:bg-blue-500 px-3 py-2 rounded-md transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
       <IoArrowBackSharp size={25}/> 
      </button>
    </div>
  );
};

PolicyDetail.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PolicyDetail;
