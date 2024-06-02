'use client'
import { LatLngExpression } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const defaultCenter: LatLngExpression = [38.9072, -77.0369]
const defaultZoom = 8

export default function Page() {
  return (
    <main className='dark flex w-full h-[85vh]' id='map'>
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
    </main>
  )
}
