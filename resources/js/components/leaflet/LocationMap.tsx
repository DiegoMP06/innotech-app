import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { LatLng } from 'leaflet';

type LocationMapProps = {
    value: LatLng;
    onChange: (value: LatLng) => void;
}

export default function LocationMap({ value, onChange }: LocationMapProps) {
    return (
        <MapContainer
            center={value}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
                value={value}
                onChange={onChange}
            />
        </MapContainer>
    )
}

