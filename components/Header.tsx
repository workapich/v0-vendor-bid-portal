"use client"

import styled from "styled-components"
import { Truck, LogOut, ArrowLeft } from "lucide-react"
import { Button } from "@mui/material"

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-between;
  border-bottom: 1px solid rgb(226 232 240);
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LogoCircle = styled.div`
  width: 3rem;
  height: 3rem;
  background: rgb(37 99 235);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin: 0;
`

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: rgb(71 85 105);
  margin: 0;
`

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgb(22 163 74);
`

const StatusDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: rgb(22 163 74);
  border-radius: 50%;
`

interface HeaderProps {
  subtitle?: string
  showBackButton?: boolean
  showLogoutButton?: boolean
  onBack?: () => void
  onLogout?: () => void
}

export default function Header({
  subtitle = "Motor Carrier Services",
  showBackButton = false,
  showLogoutButton = false,
  onBack,
  onLogout,
}: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoSection>
        <LogoCircle>
          <Truck className="w-6 h-6 text-white" />
        </LogoCircle>
        <TitleSection>
          <Title>Vendor Bid Portal</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleSection>
      </LogoSection>
      <ActionsSection>
        <StatusIndicator>
          <StatusDot />
          Secure Portal
        </StatusIndicator>
        {showBackButton && onBack && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBack}
            sx={{
              borderColor: "rgb(148 163 184)",
              color: "rgb(71 85 105)",
              "&:hover": {
                borderColor: "rgb(100 116 139)",
                backgroundColor: "rgb(248 250 252)",
              },
            }}
          >
            Back to Cities
          </Button>
        )}
        {showLogoutButton && onLogout && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogOut className="w-4 h-4" />}
            onClick={onLogout}
            sx={{
              borderColor: "rgb(148 163 184)",
              color: "rgb(71 85 105)",
              "&:hover": {
                borderColor: "rgb(100 116 139)",
                backgroundColor: "rgb(248 250 252)",
              },
            }}
          >
            Logout
          </Button>
        )}
      </ActionsSection>
    </HeaderContainer>
  )
}
