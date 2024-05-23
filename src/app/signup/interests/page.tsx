"use client";
import BgImage from "@/components/BackgroundImage";
import BackButton from "@/components/buttons/Back";
import SignUpCard from "@/components/cards/SignUp";
import { Button, Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LocationSignUp() {
    const router = useRouter();
    const routeToBioSignUp = () => router.push("/signup/bio");
    return (
        <main className="h-screen">
            <BackButton />
            <BgImage src="/images/dey00ts_bgs/mobile/4_welcome.png" alt="bg" className="absolute" />
            <SignUpCard onClickNext={routeToBioSignUp}>
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
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        <Button className="p-2 text-lg text-[#BD8BFF] border-[#BD8BFF]" variant="bordered">
                            Alpha Caller
                        </Button>
                        <Button className="p-2 text-lg text-[#06F0FF] border-[#06F0FF]" variant="bordered">
                            Collab Manager
                        </Button>
                        <Button className="p-2 text-lg text-[#FF6B6B] border-[#FF6B6B]" variant="bordered">
                            Community Builder
                        </Button>
                        <Button className="p-2 text-lg text-[#1BCEA3] border-[#1BCEA3] opacity-50" variant="bordered">
                            Content Creator
                        </Button>
                        <Button className="p-2 text-lg text-[#FFFF75] border-[#FFFF75] opacity-50" variant="bordered">
                            EVM Dev
                        </Button>
                        <Button className="p-2 text-lg text-[#FFA500] border-[#FFA500]" variant="bordered">
                            Full Stack
                        </Button>
                        <Button className="p-2 text-lg text-[#FFC9DF] border-[#FFC9DF] opacity-50" variant="bordered">
                            Sol Dev
                        </Button>
                        <Button className="p-2 text-lg text-[#3792FF] border-[#3792FF]" variant="bordered">
                            Space Host
                        </Button>
                    </div>
                </div>
            </SignUpCard>
        </main>
    );
}