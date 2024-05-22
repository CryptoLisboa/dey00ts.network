import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-3 md:p-6">
      <Link href={"/"}>
        <Image
          as={NextImage}
          src="/images/degods-logo.png"
          alt="Logo"
          className="border-0 rounded-none"
          width={84}
          height={84}
        />
      </Link>

      <Link href={"profile"}>
        <Image
          as={NextImage}
          src="/temp/avatar.png"
          alt="Logo"
          width={42}
          height={42}
        />
      </Link>
    </nav>
  );
};
