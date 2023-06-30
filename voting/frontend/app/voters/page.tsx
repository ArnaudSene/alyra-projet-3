"use client";

import Event from "@/components/Event";
import IsConnected from "@/components/IsConnected";
import GetVoter from "@/components/voters/GetVoter";
import ProposalManager from "@/components/voters/ProposalManager";

export default function Voters() {
  return (
    <IsConnected asVoter={true}>
      <GetVoter />
      <ProposalManager />
      <Event name='ProposalRegistered'></Event>
    </IsConnected>
  )
}
