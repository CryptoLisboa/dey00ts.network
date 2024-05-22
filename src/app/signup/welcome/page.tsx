"use client";
import BgImage from "@/components/BackgroundImage";
import SignUpCard from "@/components/cards/SignUp";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WelcomeSignUp() {
    const router = useRouter();

    const routeToGenderSignUp = () => router.push("/signup/gender");

    return (
        <main className="h-screen">
            <BgImage src="/images/dey00ts_bgs/mobile/1_welcome.png" alt="bg" className="absolute" />
            <SignUpCard onClickNext={routeToGenderSignUp}>
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
            </SignUpCard>
        </main>
    );
}
