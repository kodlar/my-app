import logo from './logo.svg';
import './App.css';
import PropTypes from "prop-types"
import pokemon from "./pokemon.json"
import React from "react";
const PokemonRow = ({pokemon , onSelect }) => (
  <tr>
            <td>{pokemon.name.english}</td>
            <td>{pokemon.type.join(', ')}</td>
            <td>
              <button
                onClick={() => onSelect(pokemon)}>Select!</button>
            </td>
          </tr> 
)
PokemonRow.propTypes = {
  pokemon : PropTypes.shape({
    name : PropTypes.shape({
      english:PropTypes.string.isRequired,
    }),
    type : PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  onSelect: PropTypes.func,
}

const PokemonInfo = ({ name, base }) => {

 return( 
  <div>
    <h1>{name.english}</h1>
    <table>
    <tbody>
      {
        //get object and return array as key value
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </tbody>
    </table>
  </div>
  )
}

PokemonInfo.propTypes = {
  name : PropTypes.shape({
    english:PropTypes.string.isRequired,
  }),
  base : PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defence: PropTypes.number,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defence": PropTypes.number,
    Speed:PropTypes.number.isRequired,
  }),
}


function App() {
  //bir array döndürüyoruz 
  //burada filter state güncel nesneyi tutuyor
  //setfilterda ise güncelleme fonksiyonunu göreceğiz.
  const [filter, filterSet]  = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  return (

    <div style={{
      margin:"auto",
      width:800,
      paddingTop:"1rem",
    }}>
      <h1 className="title">Pokemon Search</h1>
     
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridColumnGaps: '1rem',
      }}
      >
        <div>
         <input 
        value={filter}
        onChange={(event) => filterSet(event.target.value)}
      />
      <table width="100%">
        <thead>
        <tr>
        <th>Name</th>
        <th>Type</th>
      </tr>
        </thead>
        <tbody>
          {pokemon
          .filter((pokemon) => 
          pokemon.name.english.toLowerCase().includes(filter.toLocaleLowerCase()))
          .slice(0,20).map(pokemon => (
            <PokemonRow pokemon={pokemon} 
                        key={pokemon.id}
                        onSelect={(pokemon) =>  selectedItemSet(pokemon)} 
                         />        
          ))}
      </tbody>
      </table>      
      </div>

      {selectedItem && <PokemonInfo {...selectedItem} />}
   
      </div>
     
    </div>

 
  );
}

export default App;
