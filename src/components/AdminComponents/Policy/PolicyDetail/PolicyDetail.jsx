import { useEffect, useState } from "react"

const PolicyDetail= () =>{
    const[policy, setPolicy]= useState(null);
    const [loading,setLoading]=useState(null);

    useEffect(()=>{
        const axiosPolicyDetail = async () =>{
            try {
                const response= await axios.get("")
            } catch (error) {
                
            }
        }
    })
    return(
        <div></div>
    )
}