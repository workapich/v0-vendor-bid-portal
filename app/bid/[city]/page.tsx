"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import {
  Truck,
  ArrowLeft,
  Check,
  Star,
  MapPin,
  DollarSign,
  Percent,
  Calculator,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Package,
} from "lucide-react"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const successPulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
`

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(239 246 255) 0%, rgb(219 234 254) 50%, rgb(191 219 254) 100%);
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const LogoCircle = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, rgb(37 99 235), rgb(29 78 216));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgb(37 99 235 / 0.3);

  @media (max-width: 768px) {
    width: 2.75rem;
    height: 2.75rem;
  }
`

const StyledTruckIcon = styled(Truck)`
  width: 1.75rem;
  height: 1.75rem;
  color: white;

  @media (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    display: none;
  }
`

const HeaderTitle = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin: 0;
  letter-spacing: -0.025em;
`

const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  color: rgb(71 85 105);
  margin: 0;
  font-weight: 500;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: white;
  border: 2px solid rgb(226 232 240);
  border-radius: 0.5rem;
  color: rgb(51 65 85);
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgb(248 250 252);
    border-color: rgb(203 213 225);
    transform: translateX(-2px);
  }

  &:active {
    transform: translateX(-4px);
  }

  @media (max-width: 640px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    
    span {
      display: none;
    }
  }
`

const StyledArrowIcon = styled(ArrowLeft)`
  width: 1rem;
  height: 1rem;
`

const Main = styled.main`
  flex: 1;
  padding: 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const Container = styled.div`
  max-width: 112rem;
  margin: 0 auto;
`

const HeroSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  border: 1px solid rgb(226 232 240);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const CityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const CityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CityIconCircle = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, rgb(239 246 255), rgb(219 234 254));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(191 219 254);

  @media (max-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
`

const StyledMapIcon = styled(MapPin)`
  width: 2rem;
  height: 2rem;
  color: rgb(37 99 235);

  @media (max-width: 640px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const CityTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CityLabel = styled.p`
  font-size: 0.875rem;
  color: rgb(100 116 139);
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`

const CityName = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: rgb(15 23 42);
  margin: 0;
  letter-spacing: -0.025em;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const FavoriteButton = styled.button<{ $isFavorite?: boolean }>`
  background: ${(props) => (props.$isFavorite ? "linear-gradient(135deg, rgb(250 204 21), rgb(234 179 8))" : "white")};
  border: 2px solid ${(props) => (props.$isFavorite ? "rgb(250 204 21)" : "rgb(226 232 240)")};
  border-radius: 0.75rem;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) => (props.$isFavorite ? "0 4px 6px -1px rgb(250 204 21 / 0.3)" : "0 1px 3px 0 rgb(0 0 0 / 0.1)")};

  &:hover {
    background: ${(props) => (props.$isFavorite ? "linear-gradient(135deg, rgb(234 179 8), rgb(202 138 4))" : "rgb(254 249 195)")};
    border-color: ${(props) => (props.$isFavorite ? "rgb(234 179 8)" : "rgb(250 204 21)")};
    transform: scale(1.1) rotate(${(props) => (props.$isFavorite ? "0deg" : "15deg")});
    box-shadow: 0 10px 15px -3px rgb(250 204 21 / 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
`

const StyledStarIcon = styled(Star)<{ $filled?: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  color: ${(props) => (props.$filled ? "white" : "rgb(161 161 170)")};
  fill: ${(props) => (props.$filled ? "white" : "none")};
  transition: all 0.2s;

  @media (max-width: 640px) {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const PageDescription = styled.p`
  color: rgb(71 85 105);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.5rem;
  }
`

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`

const StepCircle = styled.div<{ $completed?: boolean }>`
  width: 3rem;
  height: 3rem;
  background: ${(props) =>
    props.$completed
      ? "linear-gradient(135deg, rgb(22 163 74), rgb(21 128 61))"
      : "linear-gradient(135deg, rgb(37 99 235), rgb(29 78 216))"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: ${(props) => (props.$completed ? "0 4px 6px -1px rgb(22 163 74 / 0.3)" : "0 4px 6px -1px rgb(37 99 235 / 0.3)")};

  @media (max-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`

const StyledCheckIcon = styled(Check)`
  width: 1.5rem;
  height: 1.5rem;

  @media (max-width: 640px) {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const StepLabel = styled.span<{ $active?: boolean }>`
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${(props) => (props.$active ? "rgb(15 23 42)" : "rgb(100 116 139)")};

  @media (max-width: 640px) {
    font-size: 0.8125rem;
  }
`

const StepDivider = styled.div`
  width: 4rem;
  height: 0.25rem;
  background: linear-gradient(to right, rgb(226 232 240), rgb(203 213 225));
  border-radius: 0.125rem;

  @media (max-width: 640px) {
    width: 2rem;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2.5fr;
  }
`

const Sidebar = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  position: sticky;
  top: 7rem;
  height: fit-content;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  border: 1px solid rgb(226 232 240);
  animation: ${slideIn} 0.5s ease-out;

  @media (max-width: 1024px) {
    position: static;
    max-height: none;
  }
`

const SidebarTitle = styled.h4`
  font-weight: 700;
  font-size: 1.125rem;
  color: rgb(15 23 42);
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.025em;
`

const DestinationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const DestinationButton = styled.button<{ $selected?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 2px solid ${(props) => (props.$selected ? "rgb(37 99 235)" : "rgb(226 232 240)")};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${(props) => (props.$selected ? "linear-gradient(135deg, rgb(37 99 235), rgb(29 78 216))" : "white")};
  color: ${(props) => (props.$selected ? "white" : "rgb(15 23 42)")};
  box-shadow: ${(props) => (props.$selected ? "0 4px 6px -1px rgb(37 99 235 / 0.3)" : "0 1px 3px 0 rgb(0 0 0 / 0.05)")};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: ${(props) => (props.$selected ? "linear-gradient(135deg, rgb(29 78 216), rgb(30 64 175))" : "rgb(248 250 252)")};
    border-color: ${(props) => (props.$selected ? "rgb(29 78 216)" : "rgb(203 213 225)")};
    transform: translateX(4px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }

  &:active {
    transform: translateX(2px);
  }
`

const DestinationName = styled.div`
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
`

const DestinationDistance = styled.div`
  font-size: 0.8125rem;
  opacity: 0.8;
`

const FormCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  padding: 2rem;
  border: 1px solid rgb(226 232 240);
  animation: ${fadeIn} 0.7s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgb(100 116 139);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 640px) {
    padding: 3rem 1.5rem;
  }
`

const EmptyStateIcon = styled.div`
  width: 6rem;
  height: 6rem;
  background: linear-gradient(135deg, rgb(239 246 255), rgb(219 234 254));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border: 3px solid rgb(191 219 254);
  animation: ${pulse} 2s ease-in-out infinite;

  @media (max-width: 640px) {
    width: 5rem;
    height: 5rem;
  }
`

const StyledMapPinIcon = styled(MapPin)`
  width: 2.5rem;
  height: 2.5rem;
  color: rgb(37 99 235);

  @media (max-width: 640px) {
    width: 2rem;
    height: 2rem;
  }
`

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(51 65 85);
  margin: 0 0 0.5rem 0;

  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`

const EmptyStateText = styled.p`
  font-size: 0.9375rem;
  color: rgb(100 116 139);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`

const EmptyStateHint = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgb(239 246 255);
  border-radius: 0.5rem;
  color: rgb(37 99 235);
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid rgb(191 219 254);
`

const StyledPackageIcon = styled(Package)`
  width: 1rem;
  height: 1rem;
`

const SelectedDestinationCard = styled.div`
  background: linear-gradient(135deg, rgb(239 246 255), rgb(219 234 254));
  border: 2px solid rgb(191 219 254);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${fadeIn} 0.4s ease-out;
`

const DestinationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const DestinationIconCircle = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, rgb(37 99 235), rgb(29 78 216));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTrendingIcon = styled(TrendingUp)`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
`

const DestinationDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const DestinationLabel = styled.span`
  font-size: 0.75rem;
  color: rgb(100 116 139);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const DestinationNameLarge = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(15 23 42);
`

const DistanceBadge = styled.div`
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
  color: rgb(37 99 235);
  font-size: 0.875rem;
  border: 2px solid rgb(191 219 254);
`

const SectionContainer = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionHeader = styled.div<{ $required?: boolean }>`
  background: ${(props) => (props.$required ? "linear-gradient(135deg, rgb(239 246 255), rgb(219 234 254))" : "rgb(248 250 252)")};
  padding: 1rem 1.5rem;
  border-radius: 0.75rem 0.75rem 0 0;
  border-bottom: 3px solid ${(props) => (props.$required ? "rgb(37 99 235)" : "rgb(203 213 225)")};
`

const SectionTitle = styled.h4`
  font-weight: 700;
  color: rgb(15 23 42);
  font-size: 1rem;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`

const SectionContent = styled.div`
  padding: 2rem 1.5rem;
  border: 2px solid rgb(226 232 240);
  border-top: none;
  border-radius: 0 0 0.75rem 0.75rem;
  background: rgb(249 250 251);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const FieldGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.$columns || 3}, 1fr);
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.3s ease-out;
`

const InputLabel = styled.label<{ $required?: boolean }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(51 65 85);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.$required &&
    `
    &::after {
      content: '*';
      color: rgb(239 68 68);
      font-size: 1rem;
    }
  `}
`

const InputIconWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledDollarIcon = styled(DollarSign)`
  width: 1rem;
  height: 1rem;
  color: rgb(100 116 139);
`

const StyledPercentIcon = styled(Percent)`
  width: 1rem;
  height: 1rem;
  color: rgb(100 116 139);
`

const StyledCalculatorIcon = styled(Calculator)`
  width: 1rem;
  height: 1rem;
  color: rgb(100 116 139);
`

const StyledInput = styled.input<{ $error?: boolean; $readOnly?: boolean; $success?: boolean }>`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid ${(props) => {
    if (props.$error) return "rgb(239 68 68)"
    if (props.$success) return "rgb(34 197 94)"
    return "rgb(226 232 240)"
  }};
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgb(15 23 42);
  background: ${(props) => (props.$readOnly ? "rgb(241 245 249)" : "white")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${(props) => (props.$readOnly ? "not-allowed" : "text")};

  &:focus {
    outline: none;
    border-color: ${(props) => {
      if (props.$error) return "rgb(239 68 68)"
      if (props.$success) return "rgb(34 197 94)"
      return "rgb(37 99 235)"
    }};
    box-shadow: 0 0 0 3px ${(props) => {
      if (props.$error) return "rgb(239 68 68 / 0.1)"
      if (props.$success) return "rgb(34 197 94 / 0.1)"
      return "rgb(37 99 235 / 0.1)"
    }};
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgb(148 163 184);
  }

  ${(props) =>
    props.$success &&
    `
    animation: ${successPulse} 0.6s ease-out;
  `}
`

const InputHelperText = styled.span<{ $error?: boolean; $success?: boolean }>`
  font-size: 0.8125rem;
  color: ${(props) => {
    if (props.$error) return "rgb(239 68 68)"
    if (props.$success) return "rgb(34 197 94)"
    return "rgb(100 116 139)"
  }};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`

const StyledAlertIcon = styled(AlertCircle)`
  width: 0.875rem;
  height: 0.875rem;
`

const StyledCheckCircleIcon = styled(CheckCircle2)`
  width: 0.875rem;
  height: 0.875rem;
`

const ProgressContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 2px solid rgb(226 232 240);
`

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

const ProgressLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(51 65 85);
`

const ProgressPercentage = styled.span<{ $complete?: boolean }>`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${(props) => (props.$complete ? "rgb(34 197 94)" : "rgb(37 99 235)")};
`

const ProgressBar = styled.div`
  width: 100%;
  height: 0.75rem;
  background: rgb(226 232 240);
  border-radius: 9999px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${(props) => props.$percentage}%;
  background: linear-gradient(90deg, rgb(37 99 235), rgb(59 130 246));
  border-radius: 9999px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${slideIn} 1.5s ease-in-out infinite;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid rgb(226 232 240);
`

const SubmitButton = styled.button<{ $disabled?: boolean }>`
  padding: 1rem 3rem;
  background: ${(props) =>
    props.$disabled ? "rgb(203 213 225)" : "linear-gradient(135deg, rgb(37 99 235), rgb(29 78 216))"};
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) => (props.$disabled ? "none" : "0 4px 6px -1px rgb(37 99 235 / 0.4)")};
  letter-spacing: 0.025em;
  opacity: ${(props) => (props.$disabled ? "0.6" : "1")};

  &:hover {
    background: ${(props) =>
      props.$disabled ? "rgb(203 213 225)" : "linear-gradient(135deg, rgb(29 78 216), rgb(30 64 175))"};
    transform: ${(props) => (props.$disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) => (props.$disabled ? "none" : "0 10px 15px -3px rgb(37 99 235 / 0.5)")};
  }

  &:active {
    transform: ${(props) => (props.$disabled ? "none" : "translateY(0)")};
    box-shadow: ${(props) => (props.$disabled ? "none" : "0 4px 6px -1px rgb(37 99 235 / 0.4)")};
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 0.875rem 2rem;
  }
`

const DESTINATIONS = {
  boston: [
    { id: 1, name: "Franlin, NH", distance: 95 },
    { id: 2, name: "Slatersville, RI", distance: 52 },
    { id: 3, name: "Augustas, GA", distance: 1100 },
    { id: 4, name: "Portland, ME", distance: 103 },
    { id: 5, name: "Hartford, CT", distance: 102 },
  ],
  atlanta: [
    { id: 1, name: "Birmingham, AL", distance: 147 },
    { id: 2, name: "Charlotte, NC", distance: 244 },
    { id: 3, name: "Nashville, TN", distance: 250 },
  ],
}

export default function BidPage() {
  const params = useParams()
  const router = useRouter()
  const city = params.city as string
  const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [formData, setFormData] = useState({
    baseRate: "",
    fsc: "",
    total: "",
    optional1: "",
    optional2: "",
    optional3: "",
    optional4: "",
    optional5: "",
    optional6: "",
    optional7: "",
    optional8: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const destinations = DESTINATIONS[city as keyof typeof DESTINATIONS] || DESTINATIONS.boston
  const selectedDest = destinations.find((d) => d.id === selectedDestination)

  const calculateProgress = () => {
    const requiredFields = ["baseRate", "fsc", "total"]
    const filledRequired = requiredFields.filter((field) => formData[field as keyof typeof formData]).length
    return Math.round((filledRequired / requiredFields.length) * 100)
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    setIsFavorite(favorites.includes(cityName))
  }, [cityName])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    let updatedFavorites

    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter((c: string) => c !== cityName)
    } else {
      updatedFavorites = [...favorites, cityName]
    }

    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites))
    setIsFavorite(!isFavorite)
  }

  useEffect(() => {
    const baseRate = Number.parseFloat(formData.baseRate) || 0
    const fsc = Number.parseFloat(formData.fsc) || 0

    if (baseRate > 0 && fsc >= 0) {
      const total = baseRate + baseRate * (fsc / 100)
      setFormData((prev) => ({ ...prev, total: total.toFixed(2) }))
    } else if (!formData.baseRate && !formData.fsc) {
      setFormData((prev) => ({ ...prev, total: "" }))
    }
  }, [formData.baseRate, formData.fsc])

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    if (name === "baseRate" || name === "fsc") {
      if (!value) {
        newErrors[name] = `${name === "baseRate" ? "Base rate" : "FSC"} is required`
      } else if (isNaN(Number(value))) {
        newErrors[name] = "Must be a valid number"
      } else if (Number(value) < 0) {
        newErrors[name] = "Must be a positive number"
      } else {
        delete newErrors[name]
      }
    }

    setErrors(newErrors)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleInputBlur = (name: string) => {
    setTouched({ ...touched, [name]: true })
    validateField(name, formData[name as keyof typeof formData])
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.baseRate) newErrors.baseRate = "Base rate is required"
    if (!formData.fsc) newErrors.fsc = "FSC is required"
    if (!formData.total) newErrors.total = "Total is required"

    if (formData.baseRate && isNaN(Number(formData.baseRate))) {
      newErrors.baseRate = "Must be a valid number"
    }
    if (formData.fsc && isNaN(Number(formData.fsc))) {
      newErrors.fsc = "Must be a valid number"
    }
    if (formData.total && isNaN(Number(formData.total))) {
      newErrors.total = "Must be a valid number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Bid submitted successfully!")
      router.push("/cities")
    }
  }

  const isFormValid = formData.baseRate && formData.fsc && formData.total && Object.keys(errors).length === 0

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <LogoCircle>
            <StyledTruckIcon />
          </LogoCircle>
          <HeaderText>
            <HeaderTitle>Vendor Bid Portal</HeaderTitle>
            <HeaderSubtitle>Motor Carrier Services</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <BackButton onClick={() => router.push("/cities")}>
          <StyledArrowIcon />
          <span>Back to Cities</span>
        </BackButton>
      </Header>

      <Main>
        <Container>
          <HeroSection>
            <CityHeader>
              <CityInfo>
                <CityIconCircle>
                  <StyledMapIcon />
                </CityIconCircle>
                <CityTextContainer>
                  <CityLabel>Starting Route</CityLabel>
                  <CityName>{cityName.toUpperCase()}</CityName>
                </CityTextContainer>
              </CityInfo>
              <FavoriteButton
                onClick={toggleFavorite}
                $isFavorite={isFavorite}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <StyledStarIcon $filled={isFavorite} />
              </FavoriteButton>
            </CityHeader>
            <PageDescription>
              Select your destination from the sidebar and enter your competitive rates. All required fields must be
              completed before submission.
            </PageDescription>
          </HeroSection>

          <StepsContainer>
            <StepItem>
              <StepCircle $completed>
                <StyledCheckIcon />
              </StepCircle>
              <StepLabel>Pickup Location</StepLabel>
            </StepItem>
            <StepDivider />
            <StepItem>
              <StepCircle>2</StepCircle>
              <StepLabel $active>End Location & Rates</StepLabel>
            </StepItem>
          </StepsContainer>

          <GridContainer>
            <Sidebar>
              <SidebarTitle>Select Destination</SidebarTitle>
              <DestinationList>
                {destinations.map((dest) => (
                  <DestinationButton
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest.id)}
                    $selected={selectedDestination === dest.id}
                  >
                    <DestinationName>{dest.name}</DestinationName>
                    <DestinationDistance>{dest.distance} miles</DestinationDistance>
                  </DestinationButton>
                ))}
              </DestinationList>
            </Sidebar>

            <FormCard>
              {!selectedDestination ? (
                <EmptyState>
                  <EmptyStateIcon>
                    <StyledMapPinIcon />
                  </EmptyStateIcon>
                  <EmptyStateTitle>No Destination Selected</EmptyStateTitle>
                  <EmptyStateText>
                    Please select a destination from the sidebar to begin entering your bid rates
                  </EmptyStateText>
                  <EmptyStateHint>
                    <StyledPackageIcon />
                    Choose from {destinations.length} available routes
                  </EmptyStateHint>
                </EmptyState>
              ) : (
                <>
                  <SelectedDestinationCard>
                    <DestinationInfo>
                      <DestinationIconCircle>
                        <StyledTrendingIcon />
                      </DestinationIconCircle>
                      <DestinationDetails>
                        <DestinationLabel>Destination</DestinationLabel>
                        <DestinationNameLarge>{selectedDest?.name}</DestinationNameLarge>
                      </DestinationDetails>
                    </DestinationInfo>
                    <DistanceBadge>{selectedDest?.distance} miles</DistanceBadge>
                  </SelectedDestinationCard>

                  <ProgressContainer>
                    <ProgressHeader>
                      <ProgressLabel>Form Completion</ProgressLabel>
                      <ProgressPercentage $complete={calculateProgress() === 100}>
                        {calculateProgress()}%
                      </ProgressPercentage>
                    </ProgressHeader>
                    <ProgressBar>
                      <ProgressFill $percentage={calculateProgress()} />
                    </ProgressBar>
                  </ProgressContainer>

                  <SectionContainer>
                    <SectionHeader $required>
                      <SectionTitle>Required Fields</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                      <FieldGrid $columns={3}>
                        <InputWrapper>
                          <InputLabel $required>
                            <InputIconWrapper>
                              <StyledDollarIcon />
                            </InputIconWrapper>
                            Base Rate
                          </InputLabel>
                          <StyledInput
                            type="text"
                            placeholder="0.00"
                            value={formData.baseRate}
                            onChange={(e) => handleInputChange("baseRate", e.target.value)}
                            onBlur={() => handleInputBlur("baseRate")}
                            $error={touched.baseRate && !!errors.baseRate}
                            $success={touched.baseRate && !!formData.baseRate && !errors.baseRate}
                          />
                          {touched.baseRate && errors.baseRate && (
                            <InputHelperText $error>
                              <StyledAlertIcon />
                              {errors.baseRate}
                            </InputHelperText>
                          )}
                          {touched.baseRate && formData.baseRate && !errors.baseRate && (
                            <InputHelperText $success>
                              <StyledCheckCircleIcon />
                              Looks good!
                            </InputHelperText>
                          )}
                        </InputWrapper>

                        <InputWrapper>
                          <InputLabel $required>
                            <InputIconWrapper>
                              <StyledPercentIcon />
                            </InputIconWrapper>
                            FSC
                          </InputLabel>
                          <StyledInput
                            type="text"
                            placeholder="0.00"
                            value={formData.fsc}
                            onChange={(e) => handleInputChange("fsc", e.target.value)}
                            onBlur={() => handleInputBlur("fsc")}
                            $error={touched.fsc && !!errors.fsc}
                            $success={touched.fsc && !!formData.fsc && !errors.fsc}
                          />
                          {touched.fsc && errors.fsc && (
                            <InputHelperText $error>
                              <StyledAlertIcon />
                              {errors.fsc}
                            </InputHelperText>
                          )}
                          {touched.fsc && formData.fsc && !errors.fsc && (
                            <InputHelperText $success>
                              <StyledCheckCircleIcon />
                              Looks good!
                            </InputHelperText>
                          )}
                        </InputWrapper>

                        <InputWrapper>
                          <InputLabel $required>
                            <InputIconWrapper>
                              <StyledCalculatorIcon />
                            </InputIconWrapper>
                            Total
                          </InputLabel>
                          <StyledInput
                            type="text"
                            value={formData.total}
                            readOnly
                            $error={!!errors.total}
                            $success={!!formData.total && !errors.total}
                          />
                          <InputHelperText>Auto-calculated: Base Rate + FSC%</InputHelperText>
                        </InputWrapper>
                      </FieldGrid>
                    </SectionContent>
                  </SectionContainer>

                  <SectionContainer>
                    <SectionHeader>
                      <SectionTitle>Optional Fields</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                      <FieldGrid $columns={4}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <InputWrapper key={num}>
                            <InputLabel>Optional #{num}</InputLabel>
                            <StyledInput
                              type="text"
                              placeholder="Enter value"
                              value={formData[`optional${num}` as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [`optional${num}`]: e.target.value })}
                            />
                          </InputWrapper>
                        ))}
                      </FieldGrid>
                    </SectionContent>
                  </SectionContainer>

                  <ButtonContainer>
                    <SubmitButton onClick={handleSubmit} $disabled={!isFormValid}>
                      Submit Bid
                    </SubmitButton>
                  </ButtonContainer>
                </>
              )}
            </FormCard>
          </GridContainer>
        </Container>
      </Main>
    </PageContainer>
  )
}
