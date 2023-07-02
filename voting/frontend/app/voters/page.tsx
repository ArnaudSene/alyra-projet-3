"use client";

import IsConnected from "@/components/IsConnected";
import GetVoter from "@/components/voters/GetVoter";
import ProposalManager from "@/components/voters/ProposalManager";
import Event from "@/components/Event";
import {WorkflowStepperManager} from "@/components/home/WorkflowStepperManager";
import * as React from "react";


export default function Voters() {
  return (

    <IsConnected asVoter={true}>
        <WorkflowStepperManager />
        <GetVoter />
        <ProposalManager />

        <div className="mt-2">
            <Event name='ProposalRegistered'></Event>
        </div>
    </IsConnected>
  )
}
