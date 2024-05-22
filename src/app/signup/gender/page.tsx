"use client";
import BgImage from "@/components/BackgroundImage";
import BackButton from "@/components/buttons/Back";
import SignUpCard from "@/components/cards/SignUp";
import { RadioGroup, Radio, Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function GenderSignUp() {
    const router = useRouter();

    const routeToLocationSignUp = () => router.push("/signup/location_lang");
    return (
        <main className="h-screen">
            <BackButton />
            <BgImage src="/images/dey00ts_bgs/mobile/2_welcome.png" alt="bg" className="absolute" />
            <SignUpCard onClickNext={routeToLocationSignUp}>
                <div className="text-center grid justify-items-center gap-y-5">
                    <Progress
                        size="sm"
                        radius="sm"
                        classNames={{
                            base: "px-16",
                            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        }}
                        value={(100 / 6) * 1}
                    />

                    <h1 className="text-3xl font-bold text-white text-center">what&apos;s your gender?</h1>

                    <p className="text-base lg:text-xl text-white">
                        this helps us find more relevant content. we won&apos;t show it on your profile.
                    </p>

                    <RadioGroup
                        isRequired
                        color="success"
                        label=""
                        classNames={{
                            base: "w-full",
                            wrapper: "grid grid-cols-1 gap-y-5",
                        }}
                    >
                        <Radio color="primary" value="male">
                            <p className="text-white">male</p>
                        </Radio>
                        {/* <SpacerRadio /> */}
                        <Radio color="danger" value="female">
                            <p className="text-white">female</p>
                        </Radio>
                        {/* <SpacerRadio /> */}
                        <Radio color="warning" value="other">
                            <p className="text-white">other</p>
                        </Radio>
                    </RadioGroup>
                </div>
            </SignUpCard>
        </main>
    );
}
