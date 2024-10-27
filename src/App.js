import Map from "./components/Map";
import { mapOptions } from "./components/MapConfiguration";
import { useJsApiLoader } from "@react-google-maps/api";


function App(){
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApikey,
    googleMapsApiKey: mapOptions.googleMapApikey,
  });
  return (
    <div className="App">
      <h1>
        React Google map Api 
      </h1>
      <Map isLoaded={isLoaded}/>
    </div>
  )
}

export default App;