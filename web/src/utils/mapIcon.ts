import Leaflet from 'leaflet';

import mapMarkerImg from '../images/Local.svg';

const mapIcon = Leaflet.icon({


    iconUrl: mapMarkerImg,
  
    iconSize: [48, 58],
    iconAnchor: [26, 58],
    popupAnchor: [0, -60]
  })


export default mapIcon;