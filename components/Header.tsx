"use client";

import styled from "styled-components";
import { Truck, LogOut, ArrowLeft, Users } from "lucide-react";
import { Button } from "@mui/material";

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(226 232 240);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoCircle = styled.div`
  width: 3rem;
  height: 3rem;
  background: rgb(37 99 235);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const StyledTruckIcon = styled(Truck)`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: rgb(71 85 105);
  margin: 0;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ManageVendorsLink = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgb(37 99 235), rgb(29 78 216));
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, rgb(29 78 216), rgb(30 64 175));
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgb(22 163 74);
  font-weight: 500;
`;

const StatusDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: rgb(22 163 74);
  border-radius: 50%;
  flex-shrink: 0;
`;

const StyledArrowLeftIcon = styled(ArrowLeft)`
  width: 1rem;
  height: 1rem;
`;

const StyledLogOutIcon = styled(LogOut)`
  width: 1rem;
  height: 1rem;
`;

const StyledButton = styled(Button)`
  border-color: rgb(148 163 184);
  color: rgb(71 85 105);

  &:hover {
    border-color: rgb(100 116 139);
    background-color: rgb(248 250 252);
  }
`;

interface HeaderProps {
  subtitle?: string;
  showBackButton?: boolean;
  showLogoutButton?: boolean;
  showManageVendors?: boolean;
  onBack?: () => void;
  onLogout?: () => void;
  onManageVendors?: () => void;
}

export default function Header({
  subtitle = "Motor Carrier Services",
  showBackButton = false,
  showLogoutButton = false,
  showManageVendors = false,
  onBack,
  onLogout,
  onManageVendors,
}: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoSection>
        <LogoCircle>
          <StyledTruckIcon />
        </LogoCircle>
        <TitleSection>
          <Title>Vendor Bid Portal</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleSection>
      </LogoSection>
      <ActionsSection>
        {showManageVendors && onManageVendors && (
          <ManageVendorsLink onClick={onManageVendors}>
            <Users style={{ width: "1rem", height: "1rem" }} />
            Manage Vendors
          </ManageVendorsLink>
        )}
        {showBackButton && onBack && (
          <StyledButton
            variant="outlined"
            size="small"
            startIcon={<StyledArrowLeftIcon />}
            onClick={onBack}
          >
            Back to Cities
          </StyledButton>
        )}
        {showLogoutButton && onLogout && (
          <StyledButton
            variant="outlined"
            size="small"
            startIcon={<StyledLogOutIcon />}
            onClick={onLogout}
          >
            Logout
          </StyledButton>
        )}
      </ActionsSection>
    </HeaderContainer>
  );
}
