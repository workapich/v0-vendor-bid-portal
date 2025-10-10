"use client"

import styled from "styled-components"
import { Check } from "lucide-react"

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const StepCircle = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  background: ${(props) => (props.$completed ? "rgb(22 163 74)" : props.$active ? "rgb(37 99 235)" : "rgb(148 163 184)")};
`

const StepLabel = styled.span<{ $active?: boolean }>`
  font-weight: 500;
  color: ${(props) => (props.$active ? "rgb(15 23 42)" : "rgb(100 116 139)")};
`

const StepDivider = styled.div`
  width: 4rem;
  height: 2px;
  background: rgb(203 213 225);
`

interface Step {
  label: string
  number: number
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <StepContainer>
      {steps.map((step, index) => (
        <div key={step.number} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <StepItem>
            <StepCircle $active={currentStep === step.number} $completed={currentStep > step.number}>
              {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
            </StepCircle>
            <StepLabel $active={currentStep === step.number}>{step.label}</StepLabel>
          </StepItem>
          {index < steps.length - 1 && <StepDivider />}
        </div>
      ))}
    </StepContainer>
  )
}
