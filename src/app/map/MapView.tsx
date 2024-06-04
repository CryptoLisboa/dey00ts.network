'use client'

import { Spinner } from '@nextui-org/react'
import { LatLng, LatLngExpression } from 'leaflet'
import React, { useLayoutEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import { useSession } from 'next-auth/react'

const defaultCenter: LatLngExpression = [38.9072, -77.0369]
const defaultZoom = 8

function LocationMarker() {
  const session = useSession()
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },

    locationfound(e) {
      debugger
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  const myIcon = L.icon({
    iconUrl: session.data?.user.image || '/temp/avatar.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    className: 'rounded-full',
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
  })

  console.log({ position })
  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export const MapView = () => {
  const [unmountMap, setunmountMap] = useState(false)

  useLayoutEffect(() => {
    setunmountMap(false)
    return () => {
      setunmountMap(true)
    }
  }, [])

  if (typeof window === 'undefined' || unmountMap) {
    return <Spinner />
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className='w-full h-full'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker />
    </MapContainer>
  )
}
