import { useState } from 'react';

import './Counter.css';

function Counter(props) {

    const [value, setValue] = useState(props.value ||0)

    // let value = props.value

    return ( 
        <div className='cou-container'>

            <h3 >{props.name || 'COUNTER'}</h3>

            <button className='btn btn-danger' 
            onClick={function decrement() {setValue(value - 1)  
            console.log(value)}}>-</button>

            <span className='value'>{value}</span>

            <button className='btn btn-success' 
            onClick={function decrement() {setValue(value + 1)
            console.log(value)
            }}>+</button>

        </div>
     );
}

export default Counter;