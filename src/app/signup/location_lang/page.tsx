"use client";
import BgImage from "@/components/BackgroundImage";
import BackButton from "@/components/buttons/Back";
import SignUpCard from "@/components/cards/SignUp";
import { Progress, Select, SelectItem } from "@nextui-org/react";

const languages = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Italian", value: "italian" },
    { label: "Portuguese", value: "portuguese" },
    { label: "Russian", value: "russian" },
    { label: "Chinese", value: "chinese" },
    { label: "Japanese", value: "japanese" },
    { label: "Arabic", value: "arabic" },
];

const locations = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "Italy", value: "it" },
    { label: "Russia", value: "ru" },
    { label: "China", value: "cn" },
    { label: "Japan", value: "jp" },
    { label: "Saudi Arabia", value: "sa" },
    { label: "United Arab Emirates", value: "ae" },
    { label: "South Africa", value: "za" },
    { label: "Brazil", value: "br" },
    { label: "Argentina", value: "ar" },
    { label: "Mexico", value: "mx" },
    { label: "India", value: "in" },
    { label: "Indonesia", value: "id" },
    { label: "Philippines", value: "ph" },
    { label: "Nigeria", value: "ng" },
    { label: "Kenya", value: "ke" },
    { label: "Egypt", value: "eg" },
    { label: "Morocco", value: "ma" },
    { label: "South Korea", value: "kr" },
    { label: "Vietnam", value: "vn" },
    { label: "Thailand", value: "th" },
    { label: "Turkey", value: "tr" },
    { label: "Spain", value: "es" },
    { label: "Greece", value: "gr" },
    { label: "Netherlands", value: "nl" },
    { label: "Sweden", value: "se" },
    { label: "Norway", value: "no" },
    { label: "Finland", value: "fi" },
    { label: "Denmark", value: "dk" },
    { label: "Poland", value: "pl" },
    { label: "Ukraine", value: "ua" },
    { label: "Belarus", value: "by" },
    { label: "Czech Republic", value: "cz" },
    { label: "Slovakia", value: "sk" },
    { label: "Hungary", value: "hu" },
    { label: "Romania", value: "ro" },
    { label: "Bulgaria", value: "bg" },
    { label: "Serbia", value: "rs" },
    { label: "Croatia", value: "hr" },
    { label: "Bosnia and Herzegovina", value: "ba" },
    { label: "Montenegro", value: "me" },
    { label: "Albania", value: "al" },
    { label: "Kosovo", value: "xk" },
    { label: "North Macedonia", value: "mk" },
    { label: "Slovenia", value: "si" },
    { label: "Austria", value: "at" },
];

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

                    <div className="grid gap-y-6 w-full px-4 items-center">
                        <div className="grid gap-y-2">
                            <h4 className="text-white text-left">Language</h4>
                            <Select
                                variant="bordered"
                                className=""
                                selectionMode="single"
                                classNames={{
                                    base: "text-[#AFE5FF]",
                                    value: "text-[#AFE5FF]",
                                    popoverContent: "text-[#AFE5FF] bg-[#111111]",
                                    trigger: "border-[#AFE5FF]",
                                }}
                            >
                                {languages.map((language) => (
                                    <SelectItem key={language.value} value={language.value}>
                                        {language.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="grid gap-y-2">
                            <h4 className="text-white text-left">Location</h4>
                            <Select
                                variant="bordered"
                                className=""
                                selectionMode="single"
                                classNames={{
                                    base: "text-[#AFE5FF]",
                                    value: "text-[#AFE5FF]",
                                    popoverContent: "text-[#AFE5FF] bg-[#111111]",
                                    trigger: "border-[#AFE5FF]",
                                }}
                            >
                                {locations.map((location) => (
                                    <SelectItem key={location.value} value={location.value}>
                                        {location.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </SignUpCard>
        </main>
    );
}
