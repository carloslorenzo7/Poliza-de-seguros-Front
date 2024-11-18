import { useParams } from 'react-router-dom'; // Importa useParams para obtener el `policyId` desde la URL
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const EditPolicyForm = ({ onClose }) => {
  const { id } = useParams(); 
  console.log("id de use params",id);
  
  const [policyData, setPolicyData] = useState(null);
  console.log(policyData);
  

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuarioId: '',
      numeroDePoliza: '',
      fechaDeInicio: '',
      fechaDeVencimiento: '',
      montoAsegurado: '',
      tipoDeSeguro: '',
      descripcionAuto: '',
      marcaAuto: '',
      modeloAuto: '',
      patenteAuto: '',
      descripcionCelular: '',
      marcaCelular: '',
      modeloCelular: '',
      numeroDeSerieCelular: '',
      descripcionInmueble: '',
      direccionInmueble: '',
      tipoDeConstruccionInmueble: '',
    },
  });

  const tipoDeSeguroSeleccionado = watch('tipoDeSeguro');

  useEffect(() => {
    const fetchPolicyData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/polizas/${id}`);
          setPolicyData(response.data);
          console.log(response.data);
          
        } catch (error) {
          console.error('Error al obtener la póliza:', error);
        }
      }
    };
    fetchPolicyData();
  }, [id]);

  // Asigna los datos al formulario una vez que se carguen
  useEffect(() => {
    if (policyData) {
      reset(policyData); // Restablecer los datos del formulario
    }
  }, [policyData, reset]);

  const onSubmit = async (data) => {
    try {
      const datosConvertidos = {
        ...data,
        usuarioId: Number(data.usuarioId),
        montoAsegurado: Number(data.montoAsegurado),
        estado: 'ACTIVA', // Se puede cambiar según lo que desees
      };
      await axios.put(`http://localhost:8080/api/polizas/${id}`, datosConvertidos);
      console.log('Póliza actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la póliza:', error);
    }
  };

  if (!id) {
    return <p>No se ha proporcionado un ID de póliza válido.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl">Editar Póliza</h2>
      {policyData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de ID del usuario */}
          <div>
            <label htmlFor="usuarioId" className="block">Id del Usuario</label>
            <input
              type="number"
              id="usuarioId"
              {...register("usuarioId", {
                required: "El id del usuario es obligatorio",
              })}
              className="border p-2 w-full"
            />
            {errors.usuarioId && <span className="text-red-600">{errors.usuarioId.message}</span>}
          </div>

          {/* Campo de Número de Póliza */}
          <div>
            <label htmlFor="numeroDePoliza" className="block">Número de Póliza</label>
            <input
              type="text"
              id="numeroDePoliza"
              {...register("numeroDePoliza", {
                required: "El número de póliza es obligatorio",
              })}
              className="border p-2 w-full"
            />
            {errors.numeroDePoliza && <span className="text-red-600">{errors.numeroDePoliza.message}</span>}
          </div>

          {/* Campo de Fecha de Inicio */}
          <div>
            <label htmlFor="fechaDeInicio" className="block">Fecha de Inicio</label>
            <input
              type="date"
              id="fechaDeInicio"
              {...register("fechaDeInicio", {
                required: "La fecha de inicio es obligatoria",
              })}
              className="border p-2 w-full"
            />
            {errors.fechaDeInicio && <span className="text-red-600">{errors.fechaDeInicio.message}</span>}
          </div>

          {/* Campo de Fecha de Vencimiento */}
          <div>
            <label htmlFor="fechaDeVencimiento" className="block">Fecha de Vencimiento</label>
            <input
              type="date"
              id="fechaDeVencimiento"
              {...register("fechaDeVencimiento", {
                required: "La fecha de vencimiento es obligatoria",
              })}
              className="border p-2 w-full"
            />
            {errors.fechaDeVencimiento && <span className="text-red-600">{errors.fechaDeVencimiento.message}</span>}
          </div>

          {/* Campo de Monto Asegurado */}
          <div>
            <label htmlFor="montoAsegurado" className="block">Monto Asegurado</label>
            <input
              type="number"
              id="montoAsegurado"
              {...register("montoAsegurado", {
                required: "El monto asegurado es obligatorio",
              })}
              className="border p-2 w-full"
            />
            {errors.montoAsegurado && <span className="text-red-600">{errors.montoAsegurado.message}</span>}
          </div>

          {/* Campo de Tipo de Seguro */}
          <div>
            <label htmlFor="tipoDeSeguro" className="block">Tipo de Seguro</label>
            <select
              id="tipoDeSeguro"
              {...register("tipoDeSeguro", {
                required: "El tipo de seguro es obligatorio",
              })}
              className="border p-2 w-full"
            >
              <option value="">Seleccione el tipo de seguro</option>
              <option value="SEGURO_AUTO">Seguro de Auto</option>
              <option value="SEGURO_CELULAR">Seguro de Celular</option>
              <option value="SEGURO_INMUEBLE">Seguro de Inmueble</option>
            </select>
            {errors.tipoDeSeguro && <span className="text-red-600">{errors.tipoDeSeguro.message}</span>}
          </div>

          {/* Campos Condicionales Según el Tipo de Seguro */}
          {tipoDeSeguroSeleccionado === "SEGURO_AUTO" && (
            <>
              <div>
                <label htmlFor="descripcionAuto" className="block">Descripción del Auto</label>
                <input
                  type="text"
                  id="descripcionAuto"
                  {...register("descripcionAuto", {
                    required: "Descripción del auto obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.descripcionAuto && <span>{errors.descripcionAuto.message}</span>}
              </div>
              <div>
                <label htmlFor="marcaAuto" className="block">Marca del Auto</label>
                <input
                  type="text"
                  id="marcaAuto"
                  {...register("marcaAuto", {
                    required: "Marca del auto obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.marcaAuto && <span>{errors.marcaAuto.message}</span>}
              </div>
              <div>
                <label htmlFor="modeloAuto" className="block">Modelo del Auto</label>
                <input
                  type="text"
                  id="modeloAuto"
                  {...register("modeloAuto", {
                    required: "Modelo del auto obligatorio",
                  })}
                  className="border p-2 w-full"
                />
                {errors.modeloAuto && <span>{errors.modeloAuto.message}</span>}
              </div>
              <div>
                <label htmlFor="patenteAuto" className="block">Patente del Auto</label>
                <input
                  type="text"
                  id="patenteAuto"
                  {...register("patenteAuto", {
                    required: "Patente del auto obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.patenteAuto && <span>{errors.patenteAuto.message}</span>}
              </div>
            </>
          )}

          {tipoDeSeguroSeleccionado === "SEGURO_CELULAR" && (
            <>
              <div>
                <label htmlFor="descripcionCelular" className="block">Descripción del Celular</label>
                <input
                  type="text"
                  id="descripcionCelular"
                  {...register("descripcionCelular", {
                    required: "Descripción del celular obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.descripcionCelular && <span>{errors.descripcionCelular.message}</span>}
              </div>
              <div>
                <label htmlFor="marcaCelular" className="block">Marca del Celular</label>
                <input
                  type="text"
                  id="marcaCelular"
                  {...register("marcaCelular", {
                    required: "Marca del celular obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.marcaCelular && <span>{errors.marcaCelular.message}</span>}
              </div>
              <div>
                <label htmlFor="modeloCelular" className="block">Modelo del Celular</label>
                <input
                  type="text"
                  id="modeloCelular"
                  {...register("modeloCelular", {
                    required: "Modelo del celular obligatorio",
                  })}
                  className="border p-2 w-full"
                />
                {errors.modeloCelular && <span>{errors.modeloCelular.message}</span>}
              </div>
              <div>
                <label htmlFor="numeroDeSerieCelular" className="block">Número de Serie del Celular</label>
                <input
                  type="text"
                  id="numeroDeSerieCelular"
                  {...register("numeroDeSerieCelular", {
                    required: "Número de serie del celular obligatorio",
                  })}
                  className="border p-2 w-full"
                />
                {errors.numeroDeSerieCelular && <span>{errors.numeroDeSerieCelular.message}</span>}
              </div>
            </>
          )}

          {tipoDeSeguroSeleccionado === "SEGURO_INMUEBLE" && (
            <>
              <div>
                <label htmlFor="descripcionInmueble" className="block">Descripción del Inmueble</label>
                <input
                  type="text"
                  id="descripcionInmueble"
                  {...register("descripcionInmueble", {
                    required: "Descripción del inmueble obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.descripcionInmueble && <span>{errors.descripcionInmueble.message}</span>}
              </div>
              <div>
                <label htmlFor="direccionInmueble" className="block">Dirección del Inmueble</label>
                <input
                  type="text"
                  id="direccionInmueble"
                  {...register("direccionInmueble", {
                    required: "Dirección del inmueble obligatoria",
                  })}
                  className="border p-2 w-full"
                />
                {errors.direccionInmueble && <span>{errors.direccionInmueble.message}</span>}
              </div>
              <div>
                <label htmlFor="tipoDeConstruccionInmueble" className="block">Tipo de Construcción</label>
                <input
                  type="text"
                  id="tipoDeConstruccionInmueble"
                  {...register("tipoDeConstruccionInmueble", {
                    required: "Tipo de construcción obligatorio",
                  })}
                  className="border p-2 w-full"
                />
                {errors.tipoDeConstruccionInmueble && <span>{errors.tipoDeConstruccionInmueble.message}</span>}
              </div>
            </>
          )}

          <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Actualizar Póliza</button>
          <button type="button" onClick={onClose} className="bg-red-500 text-white p-2 mt-4 ml-4">Cerrar</button>
        </form>
      ) : (
        <p>Cargando datos de la póliza...</p>
      )}
    </div>
  );
};

EditPolicyForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditPolicyForm;
