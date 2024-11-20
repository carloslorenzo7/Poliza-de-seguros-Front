import  { useState } from 'react';
import PropTypes from 'prop-types'; 

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4">¿Estás seguro de que deseas cerrar sesión?</h2>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    )
  );
};


LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  onConfirm: PropTypes.func.isRequired, 
};

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem('userRole'); 
    window.location.href = '/'; 
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cerrar sesión
      </button>

      <LogoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default LogoutButton;
