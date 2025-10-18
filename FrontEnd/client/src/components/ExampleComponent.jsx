import { useEffect, useState } from "react"

const ExampleComponent = () => {

    const [count, setCount] = useState(0)
    
    useEffect(()=>{
        document.title = `Contador: ${count}`
    },[count])

    return(
        <>
        <p>Contador: {count}</p>
        <button onClick={()=> setCount(count + 1)}>Incrementar</button>
        
        </>
    )
}

export default ExampleComponent