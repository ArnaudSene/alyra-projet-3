import {
    Stack,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    Text, useSteps
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useWorkflowStatusContext} from "@/context/workflowStatus";
import {WorkflowStatusStepper, WorkflowStepper} from "@/constants";
import {getWorkflowStatus} from "@/utils";
import {useAccount} from "wagmi";

export const WorkflowStepperManager = () => {
    const { address } = useAccount()
    const { workflowStatus, setWorkflowStatus} = useWorkflowStatusContext()
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
        <div className="pb-10">
            <div className="mb-8">
                <h1 className="text-center text-6xl">
                    <span className="font-bold text-6xl">Alyra  </span>
                    <span className="text-rose-500">myVote</span></h1>
            </div>

            <Stack>
                <Stepper size='md' colorScheme='purple' index={activeStep} gap='0'>
                    {steps.map((step, index) => (
                        <Step key={index} gap='0'>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />

                            </StepIndicator>
                            <StepSeparator _horizontal={{ ml: '0' }} />
                        </Step>
                    ))}
                </Stepper>
                <Text>
                    Step {activeStep + 1}: <b>{activeStepText}</b>
                </Text>
            </Stack>
        </div>
    );
};