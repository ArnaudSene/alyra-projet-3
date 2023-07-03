import { Step, StepIndicator, Stepper, StepSeparator, StepStatus, Text, useSteps} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useWorkflowStatusContext } from "@/context/workflowStatus"
import { WorkflowStatusStepper, WorkflowStepper } from "@/constants/stepper"
import { getWorkflowStatus } from "@/utils"
import { useAccount } from "wagmi"

export const WorkflowStepperManager = () => {
    const { address } = useAccount()
    const { workflowStatus, setWorkflowStatus } = useWorkflowStatusContext()
    const steps: WorkflowStepper[] = WorkflowStatusStepper
    const { activeStep, setActiveStep } = useSteps({
        index: workflowStatus,
        count: steps.length,
    })
    const activeStepText = steps[activeStep].description

    useEffect(() => {
        getWorkflowStatus(address as `0x${string}`).then(
            status => setWorkflowStatus(status)
        ).catch(err => console.log(err))
        setActiveStep(workflowStatus)

    }, [workflowStatus])

    return (
        <div className="mb-20 mt-10">
            <Stepper size='md' colorScheme='purple' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus complete={`✔️`} incomplete={`🗸`} active={`📍`} />
                        </StepIndicator>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            <Text className="text-center font-semibold text-xl p-5">
                <span className="font-bold text-violet-500 underline underline-offset-4">Step {activeStep + 1}:</span> {activeStepText}
            </Text>
        </div>
    );
};