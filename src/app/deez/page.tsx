import Image from 'next/legacy/image'

export default function DeezNuts() {
  return (
    <div>
      <h1>Deez Nuts</h1>
      <Image
        className='border-1 border-gray-400'
        src={`https://bafybeihu3veecxn5bscv3jrenittgviqkbe4epek6poggozbbdsx2vm6jy.ipfs.dweb.link/Background/purple.png`}
        alt='Skin Builder'
        width={220}
        height={220}
      />
      {/* fallback to a local image for testing */}
      {/* <Image
        className='border-1 border-gray-400'
        src='/temporary-yoots/Background/purple.png'
        alt='Skin Builder'
        width={220}
        height={220}
      /> */}
    </div>
  )
}
