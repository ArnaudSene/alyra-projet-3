import {WorkflowStatus} from "@/constants";
import React from "react";
import {useWorkflowStatusContext} from "@/context/workflowStatus";
import {ShowResult} from "@/components/home/ShowResult";
import Link from "next/link";

export const ActionMenu = () => {
    const { workflowStatus } = useWorkflowStatusContext()

    return (
        <>
            {WorkflowStatus[workflowStatus] === "ProposalsRegistrationStarted" &&
                <div>
                    <h1>You can add proposal</h1>
                    <Link className="p-2 font-semibold hover:text-indigo-500 hover:font-bold" href="/voters">Add your proposals</Link>
                </div>
            }

            {WorkflowStatus[workflowStatus] === "VotingSessionStarted" &&
                <div>
                    <h1>You can add proposal</h1>
                    <Link className="p-2 font-semibold hover:text-indigo-500 hover:font-bold" href="/voters">Vote Now</Link>
                </div>
            }

            {WorkflowStatus[workflowStatus] === "VotesTallied" && <ShowResult />}
        </>
    );
};