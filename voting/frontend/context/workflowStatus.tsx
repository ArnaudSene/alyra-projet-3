"use client"

import {createContext, ReactNode, useContext, useState} from "react";

interface IWorkflowStatusProps {
    workflowStatus: number;
    setWorkflowStatus: (workflowStatus: number) => void;
}


const WorkflowStatusContext = createContext<IWorkflowStatusProps>({
    workflowStatus: 0,
    setWorkflowStatus: () => 0
})

export const WorkflowStatusContextProvider = ({ children }: { children: ReactNode }) => {
    const [workflowStatus, setWorkflowStatus] = useState(0)

    return (

        <WorkflowStatusContext.Provider value={{
            workflowStatus: workflowStatus,
            setWorkflowStatus: setWorkflowStatus
        }}>
            {children}
        </WorkflowStatusContext.Provider>
    )
}

export const useWorkflowStatusContext = () => useContext(WorkflowStatusContext)
