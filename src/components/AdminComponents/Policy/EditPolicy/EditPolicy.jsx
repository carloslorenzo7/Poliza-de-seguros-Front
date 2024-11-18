
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EditPolicyForm = ({ policyId, onCancel }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [tipoDeSeguro, setTipoDeSeguro] = useState('');

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/polizas/${policyId}`);
                const policyData = response.data;
                console.log("PolicyData:", policyData);

                if (policyData.tipoDeSeguro) {
                    const tipoSeguro = policyData.tipoDeSeguro.tipo || policyData.tipoDeSeguro.descripcion;
                    setTipoDeSeguro(tipoSeguro);

                    Object.keys(policyData.tipoDeSeguro).forEach(key => {
                        setValue(key, policyData.tipoDeSeguro[key]);
                    });
                }

                Object.keys(policyData).forEach(key => {
                    if (key !== 'tipoDeSeguro') setValue(key, policyData[key]);
                });

            } catch (error) {
                console.error('Error al obtener la póliza:', error);
            }
        };

        fetchPolicy();
    }, [policyId, setValue]);

    const onSubmit = async (data) => {
        try {
            const putData = {
                numeroDePoliza: data.numeroDePoliza,
                fechaDeInicio: data.fechaDeInicio,
                fechaDeVencimiento: data.fechaDeVencimiento,
                montoAsegurado: data.montoAsegurado,
                tipoDeSeguro: tipoDeSeguro,
                estado: data.estado,
                descripcionAuto: data.descripcionAuto,
                marcaAuto: data.marcaAuto,
                modeloAuto: data.modeloAuto,
                patenteAuto: data.patenteAuto,
                descripcionCelular: data.descripcionCelular,
                marcaCelular: data.marcaCelular,
                modeloCelular: data.modeloCelular,
                numeroDeSerieCelular: data.numeroDeSerieCelular,
                descripcionInmueble: data.descripcionInmueble,
                direccionInmueble: data.direccionInmueble,
                tipoDeConstruccionInmueble: data.tipoDeConstruccionInmueble
            };

            await axios.put(`http://localhost:8080/api/polizas/${policyId}`, putData);
            console.log('Póliza actualizada');
            onCancel();
        } catch (error) {
            console.error('Error al actualizar la póliza:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>ID</label>
                <input type="text" {...register('id')} readOnly />
            </div>
            <div>
                <label>Número de Póliza</label>
                <input type="text" {...register('numeroDePoliza')} />
            </div>
            <div>
                <label>Fecha de Inicio</label>
                <input type="date" {...register('fechaDeInicio')} />
            </div>
            <div>
                <label>Fecha de Vencimiento</label>
                <input type="date" {...register('fechaDeVencimiento')} />
            </div>
            <div>
                <label>Monto Asegurado</label>
                <input type="number" {...register('montoAsegurado')} />
            </div>
            <div>
                <label>Estado</label>
                <input type="text" {...register('estado')} />
            </div>
            <div>
                <label>Tipo de Seguro</label>
                <input type="text" value={tipoDeSeguro} readOnly />
            </div>

            {tipoDeSeguro === 'SEGURO_AUTO' && (
                <>
                    <div>
                        <label>Descripción del Auto</label>
                        <input type="text" {...register('descripcionAuto')} />
                    </div>
                    <div>
                        <label>Marca del Auto</label>
                        <input type="text" {...register('marcaAuto')} />
                    </div>
                    <div>
                        <label>Modelo del Auto</label>
                        <input type="text" {...register('modeloAuto')} />
                    </div>
                    <div>
                        <label>Patente del Auto</label>
                        <input type="text" {...register('patenteAuto')} />
                    </div>
                </>
            )}

            {tipoDeSeguro === 'SEGURO_CELULAR' && (
                <>
                    <div>
                        <label>Descripción del Celular</label>
                        <input type="text" {...register('descripcionCelular')} />
                    </div>
                    <div>
                        <label>Marca del Celular</label>
                        <input type="text" {...register('marcaCelular')} />
                    </div>
                    <div>
                        <label>Modelo del Celular</label>
                        <input type="text" {...register('modeloCelular')} />
                    </div>
                    <div>
                        <label>Número de Serie del Celular</label>
                        <input type="text" {...register('numeroDeSerieCelular')} />
                    </div>
                </>
            )}

            {tipoDeSeguro === 'SEGURO_INMUEBLE' && (
                <>
                    <div>
                        <label>Descripción del Inmueble</label>
                        <input type="text" {...register('descripcionInmueble')} />
                    </div>
                    <div>
                        <label>Dirección del Inmueble</label>
                        <input type="text" {...register('direccionInmueble')} />
                    </div>
                    <div>
                        <label>Tipo de Construcción del Inmueble</label>
                        <input type="text" {...register('tipoDeConstruccionInmueble')} />
                    </div>
                </>
            )}

            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

// Validación de props
EditPolicyForm.propTypes = {
    policyId: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditPolicyForm;

