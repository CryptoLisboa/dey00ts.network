"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/system";

export const Providers = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element | string;
}) => {
  return <NextUIProvider>{children} </NextUIProvider>;
};
