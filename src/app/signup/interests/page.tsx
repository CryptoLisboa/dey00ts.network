"use client";
import BgImage from "@/components/BackgroundImage";
import BackButton from "@/components/buttons/Back";
import SignUpCard from "@/components/cards/SignUp";
import { Progress } from "@nextui-org/react";

export default function LocationSignUp() {
    return (
        <main className="h-screen">
            <BackButton />
            <BgImage src="/images/dey00ts_bgs/mobile/4_welcome.png" alt="bg" className="absolute" />
            <SignUpCard>
                <div className="text-center grid justify-items-center gap-y-5">
                    <Progress
                        size="sm"
                        radius="sm"
                        classNames={{
                            base: "px-16",
                            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        }}
                        value={(100 / 6) * 3}
                    />
                    <h1 className="text-3xl font-bold text-white text-center">What are you interested in?</h1>
                    <p className="text-base lg:text-xl text-white">
                        Pick up 5, this will customize your content created by La Creme De La Creme of Y00ts & DeGods
                        community!
                    </p>
                </div>
            </SignUpCard>
        </main>
    );
}
