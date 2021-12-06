import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { map, isEmpty, filter, contains,  } from 'ramda';
import { MapMarker } from './marker';
import { Record } from '../shared/types';
import { Search } from './search';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

// Specify Airtable fields to pull data from (same as list in pages/map.tsx)
const Map = ({ records }: { records: Record[] }) => {
  const [ searchResults, setSearchResults ] = useState([]);
  const markers = isEmpty(searchResults) ? records : filter(rec => contains(rec.id, searchResults), records);

  return (
    <>
      <Search records={records} setSearchResults={setSearchResults} />
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
        />
        {map((r) => <MapMarker key={r.id} {...r}/>, markers)}
      </MapContainer>
    </>
  )
}

export default Map;
