import React,{useState,useEffect} from "react";
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';
import axios from 'axios';
import Spinner from './Components/Spinnes';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 90%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight:700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
}
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando,guardarCargando] = useState(false);


  useEffect(()=>{
    const cotizarCriptomoneda = async()=>{
      // Evitamos la ejecucion la primera vez
      if(moneda === '')
      return;
      // cosnultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar el spinner
      guardarCargando(true);

      // Ocultar Spinner y mostrar el resultado
      setTimeout(()=>{
        // Cambiar el estado a cargando
        guardarCargando(false);
        // Guardar Cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000);
    }
    cotizarCriptomoneda();
  },[moneda,criptomoneda])

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="Imagen Cripto"
        />      
      </div>
      <div>
        <Heading>COTIZA CRIPTOMONEDAS AL INSTANTE</Heading>
        
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
