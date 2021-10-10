import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { map } from 'ramda';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface Fields {
  Species: string;
  'Photo 1 URL': string;
  Latitude: number;
  Longitude: number;
}
interface Record {
  id: string;
  fields: Fields;
}

const Map = ({ records }: { records:  Record[]}) => {
  return (
    <MapContainer 
      center={[33.39, -111.870890]} 
      zoom={17} 
      scrollWheelZoom={true} 
      style={{height: "100vh", width: "100%"}}
    >
      <TileLayer 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={19}
        maxZoom={20}
      />
      {map(({ id, fields }) => <Marker key={id} position={[fields.Latitude, fields.Longitude]}>
        <Popup>
          <h1>{fields.Species[0]}</h1>
          <a target="_blank" href={fields['Photo 1 URL']} rel="noreferrer">
            <Image src={fields['Photo 1 URL']} width={150} height={150} alt={fields.Species[0]}/>
          </a>
        </Popup>
      </Marker>, records)}
    </MapContainer>
  )
}

export default Map;
