'use client'

import { Spinner } from '@nextui-org/react'
import { LatLngExpression } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const defaultCenter: LatLngExpression = [38.9072, -77.0369]
const defaultZoom = 8

export const MapView = () => {
  if (typeof window === 'undefined') {
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
    </MapContainer>
  )
}
