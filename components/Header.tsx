"use client"

import { useRouter, usePathname } from "next/navigation"
import styled from "styled-components"
import { Truck, ArrowLeft, LogOut } from "lucide-react"

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid oklch(0.92 0 0);
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: oklch(0.5 0.15 250);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: oklch(0.2 0 0);
`

const SecureIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: oklch(0.98 0 0);
  border-radius: 6px;
  font-size: 13px;
  color: oklch(0.5 0 0);
  
  svg {
    width: 14px;
    height: 14px;
    color: oklch(0.6 0.15 145);
    flex-shrink: 0;
  }
`

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  background: oklch(0.6 0.15 145);
  border-radius: 50%;
  flex-shrink: 0;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: oklch(0.3 0 0);
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background: oklch(0.98 0 0);
    border-color: oklch(0.88 0 0);
  }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: oklch(0.5 0.15 250);
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background: oklch(0.45 0.15 250);
  }
`

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const showBackButton = pathname !== "/cities"

  const handleBack = () => {
    router.back()
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleLogoClick = () => {
    router.push("/cities")
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <Logo onClick={handleLogoClick}>
            <LogoIcon>
              <Truck />
            </LogoIcon>
            <LogoText>VendorBid</LogoText>
          </Logo>

          <SecureIndicator>
            <StatusDot />
            <span>Secure Portal</span>
          </SecureIndicator>
        </LeftSection>

        <RightSection>
          {showBackButton && (
            <BackButton onClick={handleBack}>
              <ArrowLeft />
              Back
            </BackButton>
          )}
          <LogoutButton onClick={handleLogout}>
            <LogOut />
            Logout
          </LogoutButton>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  )
}
