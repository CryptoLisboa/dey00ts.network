import { NextUIProvider } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <NextUIProvider>
            <Link href="/signup/welcome">Sign Up</Link>
        </NextUIProvider>
    );
}
