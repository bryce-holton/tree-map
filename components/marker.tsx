import { Marker, Popup, Tooltip } from 'react-leaflet';
import { Record, Fields } from '../shared/types';
import * as L from 'leaflet';
import Image from 'next/image';

const PopupHeader = (fields: Fields) => {
  return (
    <>
      <h1>{fields['Common Name']}</h1>
      <p style={{ marginTop: '0px !important' }}>
        <b>
          <i>
            {fields.Genus} {fields.Species} 
          </i>
          {fields['Infraspecific Type 1']} 
          <i>{fields['Infraspecific Name 1']} </i>
          {fields.Cultivar}
        </b>
      </p>
    </>
  );
};

const PopupTable = (fields: Fields) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <b>Family:</b>
          </td>
          <td>{fields.Family}</td>
        </tr>
        <tr>
          <td>
            <b>Origin:</b>
          </td>
          <td>{fields.Origin}</td>
        </tr>
        <tr>
          <td>
            <b>Accession No.:</b>
          </td>
          <td>{fields.Accession}</td>
        </tr>
      </tbody>
    </table>
  );
};

const greenIcon = L.icon({
  iconUrl: '/marker-icon-dark-green.png',
  iconSize: [12, 18],
});

export const MapMarker = ({ fields }: Record) => {
  return (
    <Marker
      position={[fields.Latitude, fields.Longitude]}
      icon={greenIcon}>
      <Popup>
        <PopupHeader {...fields} />
        <hr></hr>
        <PopupTable {...fields} />
        <a
          target='_blank'
          href={fields['Photo 1 URL']}
          rel='noreferrer'>
          {fields['Photo 1 URL'] && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Image
                src={fields['Photo 1 URL']}
                width={200}
                height={200}
                alt={fields['Common Name']}
              />
            </div>
          )}
        </a>
        {fields['Photo 1 URL'] && (
          <p style={{ margin: '0' }}>
            Click image to view full size
          </p>
        )}
      </Popup>
      <Tooltip
        direction='bottom'
        offset={[0, 16]}
        opacity={0.7}>
        {fields.Accession}
      </Tooltip>
    </Marker>
  );
};
