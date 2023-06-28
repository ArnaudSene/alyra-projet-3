"use client";

import IsConnected from "@/components/IsConnected";
import GetVoter from "@/components/voters/GetVoter";

export default function Voters() {
  return (
    <IsConnected>
      <GetVoter />
    </IsConnected>
  )
}
