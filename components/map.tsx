import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { map } from 'ramda';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

// Specify Airtable fields to pull data from (same as list in pages/map.tsx)
interface Fields {
  Accession: string;
  'Taxon Name': string;
  Genus: string;
  Species: string;
  'Infraspecific Type 1': string;
  'Infraspecific Name 1': string;
  Cultivar: string;
  'Common Name': string;
  Origin: string;
  Family: string;
  Latitude: number;
  Longitude: number;
  'Photo 1 URL': string;
}
interface Record {
  id: string;
  fields: Fields;
}

//set maximum boundaries
// var southWest = L.latLng(33.3864, -111.87494),
    // northEast = L.latLng(33.3941, -111.8630),
    // bounds = L.latLngBounds(southWest, northEast);

const Map = ({ records }: { records: Record[] }) => {
  return (
    <MapContainer
      center={[33.39, -111.870890]}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={19}
        maxZoom={21}
        minZoom={15}
        // maxBounds: bounds,
      />
      {map(({ id, fields }) => <Marker key={id} position={[fields.Latitude, fields.Longitude]}>
        <Popup>
          <h1>{fields['Common Name']}</h1>
          <p><b><i>{fields.Genus} {fields.Species}</i> {fields['Infraspecific Type 1']} <i>{fields['Infraspecific Name 1']}</i> {fields.Cultivar} </b></p>
          <hr></hr>
          <table>
            <tbody>
              <tr>
                <td><b>Family:</b></td><td>{fields.Family}</td></tr>
              <tr>
                <td><b>Origin:</b></td><td>{fields.Origin}</td></tr>
              <tr>
                <td><b>Accession No.:</b></td><td>{fields.Accession}</td></tr></tbody></table>
          <a target="_blank" href={fields['Photo 1 URL']} rel="noreferrer">
           {fields['Photo 1 URL'] && <Image src={fields['Photo 1 URL']} width={200} height={200} alt={fields['Common Name']}/>}
          </a>
          {fields['Photo 1 URL'] && <p style={{margin: '0'}}>Click image to view full size</p>}
        </Popup>
        <Tooltip direction="bottom" offset={[-14, 30]} opacity={0.7}>{fields.Accession}</Tooltip>
      </Marker>, records)}
    </MapContainer>
  )
}

export default Map;
