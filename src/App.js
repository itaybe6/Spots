import Map from "./components/Map";

const GOOGLE_MAPS_API_KEY=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
function App() {
  return (
    <div className="App">
      <h1>
        React Google map Api
      </h1>
      <Map id={GOOGLE_MAPS_API_KEY} />
      
    </div>
  )
}
export default App;