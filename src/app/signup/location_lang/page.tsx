import BgImage from "@/components/BackgroundImage";
import BackButton from "@/components/buttons/Back";
import SignUpCard from "@/components/cards/SignUp";
import { RadioGroup, Radio, Progress } from "@nextui-org/react";

export default function LocationSignUp() {
    return (
        <main className="h-screen">
            <BackButton />
            <BgImage src="/images/dey00ts_bgs/mobile/2_welcome.png" alt="bg" className="absolute" />
            <SignUpCard>
                <div className="text-center grid justify-items-center gap-y-5">
                    <Progress
                        size="sm"
                        radius="sm"
                        classNames={{
                            base: "px-16",
                            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        }}
                        value={(100 / 6) * 2}
                    />

                    <h1 className="text-3xl font-bold text-white text-center">
                        What&apos;s your language and where do you live?
                    </h1>

                    <p className="text-base lg:text-xl text-white">
                        This helps us find cool people around you to get some connections and easily communicate.
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
