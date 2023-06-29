"use client"

import {createContext, useContext, useState} from "react";

const WorkflowStatusContext = createContext({})

export const WorkflowStatusContextProvider = ({ children }) => {
    const [workflowStatus, setWorkflowStatus] = useState(0)

    return (
        <WorkflowStatusContext.Provider value={{ workflowStatus, setWorkflowStatus }}>
            {children}
        </WorkflowStatusContext.Provider>
    )
}

export const useWorkflowStatusContext = () => useContext(WorkflowStatusContext)
