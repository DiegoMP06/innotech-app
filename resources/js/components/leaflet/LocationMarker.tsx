import { LatLng, } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";

type LocationMarkerProps = {
    value: LatLng;
    onChange: (value: LatLng) => void;
}


export default function LocationMarker({ onChange, value }: LocationMarkerProps) {
    const map = useMapEvents({

        click() {
            map.locate()
        },
        locationfound(e) {
            onChange(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return (
        <Marker
            position={value}
            draggable
            eventHandlers={{
                dragend(e) {
                    onChange(e.target.getLatLng())
                }
            }}
        >
            <Popup>You are here</Popup>
        </Marker>
    )
}

