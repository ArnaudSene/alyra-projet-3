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
import {TitleHeader} from "@/components/TitleHeader";

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
            <TitleHeader/>

            <Stack>
                <Stepper size='md' colorScheme='purple' index={activeStep} gap='0'>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />

                            </StepIndicator>
                            <StepSeparator />
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