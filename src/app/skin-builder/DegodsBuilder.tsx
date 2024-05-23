import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import NextImage from 'next/image'

const BASE_URL = {
  Backgrounds:
    'https://bafybeihnbn4zgm27jputfhxlbtlyain3k3kdfv6dnu37tb473zoowwdb6a.ipfs.dweb.link',
  Backgrounds_ipfs_uri: 'ipfs://QmeHyUvwe22ww6LuQy7cbGw5jxjCbNq9SaF7nhjqcvvfKD',
  Clothes:
    'https://bafybeigntq74czaglmytesw5u5bgqiuhghuzwxpyn2igijqy5vbzanpqbm.ipfs.dweb.link',
  Clothes_ipfs_uri: 'ipfs://QmcBGUWEw6DKhMBaf5KtPvEWDU5WySHCfwa5jAWrj6D3W2',
  Eyes: 'https://bafybeigim6kdmzlme4ai6hzfrhn3uymzuzsg4osjs5lfltifwhpqbew4im.ipfs.dweb.link/',
  Eyes_ipfs_uri: 'ipfs://QmbpwrXwmfb6AU7JbVBLdyGkC43mo6Ah3fMVZoW5ZdYRKx',
  Head: 'https://bafybeid3pam53yhwk67lku4kwizslyxkzqhyd5ddie4hwknlfmflvcdb34.ipfs.dweb.link',
  Head_ipfs_uri: 'ipfs://QmWed5GJrNARWemoKnJhfuNHZpCeaRhxt4KkkXdKtUUHs4',
  Mouth:
    'https://bafybeihnydqqpaeenlfvsntyy2y26ujpohrlmzqftksc5n7cqmdxysa2vi.ipfs.dweb.link',
  Mouth_ipfs_uri: 'pfs://QmeLjv9M6ZGJTiqcJ5XKMKYVpG11eKMwkEsoGYRngAkLh7',
  Neck: 'https://bafybeifa35pzmciwbxy6oqsk2rjjyojk2xzkbew5shbs5a3pnqugx6zxm4.ipfs.dweb.link',
  Neck_ipfs_uri: 'ipfs://QmZAdVbAgtdRuuu46xzMZxmAAaDMAc3H79tBTdUcBPPJCv',
  Skins:
    'https://bafybeihrzkh3bnp2n53xr77csfyj6uyyud7cie43oworzvs55343aavdpy.ipfs.dweb.link',
  Skins_ipfs_uri: 'ipfs://QmecW7PRT9Esmiy9Gdw9YKeYZqk11jB858EkbG8jBtw9x9',
  Speciality:
    'https://bafybeib5zumzk2tzxn3pbixrp622xsqxvkpxlo5uvrjlrectpicsac2qvy.ipfs.dweb.link',
  Speciality_ipfs_uri: 'ipfs://QmSVtyF6dUzbjmBEEuqXhbTjXxjkmnrdoJmw7GDkYCYsgh',
}

export const DegodsBuilder = () => {
  return (
    <>
      <div className='flex gap-1 justify-center'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>Select Trait</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Action event example'
            onAction={(key) => alert(key)}
          >
            <DropdownItem key={'background'}>Background</DropdownItem>
            <DropdownItem key={'head'}>Head</DropdownItem>
            <DropdownItem key={'body'}>Body</DropdownItem>
            <DropdownItem key={'accessory'}>Accessory</DropdownItem>
            <DropdownItem key={'weapon'}>Weapon</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>Select Subtrait</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Action event example'
            onAction={(key) => alert(key)}
          >
            <DropdownItem key={'background1'}>Background1</DropdownItem>
            <DropdownItem key={'head1'}>Head1</DropdownItem>
            <DropdownItem key={'body1'}>Body1</DropdownItem>
            <DropdownItem key={'accessory1'}>Accessory1</DropdownItem>
            <DropdownItem key={'weapon1'}>Weapon1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className='flex mt-3 justify-center items-center'>
        <button className='mr-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
            />
          </svg>
        </button>
        <Image
          className='border-1 border-gray-400'
          as={NextImage}
          src='/temp/2.png'
          alt='Skin Builder'
          width={220}
          height={220}
        />
        <button className='ml-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
        </button>
      </div>

      <div className='flex mt-3 justify-center'>
        <Image
          className='border-1 border-gray-400'
          as={NextImage}
          src='/temp/download.png'
          alt='Skin Builder'
          width={220}
          height={220}
        />
      </div>
    </>
  )
}
