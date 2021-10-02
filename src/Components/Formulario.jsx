import React,{useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hoosk/useMoneda";
import useCriptomoneda from "../hoosk/useCriptomoneda";
import axios from "axios";
import Error from "./Error";
import PropTypes from 'prop-types';


const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border:none;
    width:100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    // State del listado de criptomonedas
    const [listaCripto,guardarListCriptomonedas] = useState([]);

    const [error,guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'ARS', nombre: 'Peso Argentino'}
    ]

    // Array destructuring, lo que traigo es la posicion de lo que tengo el stateMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda','', MONEDAS);

    // Utilizar useCriptomonedas
    const [criptomoneda,SelectCritomoneda] = useCriptomoneda('Elige tu Criptomoneda','',listaCripto);

    // Ejecuta el llamado a la Api
    useEffect(()=>{
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarListCriptomonedas(resultado.data.Data);
        } 
        consultarAPI();
    },[]);
    // Cuando el usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();
    // Validar si ambos campos estan llenos
    if (moneda === '' || criptomoneda === ''){
        guardarError(true);
        return;
    // pasar los datos al componente principal
    }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (
        <form       
            onSubmit = {cotizarMoneda}
        >
            {error ? <Error mensaje = 'Todos los Campos son obligatorios'/> : null}
      
            <SelectMonedas/>
            <SelectCritomoneda/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
Formulario.prototype = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
} 
export default Formulario;