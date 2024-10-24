import { useEffect, useState } from 'react';
import Variable from '../Variable/Variable';

import './Add.css';

function Add({aValue, bValue}) {

    const [a, setA] = useState(aValue || 0)
    const [b, setB] = useState(bValue || 0)

    useEffect(() => {
        setA(aValue || 0)
        setB(bValue || 0)
    } , [aValue, bValue])

    // only change
    useEffect(() => {
 
    })

    // only first load
    useEffect(() => {
 
    } , [])

    return ( 
        <div className='add-con'>
            <h3 className='title'>ADD</h3>
            <h2 className='add-display'>
                <span className='badge bg-secondary'>A = {a}</span> 
                <span className='badge bg-primary'>A + B = {a+b}</span> 
                <span className='badge bg-secondary'>B = {b}</span>
            </h2>
            <div className='add-vari'>
                <Variable type={'int'} name={'A'} value={a} setValue={setA} />
                <Variable type={'int'} name={'B'} value={b} setValue={setB} />
            </div>
        </div>
    );
}

export default Add;