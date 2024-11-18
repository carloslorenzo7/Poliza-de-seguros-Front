import axios from "axios";
import { useForm } from "react-hook-form";
//import { useState } from "react";

const PolicyForm = () => {
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
            estado: "ACTIVA"
          };
      const response = await axios.post(
        "http://localhost:8080/api/polizas",
        datosConvertidos
        
      );
      console.log('Datos enviados:', datosConvertidos);
      console.log("Poliza creada correctamente", response.data);
    } catch (error) {
      console.error("Error al crear la póliza:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl">Crear Poliza</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo de usuarioId */}
        <div>
          <label htmlFor="usuarioId" className="block">
            Id del Usuario
          </label>
          <input
            type="number"
            id="usuarioId"
            {...register("usuarioId", {
              required: "El id del usuario es obligatorio",
            })}
          />
          {errors.usuarioId && (
            <span className="text-red-600">{errors.usuarioId.message}</span>
          )}
        </div>
        

        {/* campos polizas */}

        <div>
          <label htmlFor="numeroDePoliza" className="block">
            Numero de Poliza
          </label>
          <input
            type="text"
            id="numeroDePoliza"
            {...register("numeroDePoliza", {
              required: "El numero de poliza es obligatorio",
            })}
            className="border p-2 w-full"
          />
          {errors.numeroDePoliza && (
            <span>{errors.numeroDePoliza.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="fechaDeInicio" className="block">
            Fecha de Inicio
          </label>
          <input
            type="date"
            id="fechaDeInicio"
            {...register("fechaDeInicio", {
              required: "Fecha de inicio Obligatoria",
            })}
            className="border p-2 w-full"
          />
          {errors.fechaDeInicio && <span>{errors.fechaDeInicio.message}</span>}
        </div>

        <div>
          <label htmlFor="fechaDeVencimiento" className="block">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            id="fechaDeVencimiento"
            {...register("fechaDeVencimiento", {
              required: "Fecha de vencimiento Obligatoria",
            })}
            className="border p-2 w-full"
          />
          {errors.fechaDeVencimiento && (
            <span>{errors.fechaDeVencimiento.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="montoAsegurado" className="block">
            Monto Asegurado
          </label>
          <input
            type="number"
            id="montoAsegurado"
            {...register("montoAsegurado", {
              required: "Monto asegurado obligatorio",
            })}
            className="border p-2 w-full"
          />
          {errors.montoAsegurado && (
            <span>{errors.montoAsegurado.message}</span>
          )}
        </div>


            {/* Campo de tipo de seguro */}

        <div>
          <label htmlFor="tipoDeSeguro" className="block">
            Tipo de Seguro
          </label>
          <select
            id="tipoDeSeguro"
            {...register("tipoDeSeguro", {
              required: "El tipo de seguro es obligatorio",
            })}
            //onChange={(e) => setTipoDeSeguro(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Seleccionar tipo de seguro</option>
            <option value="SEGURO_AUTO">Seguro de Auto</option>
            <option value="SEGURO_CELULAR">Seguro de Celular</option>
            <option value="SEGURO_INMUEBLE">Seguro de inmueble</option>
          </select>
          {errors.tipoDeSeguro && <span>{errors.tipoDeSeguro.message}</span>}
        </div>


        {/*condicionales dependiendo del tipo de seguro */}
        {tipoDeSeguroSeleccionado === "SEGURO_AUTO" && (
          <>
            <div>
              <label htmlFor="descripcionAuto" className="block">
                Descripcion del Auto
              </label>
              <input
                type="text"
                id="descripcionAuto"
                {...register("descripcionAuto", {
                  required: "Descripcion del auto obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.descripcionAuto && (
                <span>{errors.descripcionAuto.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="marcaAuto" className="block">
                Marca del Auto
              </label>
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
              <label htmlFor="modeloAuto" className="block">
                Modelo del Auto
              </label>
              <input
                type="text"
                id="modeloAuto"
                {...register("modeloAuto", {
                  required: "Modelo del auto obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.modeloAuto && <span>{errors.modeloAuto.message}</span>}
            </div>

            <div>
              <label htmlFor="patenteAuto" className="block">
                Patente del Auto
              </label>
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
              <label htmlFor="descripcionCelular" className="block">
                Descripcion del Celular
              </label>
              <input
                type="text"
                id="descripcionCelular"
                {...register("descripcionCelular", {
                  required: "Descripcion del celular obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.descripcionCelular && (
                <span>{errors.descripcionCelular.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="marcaCelular" className="block">
                Marca del Celular
              </label>
              <input
                type="text"
                id="marcaCelular"
                {...register("marcaCelular", {
                  required: "Descripcion del celular obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.marcaCelular && (
                <span>{errors.marcaCelular.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="modeloCelular" className="block">
                Modelo del Celular
              </label>
              <input
                type="text"
                id="modeloCelular"
                {...register("modeloCelular", {
                  required: "Modelo del celular obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.modeloCelular && (
                <span>{errors.modeloCelular.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="numeroDeSerieCelular" className="block">
                Numero de serie del celular
              </label>
              <input
                type="text"
                id="numeroDeSerieCelular"
                {...register("numeroDeSerieCelular", {
                  required: "Numero de serie del obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.numeroDeSerieCelular && (
                <span>{errors.numeroDeSerieCelular.message}</span>
              )}
            </div>
          </>
        )}

        {tipoDeSeguroSeleccionado === "SEGURO_INMUEBLE" && (
          <>
            <div>
              <label htmlFor="descripcionInmueble" className="block">
                Descripcion del Inmueble
              </label>
              <input
                type="text"
                id="descripcionInmueble"
                {...register("descripcionInmueble", {
                  required: "Descripcion del inmueble obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.descripcionInmueble && (
                <span>{errors.descripcionInmueble.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="direccionInmueble" className="block">
                Direccion del Inmueble
              </label>
              <input
                type="text"
                id="direccionInmueble"
                {...register("direccionInmueble", {
                  required: "Direccion del inmueble obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.direccionInmueble && (
                <span>{errors.direccionInmueble.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="tipoDeConstruccionInmueble" className="block">
                Tipo de construccion del inmueble
              </label>
              <input
                type="text"
                id="tipoDeConstruccionInmueble"
                {...register("tipoDeConstruccionInmueble", {
                  required: "Tipo de contruccion del inmueble obligatoria",
                })}
                className="border p-2 w-full"
              />
              {errors.tipoDeConstruccionInmueble && (
                <span>{errors.tipoDeConstruccionInmueble.message}</span>
              )}
            </div>
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Crear Poliza</button>
      </form>
    </div>
  );
};

export default PolicyForm;
