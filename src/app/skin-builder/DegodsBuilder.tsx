import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";

export const DegodsBuilder = () => {
  return (
    <>
      <div className="flex gap-1 justify-center">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Select Trait</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            onAction={(key) => alert(key)}
          >
            <DropdownItem key={"background"}>Background</DropdownItem>
            <DropdownItem key={"head"}>Head</DropdownItem>
            <DropdownItem key={"body"}>Body</DropdownItem>
            <DropdownItem key={"accessory"}>Accessory</DropdownItem>
            <DropdownItem key={"weapon"}>Weapon</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Select Subtrait</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            onAction={(key) => alert(key)}
          >
            <DropdownItem key={"background1"}>Background1</DropdownItem>
            <DropdownItem key={"head1"}>Head1</DropdownItem>
            <DropdownItem key={"body1"}>Body1</DropdownItem>
            <DropdownItem key={"accessory1"}>Accessory1</DropdownItem>
            <DropdownItem key={"weapon1"}>Weapon1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="flex mt-3 justify-center items-center">
        <button className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <Image
          className="border-1 border-gray-400"
          as={NextImage}
          src="/temp/2.png"
          alt="Skin Builder"
          width={220}
          height={220}
        />
        <button className="ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      <div className="flex mt-3 justify-center">
        <Image
          className="border-1 border-gray-400"
          as={NextImage}
          src="/temp/download.png"
          alt="Skin Builder"
          width={220}
          height={220}
        />
      </div>
    </>
  );
};
