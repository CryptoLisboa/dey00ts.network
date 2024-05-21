// import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import Image from "next/image";

function BgImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            layout="fill"
            style={{ objectFit: "cover", zIndex: -1 }}
            className={className}
            // placeholder="blur" // needs blurDataURL
            // blurDataURL=""
        />
    );
}

export default function Home() {
    return (
        <main className="h-screen">
            <BgImage src="/images/dey00ts_bgs/mobile/1_welcome.png" alt="bg" className="absolute" />
            <div className="h-full grid grid-rows-12 justify-between px-10 pb-52 pt-52">
                {/* top card area */}
                <div className="row-span-10">
                    <div className="text-center grid justify-items-center gap-y-5">
                        <div className="relative w-40 h-32 grid">
                            <Image src="/images/sign_up/avatar_pfp_welcome.png" alt="avatar_pfp_welcome" fill />
                        </div>
                        <h1 className="text-4xl font-bold text-white text-center">welcome to DeY00ts.Network</h1>
                        <p className="text-base lg:text-xl text-[#FF3634]">
                            let&apos;s get to know each other, trade, meet and have fun!
                        </p>
                        <p className="text-base lg:text-xl text-white">
                            your answers to the next few questions will help us know more about you and your interest.
                        </p>
                    </div>
                </div>
                {/* bottom card area */}
                <div className="row-span-2 grid gap-y-5 lg:gap-y-8 justify-center">
                    <Button className="bg-black w-full text-white text-sm md:text-3xl" variant="shadow">
                        Next
                    </Button>
                    <Link href="#" className="text-white text-center text-sm md:text-3xl" underline="hover">
                        already part of Dey00ts Network? log in instead
                    </Link>
                </div>
            </div>
        </main>
    );
}
