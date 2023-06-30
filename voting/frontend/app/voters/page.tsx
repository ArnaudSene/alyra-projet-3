"use client";

import Event from "@/components/Event";
import IsConnected from "@/components/IsConnected";
import GetVoter from "@/components/voters/GetVoter";
import ProposalManager from "@/components/voters/ProposalManager";
import { userIsVoter } from "@/utils";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useAccount } from "wagmi";
import ProposalEvents from "@/components/voters/ProposalEvents";

export default function Voters() {
  const { address, isConnected } = useAccount()
  const { push } = useRouter()

  useEffect(() => {
    if (isConnected) userIsVoter(address as `0x${string}`).then(
      isVoter => {if (!isVoter) push('/')}
    ).catch(() => push('/'))
  }, [address, isConnected])

  return (
      <>
        <IsConnected>
            <GetVoter />
            <ProposalManager />
            <ProposalEvents/>
            <Event name='ProposalRegistered'></Event>
        </IsConnected>
      </>
  )
}
