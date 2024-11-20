import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
//import { useState } from "react";
import { FaUser, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { AiFillSecurityScan } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const PolicyForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // va a observar el cambio en el tipo de seguro
  const tipoDeSeguroSeleccionado = watch("tipoDeSeguro");

  const onSubmit = async (data) => {
    try {
      const datosConvertidos = {
        ...data,
        usuarioId: Number(data.usuarioId),
        montoAsegurado: Number(data.montoAsegurado),
        estado: "ACTIVA",
      };
      const response = await axios.post(
        "http://localhost:8080/api/polizas",
        datosConvertidos
      );
      console.log("Datos enviados:", datosConvertidos);
      console.log("Poliza creada correctamente", response.data);
      toast.success("Póliza creada con éxito");
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error("Póliza eliminada con éxito");
      console.error("Error al crear la póliza:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray p-8 shadow-md rounded-lg bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="absolute top-16 left-20  flex items-center gap-2 text-blue-700 font-semibold hover:text-white hover:bg-blue-500 px-3 py-2 rounded-md transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <IoArrowBackSharp size={25} />
      </button>

      <h2 className="text-2xl text-center mt-2 mb-4 font-semibold">
        Crear Poliza
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo de usuarioId */}
        <div>
          <label
            htmlFor="usuarioId"
            className=" text-gray-700 font-medium mb-2 inline-flex items-center "
          >
            <FaUser className="mr-2" /> Id del Usuario
          </label>
          <input
            type="number"
            id="usuarioId"
            {...register("usuarioId", {
              required: "El id del usuario es obligatorio",
            })}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.usuarioId && (
            <span className="text-red-600">{errors.usuarioId.message}</span>
          )}
        </div>

        {/* campos polizas */}

        <div>
          <label
            htmlFor="numeroDePoliza"
            className=" text-gray-700 font-medium mb-2 inline-flex items-center "
          >
            <MdNumbers className="mr-2" /> Numero de Poliza
          </label>
          <input
            type="text"
            id="numeroDePoliza"
            {...register("numeroDePoliza", {
              required: "El numero de poliza es obligatorio",
            })}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.numeroDePoliza && (
            <span className="text-red-600">{errors.numeroDePoliza.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="fechaDeInicio"
            className=" text-gray-700 font-medium mb-2 inline-flex items-center "
          >
            <FaCalendarAlt className="mr-2" /> Fecha de Inicio
          </label>
          <input
            type="date"
            id="fechaDeInicio"
            {...register("fechaDeInicio", {
              required: "Fecha de inicio Obligatoria",
            })}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.fechaDeInicio && <span className="text-red-600">{errors.fechaDeInicio.message}</span>}
        </div>

        <div>
          <label
            htmlFor="fechaDeVencimiento"
            className=" text-gray-700 font-medium mb-2 inline-flex items-center "
          >
            <FaCalendarAlt className="mr-2" />
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            id="fechaDeVencimiento"
            {...register("fechaDeVencimiento", {
              required: "Fecha de vencimiento Obligatoria",
            })}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.fechaDeVencimiento && (
            <span className="text-red-600">{errors.fechaDeVencimiento.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="montoAsegurado"
            className=" text-gray-700 font-medium mb-2 inline-flex items-center "
          >
            <FaDollarSign className="mr-2" /> Monto Asegurado
          </label>
          <input
            type="number"
            id="montoAsegurado"
            {...register("montoAsegurado", {
              required: "Monto asegurado obligatorio",
            })}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.montoAsegurado && (
            <span className="text-red-600">{errors.montoAsegurado.message}</span>
          )}
        </div>

        {/* Campo de tipo de seguro */}

        <div>
          <label
            htmlFor="tipoDeSeguro"
            className=" text-gray-700 font-medium mb-2 inline-flex items-center "
          >
            <AiFillSecurityScan className="mr-2" /> Tipo de Seguro
          </label>
          <select
            id="tipoDeSeguro"
            {...register("tipoDeSeguro", {
              required: "El tipo de seguro es obligatorio",
            })}
            //onChange={(e) => setTipoDeSeguro(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option
              value=""
              className=" text-gray-700 font-medium mb-2 inline-flex items-center "
            >
              Seleccionar tipo de seguro
            </option>
            <option
              value="SEGURO_AUTO"
              className=" text-gray-700 font-medium mb-2 inline-flex items-center "
            >
              Seguro de Auto
            </option>
            <option
              value="SEGURO_CELULAR"
              className=" text-gray-700 font-medium mb-2 inline-flex items-center "
            >
              Seguro de Celular
            </option>
            <option
              value="SEGURO_INMUEBLE"
              className=" text-gray-700 font-medium mb-2 inline-flex items-center "
            >
              Seguro de inmueble
            </option>
          </select>
          {errors.tipoDeSeguro && <span className="text-red-600">{errors.tipoDeSeguro.message}</span>}
        </div>

        {/*condicionales dependiendo del tipo de seguro */}
        {tipoDeSeguroSeleccionado === "SEGURO_AUTO" && (
          <>
            <div>
              <label
                htmlFor="descripcionAuto"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Descripcion del Auto
              </label>
              <input
                type="text"
                id="descripcionAuto"
                {...register("descripcionAuto", {
                  required: "Descripcion del auto obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.descripcionAuto && (
                <span className="text-red-600">{errors.descripcionAuto.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="marcaAuto"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Marca del Auto
              </label>
              <input
                type="text"
                id="marcaAuto"
                {...register("marcaAuto", {
                  required: "Marca del auto obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.marcaAuto && <span className="text-red-600">{errors.marcaAuto.message}</span>}
            </div>

            <div>
              <label
                htmlFor="modeloAuto"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Modelo del Auto
              </label>
              <input
                type="text"
                id="modeloAuto"
                {...register("modeloAuto", {
                  required: "Modelo del auto obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.modeloAuto && <span className="text-red-600">{errors.modeloAuto.message}</span>}
            </div>

            <div>
              <label
                htmlFor="patenteAuto"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Patente del Auto
              </label>
              <input
                type="text"
                id="patenteAuto"
                {...register("patenteAuto", {
                  required: "Patente del auto obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.patenteAuto && <span className="text-red-600">{errors.patenteAuto.message}</span>}
            </div>
          </>
        )}

        {tipoDeSeguroSeleccionado === "SEGURO_CELULAR" && (
          <>
            <div>
              <label
                htmlFor="descripcionCelular"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Descripcion del Celular
              </label>
              <input
                type="text"
                id="descripcionCelular"
                {...register("descripcionCelular", {
                  required: "Descripcion del celular obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.descripcionCelular && (
                <span className="text-red-600">{errors.descripcionCelular.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="marcaCelular"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Marca del Celular
              </label>
              <input
                type="text"
                id="marcaCelular"
                {...register("marcaCelular", {
                  required: "Descripcion del celular obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.marcaCelular && (
                <span className="text-red-600">{errors.marcaCelular.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="modeloCelular"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Modelo del Celular
              </label>
              <input
                type="text"
                id="modeloCelular"
                {...register("modeloCelular", {
                  required: "Modelo del celular obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.modeloCelular && (
                <span className="text-red-600">{errors.modeloCelular.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="numeroDeSerieCelular"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Numero de serie del celular
              </label>
              <input
                type="text"
                id="numeroDeSerieCelular"
                {...register("numeroDeSerieCelular", {
                  required: "Numero de serie del obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.numeroDeSerieCelular && (
                <span className="text-red-600">{errors.numeroDeSerieCelular.message}</span>
              )}
            </div>
          </>
        )}

        {tipoDeSeguroSeleccionado === "SEGURO_INMUEBLE" && (
          <>
            <div>
              <label
                htmlFor="descripcionInmueble"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Descripcion del Inmueble
              </label>
              <input
                type="text"
                id="descripcionInmueble"
                {...register("descripcionInmueble", {
                  required: "Descripcion del inmueble obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.descripcionInmueble && (
                <span className="text-red-600">{errors.descripcionInmueble.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="direccionInmueble"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Direccion del Inmueble
              </label>
              <input
                type="text"
                id="direccionInmueble"
                {...register("direccionInmueble", {
                  required: "Direccion del inmueble obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.direccionInmueble && (
                <span className="text-red-600">{errors.direccionInmueble.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="tipoDeConstruccionInmueble"
                className=" text-gray-700 font-medium mb-2 inline-flex items-center "
              >
                Tipo de construccion del inmueble
              </label>
              <input
                type="text"
                id="tipoDeConstruccionInmueble"
                {...register("tipoDeConstruccionInmueble", {
                  required: "Tipo de contruccion del inmueble obligatoria",
                })}
                className="appearance-none block w-full px-3 py-2 border text-gray-900 border-gray-300 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.tipoDeConstruccionInmueble && (
                <span className="text-red-600">{errors.tipoDeConstruccionInmueble.message}</span>
              )}
            </div>
          </>
        )}

        <div className="flex justify-center items-center">
          <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
            Crear Póliza
          </button>
        </div>
      </form>
    </div>
  );
};

export default PolicyForm;
