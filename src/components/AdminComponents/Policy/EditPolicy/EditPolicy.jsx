import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaTimes } from 'react-icons/fa'

const EditPolicyForm = ({ policyId, onCancel }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [tipoDeSeguro, setTipoDeSeguro] = useState("");

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/polizas/${policyId}`
        );
        const policyData = response.data;
        console.log("PolicyData:", policyData);

        if (policyData.tipoDeSeguro) {
          const seguroData = policyData.tipoDeSeguro;

          if (seguroData.patente) {
            setTipoDeSeguro("SEGURO_AUTO");
            setValue("descripcionAuto", seguroData.descripcion);
            setValue("marcaAuto", seguroData.marca);
            setValue("modeloAuto", seguroData.modelo);
            setValue("patenteAuto", seguroData.patente);
          } else if (seguroData.numeroDeSerie) {
            setTipoDeSeguro("SEGURO_CELULAR");
            setValue("descripcionCelular", seguroData.descripcion);
            setValue("marcaCelular", seguroData.marca);
            setValue("modeloCelular", seguroData.modelo);
            setValue("numeroDeSerieCelular", seguroData.numeroDeSerie);
          } else if (seguroData.direccion) {
            setTipoDeSeguro("SEGURO_INMUEBLE");
            setValue("descripcionInmueble", seguroData.descripcion);
            setValue("direccionInmueble", seguroData.direccion);
            setValue(
              "tipoDeConstruccionInmueble",
              seguroData.tipoDeConstruccion
            );
          }
        } else {
          setTipoDeSeguro("");
        }

        // Establece valores generales de la póliza
        Object.keys(policyData).forEach((key) => {
          if (key !== "tipoDeSeguro") setValue(key, policyData[key]);
        });

        console.log("SeguroData:", policyData.tipoDeSeguro);
      } catch (error) {
        console.error("Error al obtener la póliza:", error);
      }
    };

    fetchPolicy();
  }, [policyId, setValue]);

  const onSubmit = async (data) => {
    try {
      const tipoSeguroData = {};

      if (tipoDeSeguro === "SEGURO_AUTO") {
        tipoSeguroData.descripcionAuto = data.descripcionAuto;
        tipoSeguroData.marcaAuto = data.marcaAuto;
        tipoSeguroData.modeloAuto = data.modeloAuto;
        tipoSeguroData.patenteAuto = data.patenteAuto;
      } else if (tipoDeSeguro === "SEGURO_CELULAR") {
        tipoSeguroData.descripcionCelular = data.descripcionCelular;
        tipoSeguroData.marcaCelular = data.marcaCelular;
        tipoSeguroData.modeloCelular = data.modeloCelular;
        tipoSeguroData.numeroDeSerieCelular = data.numeroDeSerieCelular;
      } else if (tipoDeSeguro === "SEGURO_INMUEBLE") {
        tipoSeguroData.descripcionInmueble = data.descripcionInmueble;
        tipoSeguroData.direccionInmueble = data.direccionInmueble;
        tipoSeguroData.tipoDeConstruccionInmueble =
          data.tipoDeConstruccionInmueble;
      }

      const putData = {
        id: data.id,
        numeroDePoliza: data.numeroDePoliza,
        fechaDeInicio: data.fechaDeInicio,
        fechaDeVencimiento: data.fechaDeVencimiento,
        montoAsegurado: data.montoAsegurado,
        estado: data.estado,
        tipoDeSeguro: tipoDeSeguro,
        ...tipoSeguroData,
      };

      await axios.put(`http://localhost:8080/api/polizas/${policyId}`, putData);
      toast.success("Póliza actualizada exitosamente");
      console.log("Póliza actualizada");

      onCancel();
    } catch (error) {
      toast.error("Error al actualizar la póliza");
      console.error("Error al actualizar la póliza:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            ID
          </label>
          <input
            type="text"
            {...register("id")}
            readOnly
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            Número de Póliza
          </label>
          <input
            type="text"
            {...register("numeroDePoliza")}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            Fecha de Inicio
          </label>
          <input
            type="date"
            {...register("fechaDeInicio")}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            {...register("fechaDeVencimiento")}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            Monto Asegurado
          </label>
          <input
            type="number"
            {...register("montoAsegurado")}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            Estado
          </label>
          <input
            type="text"
            {...register("estado")}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
            Tipo de Seguro
          </label>
          <input
            type="text"
            value={tipoDeSeguro}
            readOnly
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {tipoDeSeguro === "SEGURO_AUTO" && (
          <>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Descripción del Auto
              </label>
              <input
                type="text"
                {...register("descripcionAuto")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Marca del Auto
              </label>
              <input
                type="text"
                {...register("marcaAuto")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Modelo del Auto
              </label>
              <input
                type="text"
                {...register("modeloAuto")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Patente del Auto
              </label>
              <input
                type="text"
                {...register("patenteAuto")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </>
        )}

        {tipoDeSeguro === "SEGURO_CELULAR" && (
          <>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Descripción del Celular
              </label>
              <input
                type="text"
                {...register("descripcionCelular")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Marca del Celular
              </label>
              <input
                type="text"
                {...register("marcaCelular")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Modelo del Celular
              </label>
              <input
                type="text"
                {...register("modeloCelular")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Número de Serie del Celular
              </label>
              <input
                type="text"
                {...register("numeroDeSerieCelular")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </>
        )}

        {tipoDeSeguro === "SEGURO_INMUEBLE" && (
          <>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Descripción del Inmueble
              </label>
              <input
                type="text"
                {...register("descripcionInmueble")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Dirección del Inmueble
              </label>
              <input
                type="text"
                {...register("direccionInmueble")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className=" text-gray-700 font-medium mb-2 inline-flex items-center ">
                Tipo de Construcción del Inmueble
              </label>
              <input
                type="text"
                {...register("tipoDeConstruccionInmueble")}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </>
        )}

        <div className="flex justify-center space-x-4 mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <FaCheck className="mr-2" />
            Guardar{" "}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
          >
            <FaTimes className="mr-2" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

// Validación de props
EditPolicyForm.propTypes = {
  policyId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditPolicyForm;
