import React from 'react'
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';
import mapMarkerImg from '../images/Local.svg';
import { FiPlus, FiSliders } from 'react-icons/fi';


export default class OrphanagesMap extends React.Component {
    state = {
        index : 0,
        themes : ['light-v10', 'dark-v10', 'satellite-v9', 'streets-v11'],
    }

    handleChangeTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {index} = this.state;
        e.preventDefault();

        if (index > 2) {
            this.setState({
                index : 0
            })
        } else {
            this.setState({
                index : index + 1
            })
        }

    }

    render() {
        const {index, themes} = this.state;
        const current_theme = themes[index];
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
                    zoom={15}
                    style={{ width: '100%', height: '100%' }}
                //Dois parenteses um pra indicar codigo JSX outro pra indicar Objeto
                >
                    { /* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                    <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/${current_theme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                </Map>

                <Link to="" className='create-orphanage'>
                    <FiPlus size={32} color="#fff" />
                </Link>

                <button className='change-theme' onClick={(e) => this.handleChangeTheme(e)}>
                    <FiSliders size={28} color="#fff"></FiSliders>
                </button>
            </div>
        )
    }
}
