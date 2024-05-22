import BgImage from "@/components/BackgroundImage";
import SignUpCard from "@/components/cards/SignUp";
import { RadioGroup, Radio, Spacer } from "@nextui-org/react";

function SpacerRadio() {
    return <Spacer y={3} />;
}

export default function GenderSignUp() {
    return (
        <main className="h-screen">
            <BgImage src="/images/dey00ts_bgs/mobile/2_welcome.png" alt="bg" className="absolute" />
            <SignUpCard>
                <div className="text-center grid justify-items-center gap-y-5">
                    <h1 className="text-4xl font-bold text-white text-center">what&apos;s your gender?</h1>

                    <p className="text-base lg:text-xl text-white">
                        this helps us find more relevant content. we won&apos;t show it on your profile.
                    </p>

                    <RadioGroup isRequired color="success" label="" className="w-full">
                        <Radio color="primary" value="male">
                            <p className="text-white">male</p>
                        </Radio>
                        <SpacerRadio />
                        <Radio color="danger" value="female">
                            <p className="text-white">female</p>
                        </Radio>
                        <SpacerRadio />
                        <Radio color="warning" value="other">
                            <p className="text-white">other</p>
                        </Radio>
                    </RadioGroup>
                </div>
            </SignUpCard>
        </main>
    );
}
