import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';
import mapMarkerImg from '../images/Local.svg';
import { FiArrowRight, FiPlus} from 'react-icons/fi';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id : number;
    latitude : number;
    longitude : number;
    name : string;
}

export default function OrphanagesMap() {
        const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

        useEffect(() => {
            api.get('orphanages').then(response => {
                setOrphanages(response.data);
            });
        }, []);

        return (
            <div id="page-map">
                <aside>
                    <header>
                        <img src={mapMarkerImg} alt="Happy" />

                        <h2>Escolha um orfanato no mapa</h2>
                        <p>Muitas crianças estão esperando a sua visita :D</p>
                    </header>

                    <footer>
                        <strong>Iguatu</strong>
                        <span>Ceará</span>
                    </footer>
                </aside>

                <Map
                    center={[-6.351498, -39.3020409]}
                    zoom={16}
                    style={{ width: '100%', height: '100%' }}
                //Dois parenteses um pra indicar codigo JSX outro pra indicar Objeto
                >
                    { /* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                    <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                    />

                    {orphanages.map(orphanage => {
                        return (
                            <Marker
                                icon={mapIcon}
                                position={[orphanage.latitude, orphanage.longitude]}
                                key={orphanage.id}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    <span> {orphanage.name} </span>
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#fff" />
                                    </Link>
                                </Popup>
                            </Marker>

                        )
                    })}
                </Map>

                <Link to="/orphanages/create" className='create-orphanage'>
                    <FiPlus size={32} color="#fff" />
                </Link>

                {/* <button className='change-theme' onClick={(e) => this.handleChangeTheme(e)}>
                    <FiSliders size={28} color="#fff"></FiSliders>
                </button> */}
            </div>
        )
    }

