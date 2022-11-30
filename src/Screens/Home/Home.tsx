import React, {useState} from 'react';
import './Home.css';
import CustomLabel from '../../Components/CustomLabel/CustomLabel';

function App() {
    
    const [count, setCount ] = useState<number>(0)

    return (
    <>
      <CustomLabel info={`Count = ${count}`} />
      <button onClick={()=>{ setCount(count + 1)}}> add </button>
    </>
  );
}

export default App;