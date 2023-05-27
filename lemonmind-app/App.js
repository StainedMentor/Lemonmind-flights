import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import Calendar from './components/Calendar';
import FileInput from './components/FileInput';


export default function App() {
  const [flight, setFlight] = useState( {from:"",to:"", planeType:"A380",date:"", limit:35})
  const [cargo, setCargo] = useState([]);
  function addCargo() {
    let newCargo = {name:"", weight:"", danger:"off"}
    setCargo([...cargo, newCargo])
  }
  function removeCargo(index) {
    var array = [...cargo];
      array.splice(index, 1);
      setCargo(array );
    
  }
function changeCargo(index, e){
  let array = [...cargo];
  array[index][e.target.name] = e.target.value;
  setCargo(array);
}
function submit(){
  console.log(flight);
console.log(cargo);
}


  const changePlane = (e) => {
    flight[e.target.name] = e.target.value;
    if (flight.planeType == "A380") flight.limit = 35
    else flight.limit = 38
    console.log(flight.limit);
  }
  return (
    <View style={styles.container}>
      <div className="App-form">
        <h2>Flight</h2>
        <form className="App-form">
          <label className="Form-element" htmlFor="from">Origin:</label>
          <input className="Form-spacer" type="text" id="from" name="from" required onChange={(e) => changePlane(e)}/>

          <label className="Form-element" htmlFor="to">Destination:</label>
          <input className="Form-spacer" type="text" id="to" name="to" required onChange={(e) => changePlane(e)}/>
          <div className="Form-element Form-spacer">
            <label htmlFor="planeType">Plane type:</label>
            <select id="planeType" name="planeType" onChange={(e) => changePlane(e)}>
              <option value="A380">Airbus A380</option>
              <option value="B747">Boeing 747</option>
            </select>

          </div>
          <Calendar onChange={changePlane}/>

          <FileInput />
          <div id="cargoSpace">
            {cargo.map((input, index) => {

              return (
                <div className="Cargo-container" key={index}>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" onChange={e => changeCargo(index, e)} required />
                  <label htmlFor="weight">Weight:</label>
                  <input min="0" max={flight.limit} type="number" id="weight" name="weight" onChange={e => changeCargo(index, e)} required />
                  <div>
                    <input type="checkbox" id="danger" name="danger" onChange={e => changeCargo(index, e)} />
                    <label htmlFor="danger"> Dangerous cargo</label>
                  </div>
                  <button type="button" id="removeCargo" onClick={() => removeCargo(index)}>Remove</button>
                </div>
              )
            })}
          

            <button type="button" id="moreCargo" onClick={() => addCargo()}>Add cargo</button>

          </div>
          <input type="submit" value="Submit" onClick={submit}/>
                       <button type="button" onClick={() => submit()}>submit</button>

        </form>

      </div>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
