import ReactMapGL, {
    GeolocateControl,
    Marker,
    NavigationControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React from 'react'
import Geocoder from './Geocoder'
import {mapboxAccessToken} from '../../utils/config'
import {AddressFormProps} from '../join/AddressForm'

const AddLocation = ({
    address,
    updateFields
}: AddressFormProps) => {
    const {lat, lng} = address

    
                <NavigationControl position="bottom-right"/>
                <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    onGeolocate={(e) => {
                        updateFields({
                            address: {
                                ...address,
                                lng: e.coords.longitude,
                                lat: e.coords.latitude
                            }
                        })
                    }
                    }
                />
                <Geocoder address={address} updateFields={updateFields}/>
            </ReactMapGL>
        </div>
    )
}

export default AddLocation
