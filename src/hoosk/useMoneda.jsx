import React, { Fragment, useState } from 'react'; 
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 3rem;
    margin-top: 2rem;
    display: block;
`;
 const Select = styled.select`
    width:100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border:none;
    font-size: 1.2rem;
 `;

const useMoneda = (label,stateInicial, MONEDAS) => {

     // State de nuestro custom hoosk
    const [state,actualizarState] = useState(stateInicial);

    // Esta es la funcion que se va a imprimir en pantalla
    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e =>actualizarState(e.target.value)}
                value={state}
            >  
            <option value = "">-Seleccione-</option>
            {MONEDAS.map(opcion => (
                <option key = {opcion.codigo} value = {opcion.codigo}>{opcion.nombre}</option> 
            ))}
            </Select>
        </Fragment>
    );
    // Retornar state, Interfaz 'Seleccionar' y la funcion que modifica el state
    return [state,Seleccionar, actualizarState];
}
 
export default useMoneda;