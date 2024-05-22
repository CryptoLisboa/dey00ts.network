"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-rowdies text-4xl md:text-6xl">DeY00ts.Network</h1>
      <h2 className="font-rowdies text-2xl md:text-4xl">
        Made by
        <Link className="underline" href="https://twitter.com/lisbonlabs">
          {" "}
          {["L", "i", "s", "b", "o", "n", "L", "a", "b", "s"].map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: i / 20,
              }}
              key={i}
            >
              {el}
            </motion.span>
          ))}
        </Link>
      </h2>

      <div className="flex flex-wrap items-center gap-12 mt-6 font-lucky">
        <Link href="/signup/welcome">Sign Up</Link>
        <Link href="/skin-builder">Skin Builder</Link>
      </div>
    </main>
  );
}
