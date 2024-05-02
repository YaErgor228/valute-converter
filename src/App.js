import React, {useEffect, useState} from 'react';
import './index.css';
import Block from "./components/Block";

function App() {
    const [fromCurrency, setFromCurrency] = useState('RUB')
    const [toCurrency, setToCurrency] = useState('USD')
    
    const [rates, setRates] = useState({});

    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(0);

    const RUB_RATES = 91.01;

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then((res) => res.json())
            .then((json) => {
                setRates(json.rates)
            }).catch((err) => {
            console.log(err, 'ERROR')
        })
    }, [])
    useEffect(() => {
        onChangeFromPrice(fromPrice)
    } , [ fromCurrency, fromPrice, onChangeFromPrice])

    function onChangeFromPrice(value) {
        const price = ( fromCurrency === "RUB" ? Number(value) * rates[toCurrency] : Number(value) / rates[fromCurrency] )
        const result = ( toCurrency === "RUB" ? price * RUB_RATES : price * rates[toCurrency] );
        setToPrice(Number(toCurrency === "RUB" || fromCurrency === "RUB" ? price : result ))
        setFromPrice(value)
    }

    function onChangeToPrice(value) {
       const result = rates[fromCurrency] / rates[toCurrency] * value;
       setFromPrice(Number(result));
       setToPrice(value)
   }

    return (
        <div className="App">
            <Block currency={fromCurrency} onChangeCurrency={setFromCurrency} value={fromPrice} onChangeValue={onChangeFromPrice}/>
            <Block currency={toCurrency} onChangeCurrency={setToCurrency} value={toPrice} onChangeValue={onChangeToPrice}/>
        </div>
    );
}

export default App;