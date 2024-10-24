import { useState } from 'react';

import Variable from '../Variable/Variable';
import './Temperatures.css';

function Temperatures() {

    // const [celsius, setCelsius] = useState(25.00);
    // const [fahrenheit, setFahrenheit] = useState(77);
    // const [kelvin, setKelvin] = useState(298.15);

    const [celsius, setCelsius] = useState(25.00);
    const [fahrenheit, setFahrenheit] = useState((25.00 * 9/5) + 32);
    const [kelvin, setKelvin] = useState(25.00 + 273.15);


     // ฟังก์ชันแปลง Celsius -> Fahrenheit และ Kelvin
     const updateFromCelsius = (value) => {
        const celsiusValue = parseFloat(value);
        setCelsius(celsiusValue);
        setFahrenheit((celsiusValue * 9/5) + 32);
        setKelvin(celsiusValue + 273.15);
    };

    // ฟังก์ชันแปลง Fahrenheit -> Celsius และ Kelvin
    const updateFromFahrenheit = (value) => {
        const fahrenheitValue = parseFloat(value);
        const celsiusValue = (fahrenheitValue - 32) * 5/9;
        setFahrenheit(fahrenheitValue);
        setCelsius(celsiusValue);
        setKelvin(celsiusValue + 273.15);
    };

    // ฟังก์ชันแปลง Kelvin -> Celsius และ Fahrenheit
    const updateFromKelvin = (value) => {
        const kelvinValue = parseFloat(value);
        const celsiusValue = kelvinValue - 273.15;
        setKelvin(kelvinValue);
        setCelsius(celsiusValue);
        setFahrenheit((celsiusValue * 9/5) + 32);
    };



    return ( 
        <div className='tem-contrainer'>
            <h3 className='title'>Temperatures</h3>
            <h3 className='tem-display'>
                <span className='badge bg-primary'>{celsius} C</span>
                <span className='badge bg-primary'>{fahrenheit} F</span> 
                <span className='badge bg-primary'>{kelvin} K</span>
            </h3>

            <div className='tem-vari'>
                <Variable name={'Celsius'} value={celsius} setValue={updateFromCelsius} />
                <Variable name={'Fahrenheit'} value={fahrenheit} setValue={updateFromFahrenheit} />
                <Variable name={'Kelvin'} value={kelvin} setValue={updateFromKelvin} />
            
            {/* <div className='tem-vari'>
                <Variable name={'Celsius'} value={celsius} setValue={setCelsius} />
                <Variable name={'Fahrenheit'} value={fahrenheit} setValue={setFahrenheit} />
                <Variable name={'Kelvin'} value={kelvin} setValue={setKelvin} /> */}
            </div>

        </div>
     );
}

export default Temperatures;
