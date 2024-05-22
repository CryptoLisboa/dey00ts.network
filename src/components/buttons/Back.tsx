"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const routeToPreviousPage = () => router.back();
    return (
        <div className="relative w-8 h-8 mt-14 ml-8 pointer-events-auto cursor-pointer" onClick={routeToPreviousPage}>
            <Image
                src="/images/buttons/back.svg"
                alt="bg"
                layout="fill"
                style={{
                    objectFit: "contain",
                }}
            />
        </div>
    );
}
