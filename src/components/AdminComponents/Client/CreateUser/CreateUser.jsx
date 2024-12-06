import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ closeModal }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/usuario/nuevoUsuario",
        data
      );
      console.log("Usuario creado:", response.data);
      toast.success("Usuario creado con éxito");
      if (closeModal) {
        closeModal();
      } else {
        navigate("/admin-dashboard/clients");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error("Error al crear el usuario");
      } else {
        toast.error("Error al crear el usuario");
      }
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>
        {/* <div className="max h-96 overflow-y-auto"> */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.nombre && (
            <p className="text-red-600">{errors.nombre.message}</p>
          )}

          <input
            type="text"
            placeholder="Apellido"
            {...register("apellido", {
              required: "El apellido es obligatorio",
              minLength: {
                value: 3,
                message: "El apellido debe tener al menos 3 caracteres",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.apellido && (
            <p className="text-red-600">{errors.apellido.message}</p>
          )}

          <input
            type="text"
            placeholder="DNI"
            {...register("dni", {
              required: "El DNI es obligatorio",
              pattern: {
                value: /^\d{7,8}$/,
                message: "El DNI debe tener entre 7 y 8 dígitos",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.dni && <p className="text-red-600">{errors.dni.message}</p>}

          <input
            type="text"
            placeholder="Teléfono"
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^\d{8,15}$/,
                message: "El teléfono debe tener entre 8 y 15 dígitos",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.telefono && (
            <p className="text-red-600">{errors.telefono.message}</p>
          )}

          <input
            type="text"
            placeholder="Dirección"
            {...register("direccion", {
              required: "La dirección es obligatoria",
              minLength: {
                value: 5,
                message: "La dirección debe tener al menos 5 caracteres",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.direccion && (
            <p className="text-red-600">{errors.direccion.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "El email debe contener un '@' válido",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            className="rounded border border-gray-300 text-lg w-full p-3"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 w-full py-3 rounded text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Crear cuenta
          </button>
        </form>
        {/* </div> */}

        <button
          onClick={closeModal}
          className="mt-4 w-full py-3 text-red-500 hover:text-white border border-red-500 hover:bg-red-500 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

CreateUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreateUser;
