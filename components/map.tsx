import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { map } from 'ramda';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = ({ records }) => {
  return (
    <MapContainer 
      center={[33.39, -111.870890]} 
      zoom={17} 
      scrollWheelZoom={false} 
      style={{height: "100vh", width: "100%"}}
    >
      <TileLayer 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {map(({ id, fields }) => <Marker key={id} position={[fields.Latitude, fields.Longitude]}>
        <Popup>
          <h1>{fields.Species[0]}</h1>
          <a target="_blank" href={fields['Photo 1 URL']}>
            <img src={fields['Photo 1 URL']} width="150" height="150"/>
          </a>
        </Popup>
      </Marker>, records)}
    </MapContainer>
  )
}

export default Map;
