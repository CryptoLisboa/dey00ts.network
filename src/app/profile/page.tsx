"use client";

import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function Profile() {
  return (
    <main className="container pt-0 mx-auto p-4">
      <div className="flex flex-col items-center mb-4">
        <Image
          as={NextImage}
          src="/temp/profile-avatar.png"
          alt="Avatar"
          className="rounded-full w-56 h-56"
          width={224}
          height={224}
        />
        <p className="text-sm font-bold text-gray-400">@username</p>
      </div>
      <h3 className="mt-4 text-lg text-community-builder font-bold">
        Community Builder
      </h3>
      <div className="flex flex-col gap-1">
        <div className="flex p-1 gap-3">
          <Image
            as={NextImage}
            src="/icons/location.svg"
            alt="Location Icon"
            width={24}
            height={24}
          />
          <p>United States of America</p>
        </div>
        <div className="flex p-1 gap-3">
          <Image
            as={NextImage}
            src="/icons/message.svg"
            alt="Location Icon"
            width={24}
            height={24}
          />
          <p>English</p>
          <p>Portuguese</p>
          <p>French</p>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold">Bio</h3>
      <p className="text-sm ">
        Urban poet. Coffee aficionado & deep friendships seeker. Culture
        explorer. Turning words into poetry since 1990.
      </p>

      <h3 className="mt-4 text-lg font-bold">Experiences</h3>
      <p className="text-sm ">EZY | Web Designer 01/02/2024 - 02/02/2024</p>
      <p className="text-sm ">EZY | Web Designer 01/02/2024 - 02/02/2024</p>
      <p className="text-sm ">EZY | Web Designer 01/02/2024 - 02/02/2024</p>

      <h3 className="mt-4 text-lg font-bold">Skills</h3>
      <div className="flex flex-wrap gap-6">
        <Button className="bg-transparent border-1 border-community-builder text-community-builder">
          Community Builder
        </Button>
        <Button className="bg-transparent border-1 border-content-creator text-content-creator">
          Content Creator
        </Button>
        <Button className="bg-transparent border-1 border-space-host text-space-host">
          Space Host
        </Button>
        <Button className="bg-transparent border-1 border-collab-manager text-collab-manager">
          Collab Manager
        </Button>
      </div>

      <h3 className="mt-4 text-lg font-bold">Community</h3>
      <div className="flex flex-wrap gap-6">
        <p className="font-bold">y00ts</p>
        <p className="font-bold">DeGods</p>
      </div>

      <div className="mt-4 flex gap-6">
        <Button className="bg-transparent border-1 border-[#D9D9D980] text-white">
          <Image
            as={NextImage}
            src="/icons/discord.svg"
            alt="Add Icon"
            width={24}
            height={24}
          />
          username
        </Button>

        <Button className="bg-transparent border-1 border-[#D9D9D980] text-white">
          <Image
            as={NextImage}
            src="/icons/twitter.svg"
            alt="Add Icon"
            width={24}
            height={24}
          />
          twitter.com/username
        </Button>
      </div>
    </main>
  );
}
