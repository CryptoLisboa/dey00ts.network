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
import { getImageOfFirstToken } from '@/utils/de[id]/image'

const defaultCenter: LatLngExpression = [25, 20]
const defaultZoom = 3

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

const getUserCoordinates = (user: any) => {
  if (user?.location?.city?.latitude && user?.location?.city?.longitude) {
    return [user?.location?.city?.latitude, user?.location?.city?.longitude]
  }
  if (user?.location?.state?.latitude && user?.location?.state?.longitude) {
    return [user?.location?.state?.latitude, user?.location?.state?.longitude]
  }

  return [user?.location?.country?.latitude, user?.location?.country?.longitude]
}

const UserMarker = ({
  user,
  handleClick,
}: {
  user: any
  handleClick: (user: any) => void
}) => {
  const imageOfFirstToken = getImageOfFirstToken(user)
  const myIcon = L.icon({
    iconUrl: user.image || '/temp/avatar.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    className: 'rounded-full',
    ...(imageOfFirstToken && {
      shadowUrl: imageOfFirstToken,
      shadowSize: [64, 64],
      shadowAnchor: [32, 64],
    }),
  })
  const coordinates = getUserCoordinates(user)
  return (
    <Marker
      position={coordinates as LatLngExpression}
      icon={myIcon}
      eventHandlers={{
        click: (e) => {
          console.log('marker clicked', e)
          // handleClick(user)
        },
      }}
    >
      <Popup closeOnEscapeKey={true} closeButton={true} maxWidth={200}>
        <UserPopUp key={`pop-up-key-${user.id}`} user={user} />
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
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={80}
      spiderfyDistanceMultiplier={3}
      // disableClusteringAtZoom={8}
      // node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js
    >
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
      maxZoom={9}
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
