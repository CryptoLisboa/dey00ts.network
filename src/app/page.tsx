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
                <div className="row-span-10">
                    <h1 className="text-4xl font-bold text-white text-center">Hello, World!</h1>
                </div>

                {/* <div> */}
                <div className="row-span-2 grid gap-y-5 lg:gap-y-8">
                    <Button className="bg-black w-full text-white text-sm md:text-3xl" variant="shadow">
                        Next
                    </Button>
                    <Link href="#" className="text-white text-center text-sm md:text-3xl" underline="hover">
                        Already part of Dey00ts Network? Log in instead
                    </Link>
                </div>
            </div>
        </main>
    );
}
