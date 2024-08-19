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
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { useSession } from 'next-auth/react'
import UserPopUp from '@/app/map/UserPopUp.MapView'

const defaultCenter: LatLngExpression = [38.9072, -77.0369]
const defaultZoom = 4

const updateUserLocation = async () => {
  try {
    const response = await fetch('/api/user/location', {
      method: 'PUT',
    })
  } catch (error: any) {
    console.error(error)
  }
}

function LocationMarker() {
  const session = useSession()
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },

    locationfound(e) {
      setPosition(e.latlng)

      map.flyTo(e.latlng, map.getZoom())
    },
  })

  const myIcon = L.icon({
    iconUrl: session.data?.user.image || '/temp/avatar.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    className: 'rounded-full',
  })

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const UserMarker = ({
  user,
  handleClick,
}: {
  user: any
  handleClick: (user: any) => void
}) => {
  const myIcon = L.icon({
    iconUrl: user.image || '/temp/avatar.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    className: 'rounded-full',
  })
  return (
    <Marker
      position={[user.location.lat, user.location.lng]}
      icon={myIcon}
      eventHandlers={{
        click: (e) => {
          console.log('marker clicked', e)
          handleClick(user)
        },
      }}
    >
      <Popup>
        <UserPopUp user={user} />
      </Popup>
    </Marker>
  )
}

const UserMarkersList = ({
  users,
  handleClick,
}: {
  users: any[]
  handleClick: (user: any) => void
}) => {
  return (
    <MarkerClusterGroup chunkedLoading>
      {users?.map((user) => (
        <UserMarker key={user.id} user={user} handleClick={handleClick} />
      ))}
    </MarkerClusterGroup>
  )
}

export const MapView = ({
  users,
  handleClick,
}: {
  users: any[]
  handleClick: (user: any) => void
  selectedUser: any
}) => {
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
      closePopupOnClick={true}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      zoomAnimation={true}
      minZoom={3}
      maxZoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <UserMarkersList users={users} handleClick={handleClick} />

      {/* <LocationMarker /> */}
    </MapContainer>
  )
}
