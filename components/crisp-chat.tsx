"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("16805e4f-cf22-4c4f-aad7-5049d28c831f");
  }, []);

  return null;
};
