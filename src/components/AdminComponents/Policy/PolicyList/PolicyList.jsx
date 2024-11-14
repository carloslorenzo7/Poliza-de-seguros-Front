import axios from "axios"
import { useEffect,useState } from "react"




const PolicyList = () =>{
    const[policies, setPolicies] = useState([])
    const[loading, setLoading]= useState(true)

    useEffect (()=> {
        const axiosPolicies= async() =>{
           try {
            const response= await axios.get("http://localhost:8080/usuario/todos")
            console.log(response.data);
            setPolicies(response.data)
            setLoading(false)

           } catch (error) {
            console.error('Error al obtener las pólizas:', error);
            setLoading(false);
           }
        }
        axiosPolicies();
    },[])

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl">Listado de Polizas</h2>
            {policies.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-500">
                    <th className="border p-2">Id Poliza</th>
                    <th className="border p-2">Id Usuario</th>
                    <th className="border p-2">Nombre de Usuario</th>
                    <th className="border p-2">Numero de Poliza</th>
                    <th className="border p-2">Fecha de inicio</th>
                    <th className="border p-2">Fecha de vencimiento</th>
                    <th className="border p-2">Monto Asegurado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policies.map((user)=>(
                            user.polizas.map((policy)=>(

                            <tr key={policy.id}>
                            <td className="border p-2">{policy.id}</td>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.nombre} {user.apellido}</td>

                            <td className="border p-2">{policy.numeroDePoliza}</td>
                            <td className="border p-2">{policy.fechaDeInicio}</td>
                            <td className="border p-2">{policy.fechaDeVencimiento}</td>
                            <td className="border p-2">{policy.montoAsegurado}</td>
                            </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            ):(
                <p>No hay polizas disponibles</p>
            )}

        </div>
    )
}


export default PolicyList