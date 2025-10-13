"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import styled from "styled-components"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  TableSortLabel,
} from "@mui/material"
import { Truck, LogOut, Search, Download } from "lucide-react"

const DESTINATIONS: Record<string, Record<number, string>> = {
  boston: {
    1: "Franlin, NH",
    2: "Slatersville, RI",
    3: "Augustas, GA",
    4: "Portland, ME",
    5: "Hartford, CT",
  },
  atlanta: {
    1: "Birmingham, AL",
    2: "Charlotte, NC",
    3: "Nashville, TN",
  },
  philadelphia: {
    1: "New York, NY",
    2: "Baltimore, MD",
    3: "Washington, DC",
  },
}

interface RateData {
  id: string
  vendorId: string
  vendorEmail: string
  startCity: string
  endCity: string
  baseRate: number
  fsc: number
  total: number
  submittedAt: string
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, rgb(248 250 252), rgb(226 232 240));
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(226 232 240);
`

const HeaderContent = styled.div`
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

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin: 0;
`

const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  color: rgb(71 85 105);
  margin: 0;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StatusDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: rgb(34 197 94);
  border-radius: 50%;
`

const StatusText = styled.span`
  font-size: 0.875rem;
  color: rgb(71 85 105);
`

const Main = styled.main`
  flex: 1;
  padding: 1.5rem;
`

const Container = styled.div`
  max-width: 112rem;
  margin: 0 auto;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 3fr;
  }
`

const Sidebar = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1rem;
  border: 1px solid rgb(226 232 240);
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-y: auto;
`

const SidebarTitle = styled.h4`
  font-weight: 600;
  color: rgb(15 23 42);
  margin-bottom: 1rem;
`

const DestinationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
`

const DestinationButton = styled.button<{ $selected?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$selected ? "rgb(37 99 235)" : "rgb(241 245 249)")};
  color: ${(props) => (props.$selected ? "white" : "rgb(15 23 42)")};

  &:hover {
    background: ${(props) => (props.$selected ? "rgb(37 99 235)" : "rgb(226 232 240)")};
  }
`

const DestinationName = styled.div`
  font-weight: 500;
`

const DestinationCount = styled.div<{ $selected?: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => (props.$selected ? "rgb(191 219 254)" : "rgb(71 85 105)")};
`

const ContentCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  border: 1px solid rgb(226 232 240);
  height: 80vh;
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const CardHeaderText = styled.div`
  display: flex;
  flex-direction: column;
`

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin-bottom: 0.25rem;
`

const CardDescription = styled.p`
  color: rgb(71 85 105);
  margin: 0;
`

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`

const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: rgb(100 116 139);
`

const TableFooter = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgb(71 85 105);
`

const MOCK_RATES = [
  {
    id: 1,
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "Boston",
    endCity: "Franlin, NH",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-08 10:30 AM",
  },
  {
    id: 2,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Boston",
    endCity: "Slatersville, RI",
    baseRate: 320,
    fsc: 10.94,
    total: 355,
    submittedAt: "2025-01-08 11:15 AM",
  },
  {
    id: 3,
    vendorId: "MC-345678",
    vendorEmail: "vendor3@example.com",
    startCity: "Boston",
    endCity: "Augustas, GA",
    baseRate: 1800,
    fsc: 11.11,
    total: 2000,
    submittedAt: "2025-01-08 09:45 AM",
  },
  {
    id: 4,
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-07 02:20 PM",
  },
  {
    id: 5,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "Boston",
    endCity: "Portland, ME",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-08 01:10 PM",
  },
  {
    id: 6,
    vendorId: "MC-567890",
    vendorEmail: "vendor5@example.com",
    startCity: "Chicago",
    endCity: "Milwaukee, WI",
    baseRate: 220,
    fsc: 9.09,
    total: 240,
    submittedAt: "2025-01-08 03:45 PM",
  },
  {
    id: 7,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "Dallas",
    endCity: "Fort Worth, TX",
    baseRate: 150,
    fsc: 13.33,
    total: 170,
    submittedAt: "2025-01-08 02:30 PM",
  },
  {
    id: 8,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "Los Angeles",
    endCity: "San Diego, CA",
    baseRate: 340,
    fsc: 11.76,
    total: 380,
    submittedAt: "2025-01-07 04:15 PM",
  },
  {
    id: 9,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "Miami",
    endCity: "Tampa, FL",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-07 11:20 AM",
  },
  {
    id: 10,
    vendorId: "MC-678901",
    vendorEmail: "vendor9@example.com",
    startCity: "Seattle",
    endCity: "Portland, OR",
    baseRate: 290,
    fsc: 10.34,
    total: 320,
    submittedAt: "2025-01-08 08:50 AM",
  },
  {
    id: 11,
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "New York",
    endCity: "Philadelphia, PA",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-06 01:30 PM",
  },
  {
    id: 12,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Phoenix",
    endCity: "Tucson, AZ",
    baseRate: 260,
    fsc: 15.38,
    total: 300,
    submittedAt: "2025-01-06 10:45 AM",
  },
  {
    id: 13,
    vendorId: "MC-345678",
    vendorEmail: "vendor3@example.com",
    startCity: "Denver",
    endCity: "Colorado Springs, CO",
    baseRate: 190,
    fsc: 10.53,
    total: 210,
    submittedAt: "2025-01-07 09:15 AM",
  },
  {
    id: 14,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "Houston",
    endCity: "San Antonio, TX",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-05 03:20 PM",
  },
  {
    id: 15,
    vendorId: "MC-567890",
    vendorEmail: "vendor5@example.com",
    startCity: "Boston",
    endCity: "Providence, RI",
    baseRate: 140,
    fsc: 14.29,
    total: 160,
    submittedAt: "2025-01-08 12:40 PM",
  },
  {
    id: 16,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "Boston",
    endCity: "Worcester, MA",
    baseRate: 210,
    fsc: 9.52,
    total: 230,
    submittedAt: "2025-01-08 04:20 PM",
  },
  {
    id: 17,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "Boston",
    endCity: "Hartford, CT",
    baseRate: 270,
    fsc: 11.11,
    total: 300,
    submittedAt: "2025-01-07 08:30 AM",
  },
  {
    id: 18,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "Chicago",
    endCity: "Indianapolis, IN",
    baseRate: 350,
    fsc: 11.43,
    total: 390,
    submittedAt: "2025-01-08 10:15 AM",
  },
  {
    id: 19,
    vendorId: "MC-678901",
    vendorEmail: "vendor9@example.com",
    startCity: "Chicago",
    endCity: "Detroit, MI",
    baseRate: 480,
    fsc: 10.42,
    total: 530,
    submittedAt: "2025-01-07 01:45 PM",
  },
  {
    id: 20,
    vendorId: "MC-112233",
    vendorEmail: "vendor10@example.com",
    startCity: "Dallas",
    endCity: "Austin, TX",
    baseRate: 320,
    fsc: 12.5,
    total: 360,
    submittedAt: "2025-01-08 11:30 AM",
  },
  {
    id: 21,
    vendorId: "MC-445566",
    vendorEmail: "vendor11@example.com",
    startCity: "Dallas",
    endCity: "Houston, TX",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-07 03:10 PM",
  },
  {
    id: 22,
    vendorId: "MC-778899",
    vendorEmail: "vendor12@example.com",
    startCity: "Los Angeles",
    endCity: "Las Vegas, NV",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-08 09:20 AM",
  },
  {
    id: 23,
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "Los Angeles",
    endCity: "Phoenix, AZ",
    baseRate: 720,
    fsc: 11.11,
    total: 800,
    submittedAt: "2025-01-06 02:40 PM",
  },
  {
    id: 24,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Miami",
    endCity: "Orlando, FL",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-08 01:50 PM",
  },
  {
    id: 25,
    vendorId: "MC-345678",
    vendorEmail: "vendor3@example.com",
    startCity: "Miami",
    endCity: "Jacksonville, FL",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-07 10:25 AM",
  },
  {
    id: 26,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "Seattle",
    endCity: "Spokane, WA",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-08 08:15 AM",
  },
  {
    id: 27,
    vendorId: "MC-567890",
    vendorEmail: "vendor5@example.com",
    startCity: "Seattle",
    endCity: "Vancouver, BC",
    baseRate: 320,
    fsc: 12.5,
    total: 360,
    submittedAt: "2025-01-07 04:35 PM",
  },
  {
    id: 28,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "New York",
    endCity: "Boston, MA",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-08 02:10 PM",
  },
  {
    id: 29,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "New York",
    endCity: "Washington, DC",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-07 11:45 AM",
  },
  {
    id: 30,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "Phoenix",
    endCity: "Albuquerque, NM",
    baseRate: 630,
    fsc: 11.11,
    total: 700,
    submittedAt: "2025-01-08 09:55 AM",
  },
  {
    id: 31,
    vendorId: "MC-678901",
    vendorEmail: "vendor9@example.com",
    startCity: "Denver",
    endCity: "Salt Lake City, UT",
    baseRate: 720,
    fsc: 11.11,
    total: 800,
    submittedAt: "2025-01-06 03:30 PM",
  },
  {
    id: 32,
    vendorId: "MC-112233",
    vendorEmail: "vendor10@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-08 10:40 AM",
  },
  {
    id: 33,
    vendorId: "MC-445566",
    vendorEmail: "vendor11@example.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-07 01:20 PM",
  },
  {
    id: 34,
    vendorId: "MC-778899",
    vendorEmail: "vendor12@example.com",
    startCity: "Boston",
    endCity: "Burlington, VT",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-08 03:15 PM",
  },
  {
    id: 35,
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "Chicago",
    endCity: "St. Louis, MO",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-07 09:50 AM",
  },
  {
    id: 36,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Houston",
    endCity: "New Orleans, LA",
    baseRate: 630,
    fsc: 11.11,
    total: 700,
    submittedAt: "2025-01-08 11:05 AM",
  },
  {
    id: 37,
    vendorId: "MC-345678",
    vendorEmail: "vendor3@example.com",
    startCity: "San Francisco",
    endCity: "Sacramento, CA",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-07 02:25 PM",
  },
  {
    id: 38,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "San Francisco",
    endCity: "Los Angeles, CA",
    baseRate: 720,
    fsc: 11.11,
    total: 800,
    submittedAt: "2025-01-08 08:40 AM",
  },
  {
    id: 39,
    vendorId: "MC-567890",
    vendorEmail: "vendor5@example.com",
    startCity: "Portland",
    endCity: "Eugene, OR",
    baseRate: 220,
    fsc: 13.64,
    total: 250,
    submittedAt: "2025-01-07 04:55 PM",
  },
  {
    id: 40,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "Philadelphia",
    endCity: "Pittsburgh, PA",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-08 01:35 PM",
  },
  {
    id: 41,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "Boston",
    endCity: "Albany, NY",
    baseRate: 320,
    fsc: 12.5,
    total: 360,
    submittedAt: "2025-01-06 10:20 AM",
  },
  {
    id: 42,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "Boston",
    endCity: "Manchester, NH",
    baseRate: 190,
    fsc: 10.53,
    total: 210,
    submittedAt: "2025-01-08 12:15 PM",
  },
  {
    id: 43,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 295,
    fsc: 10.17,
    total: 325,
    submittedAt: "2025-01-08 09:15 AM",
  },
  {
    id: 44,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 270,
    fsc: 11.11,
    total: 300,
    submittedAt: "2025-01-07 03:45 PM",
  },
  {
    id: 45,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-08 11:20 AM",
  },
  {
    id: 46,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 440,
    fsc: 11.36,
    total: 490,
    submittedAt: "2025-01-07 02:10 PM",
  },
  {
    id: 47,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 460,
    fsc: 10.87,
    total: 510,
    submittedAt: "2025-01-08 08:30 AM",
  },
  {
    id: 48,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Atlanta",
    endCity: "Chattanooga, TN",
    baseRate: 220,
    fsc: 13.64,
    total: 250,
    submittedAt: "2025-01-08 01:45 PM",
  },
  {
    id: 49,
    vendorId: "MC-445566",
    vendorEmail: "vendor11@example.com",
    startCity: "Atlanta",
    endCity: "Chattanooga, TN",
    baseRate: 230,
    fsc: 13.04,
    total: 260,
    submittedAt: "2025-01-07 10:25 AM",
  },
  {
    id: 50,
    vendorId: "MC-778899",
    vendorEmail: "vendor12@example.com",
    startCity: "Atlanta",
    endCity: "Greenville, SC",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-08 03:50 PM",
  },
  {
    id: 51,
    vendorId: "MC-112233",
    vendorEmail: "vendor10@example.com",
    startCity: "Atlanta",
    endCity: "Greenville, SC",
    baseRate: 270,
    fsc: 11.11,
    total: 300,
    submittedAt: "2025-01-07 09:30 AM",
  },
  {
    id: 52,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Jacksonville, FL",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-08 02:15 PM",
  },
  {
    id: 53,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Jacksonville, FL",
    baseRate: 560,
    fsc: 10.71,
    total: 620,
    submittedAt: "2025-01-07 11:40 AM",
  },
  {
    id: 54,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Atlanta",
    endCity: "Knoxville, TN",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-08 10:05 AM",
  },
  {
    id: 55,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Atlanta",
    endCity: "Knoxville, TN",
    baseRate: 350,
    fsc: 11.43,
    total: 390,
    submittedAt: "2025-01-07 04:20 PM",
  },
  {
    id: 56,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Atlanta",
    endCity: "Memphis, TN",
    baseRate: 630,
    fsc: 11.11,
    total: 700,
    submittedAt: "2025-01-08 09:50 AM",
  },
  {
    id: 57,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Atlanta",
    endCity: "Memphis, TN",
    baseRate: 610,
    fsc: 11.48,
    total: 680,
    submittedAt: "2025-01-07 01:35 PM",
  },
  {
    id: 58,
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 400,
    fsc: 10.0,
    total: 440,
    submittedAt: "2025-01-08 12:25 PM",
  },
  {
    id: 59,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 390,
    fsc: 10.26,
    total: 430,
    submittedAt: "2025-01-07 08:15 AM",
  },
  {
    id: 60,
    vendorId: "MC-345678",
    vendorEmail: "vendor3@example.com",
    startCity: "Atlanta",
    endCity: "Savannah, GA",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-08 03:10 PM",
  },
  {
    id: 61,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "Atlanta",
    endCity: "Savannah, GA",
    baseRate: 440,
    fsc: 11.36,
    total: 490,
    submittedAt: "2025-01-07 10:55 AM",
  },
  {
    id: 62,
    vendorId: "MC-567890",
    vendorEmail: "vendor5@example.com",
    startCity: "Atlanta",
    endCity: "Tampa, FL",
    baseRate: 720,
    fsc: 11.11,
    total: 800,
    submittedAt: "2025-01-08 11:45 AM",
  },
]

export default function AdminRatesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCity = searchParams.get("city")

  const [searchTerm, setSearchTerm] = useState("")
  const [orderBy, setOrderBy] = useState<keyof RateData>("submittedAt")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [rates, setRates] = useState<RateData[]>([])

  useEffect(() => {
    const loadRates = () => {
      const submittedRates = JSON.parse(localStorage.getItem("submittedRates") || "{}")
      const ratesArray: RateData[] = []

      Object.entries(submittedRates).forEach(([key, value]: [string, any]) => {
        const [city, destId] = key.split("-")
        const cityName = city.charAt(0).toUpperCase() + city.slice(1)
        const destName = DESTINATIONS[city]?.[Number.parseInt(destId)] || "Unknown"

        const baseRate = Number.parseFloat(value.baseRate?.replace(/[^0-9.]/g, "") || "0")
        const fsc = Number.parseFloat(value.fsc?.replace(/[^0-9.]/g, "") || "0")
        const total = Number.parseFloat(value.total?.replace(/[^0-9.]/g, "") || "0")

        ratesArray.push({
          id: key,
          vendorId: "MC-123456", // Default vendor ID
          vendorEmail: "vendor@example.com", // Default email
          startCity: cityName,
          endCity: destName,
          baseRate,
          fsc,
          total,
          submittedAt: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        })
      })

      setRates(ratesArray)
    }

    loadRates()
  }, [])

  const handleSort = (property: keyof RateData) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const filteredRates = rates
    .filter((rate) => {
      const matchesCity = selectedCity ? rate.startCity.toLowerCase() === selectedCity.toLowerCase() : true
      const matchesDestination =
        selectedCity?.toLowerCase() === "atlanta" && selectedDestination ? rate.endCity === selectedDestination : true
      const matchesSearch =
        rate.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.startCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.endCity.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesCity && matchesDestination && matchesSearch
    })
    .sort((a, b) => {
      if (selectedCity?.toLowerCase() === "atlanta" && orderBy === "submittedAt") {
        const destCompare = a.endCity.localeCompare(b.endCity)
        if (destCompare !== 0) return destCompare
        return order === "asc" ? a.submittedAt.localeCompare(b.submittedAt) : b.submittedAt.localeCompare(a.submittedAt)
      }

      const aValue = a[orderBy]
      const bValue = b[orderBy]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

  const atlantaDestinations =
    selectedCity?.toLowerCase() === "atlanta"
      ? Array.from(new Set(rates.filter((r) => r.startCity.toLowerCase() === "atlanta").map((r) => r.endCity))).sort()
      : []

  const handleExport = () => {
    alert("Exporting rates to CSV...")
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <LogoCircle>
            <Truck style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
          </LogoCircle>
          <HeaderText>
            <HeaderTitle>Vendor Bid Portal</HeaderTitle>
            <HeaderSubtitle>Admin - Rate Management{selectedCity && ` - ${selectedCity}`}</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <HeaderActions>
          <StatusIndicator>
            <StatusDot />
            <StatusText>Admin Portal</StatusText>
          </StatusIndicator>
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push("/cities")}
            sx={{
              marginLeft: "0.5rem",
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
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogOut style={{ width: "1rem", height: "1rem" }} />}
            onClick={handleLogout}
            sx={{
              marginLeft: "0.5rem",
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
        </HeaderActions>
      </Header>

      <Main>
        <Container>
          {selectedCity?.toLowerCase() === "atlanta" ? (
            <GridContainer>
              <Sidebar>
                <SidebarTitle>Select Destination</SidebarTitle>
                <DestinationList>
                  <DestinationButton
                    onClick={() => setSelectedDestination(null)}
                    $selected={selectedDestination === null}
                  >
                    <DestinationName>All Destinations</DestinationName>
                    <DestinationCount $selected={selectedDestination === null}>
                      {rates.filter((r) => r.startCity.toLowerCase() === "atlanta").length} rates
                    </DestinationCount>
                  </DestinationButton>
                  {atlantaDestinations.map((dest) => {
                    const count = rates.filter(
                      (r) => r.startCity.toLowerCase() === "atlanta" && r.endCity === dest,
                    ).length
                    return (
                      <DestinationButton
                        key={dest}
                        onClick={() => setSelectedDestination(dest)}
                        $selected={selectedDestination === dest}
                      >
                        <DestinationName>{dest}</DestinationName>
                        <DestinationCount $selected={selectedDestination === dest}>
                          {count} {count === 1 ? "rate" : "rates"}
                        </DestinationCount>
                      </DestinationButton>
                    )
                  })}
                </DestinationList>
              </Sidebar>

              <ContentCard>
                <CardHeader>
                  <CardHeaderText>
                    <CardTitle>
                      Atlanta Vendor Rates
                      {selectedDestination && ` - ${selectedDestination}`}
                    </CardTitle>
                    <CardDescription>
                      {selectedDestination
                        ? `Viewing rates for ${selectedDestination}`
                        : "Select a destination to view rates"}
                    </CardDescription>
                  </CardHeaderText>
                  <Button
                    variant="contained"
                    startIcon={<Download style={{ width: "1rem", height: "1rem" }} />}
                    onClick={handleExport}
                    sx={{
                      backgroundColor: "rgb(37 99 235)",
                      "&:hover": {
                        backgroundColor: "rgb(29 78 216)",
                      },
                    }}
                  >
                    Export to CSV
                  </Button>
                </CardHeader>

                <SearchContainer>
                  <TextField
                    fullWidth
                    placeholder="Search by vendor ID, email, or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ width: "1.25rem", height: "1.25rem", color: "rgb(156 163 175)" }} />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </SearchContainer>

                <TableWrapper>
                  <TableContainer component={Paper} variant="outlined" sx={{ height: "100%" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "rgb(248 250 252)" }}>
                          <TableCell sx={{ fontWeight: 700 }}>
                            <TableSortLabel
                              active={orderBy === "vendorId"}
                              direction={orderBy === "vendorId" ? order : "asc"}
                              onClick={() => handleSort("vendorId")}
                            >
                              Vendor ID
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>
                            <TableSortLabel
                              active={orderBy === "vendorEmail"}
                              direction={orderBy === "vendorEmail" ? order : "asc"}
                              onClick={() => handleSort("vendorEmail")}
                            >
                              Email
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>
                            <TableSortLabel
                              active={orderBy === "endCity"}
                              direction={orderBy === "endCity" ? order : "asc"}
                              onClick={() => handleSort("endCity")}
                            >
                              Destination
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>
                            <TableSortLabel
                              active={orderBy === "submittedAt"}
                              direction={orderBy === "submittedAt" ? order : "asc"}
                              onClick={() => handleSort("submittedAt")}
                            >
                              Submitted
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="right">
                            <TableSortLabel
                              active={orderBy === "baseRate"}
                              direction={orderBy === "baseRate" ? order : "asc"}
                              onClick={() => handleSort("baseRate")}
                            >
                              Base Rate
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="right">
                            <TableSortLabel
                              active={orderBy === "fsc"}
                              direction={orderBy === "fsc" ? order : "asc"}
                              onClick={() => handleSort("fsc")}
                            >
                              FSC %
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }} align="right">
                            <TableSortLabel
                              active={orderBy === "total"}
                              direction={orderBy === "total" ? order : "asc"}
                              onClick={() => handleSort("total")}
                            >
                              Total
                            </TableSortLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredRates.map((rate) => (
                          <TableRow key={rate.id} hover>
                            <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                              {rate.vendorId}
                            </TableCell>
                            <TableCell>{rate.vendorEmail}</TableCell>
                            <TableCell>{rate.endCity}</TableCell>
                            <TableCell sx={{ fontSize: "0.875rem", color: "rgb(71 85 105)" }}>
                              {rate.submittedAt}
                            </TableCell>
                            <TableCell align="right">${rate.baseRate.toFixed(2)}</TableCell>
                            <TableCell align="right">{rate.fsc.toFixed(2)}%</TableCell>
                            <TableCell align="right">
                              <span style={{ fontWeight: 700, color: "rgb(37 99 235)" }}>${rate.total.toFixed(2)}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableWrapper>

                {filteredRates.length === 0 && <EmptyState>No rates found matching your search criteria</EmptyState>}

                <TableFooter>Showing {filteredRates.length} rates</TableFooter>
              </ContentCard>
            </GridContainer>
          ) : (
            <ContentCard>
              <CardHeader>
                <CardHeaderText>
                  <CardTitle>{selectedCity ? `${selectedCity} Vendor Rates` : "All Vendor Rates"}</CardTitle>
                  <CardDescription>
                    {selectedCity
                      ? `View and manage bids starting from ${selectedCity}`
                      : "View and manage all submitted vendor bids"}
                  </CardDescription>
                </CardHeaderText>
                <Button
                  variant="contained"
                  startIcon={<Download style={{ width: "1rem", height: "1rem" }} />}
                  onClick={handleExport}
                  sx={{
                    backgroundColor: "rgb(37 99 235)",
                    "&:hover": {
                      backgroundColor: "rgb(29 78 216)",
                    },
                  }}
                >
                  Export to CSV
                </Button>
              </CardHeader>

              <SearchContainer>
                <TextField
                  fullWidth
                  placeholder="Search by vendor ID, email, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search style={{ width: "1.25rem", height: "1.25rem", color: "rgb(156 163 175)" }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </SearchContainer>

              <TableWrapper>
                <TableContainer component={Paper} variant="outlined">
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgb(248 250 252)" }}>
                        <TableCell sx={{ fontWeight: 700 }}>
                          <TableSortLabel
                            active={orderBy === "vendorId"}
                            direction={orderBy === "vendorId" ? order : "asc"}
                            onClick={() => handleSort("vendorId")}
                          >
                            Vendor ID
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          <TableSortLabel
                            active={orderBy === "vendorEmail"}
                            direction={orderBy === "vendorEmail" ? order : "asc"}
                            onClick={() => handleSort("vendorEmail")}
                          >
                            Email
                          </TableSortLabel>
                        </TableCell>
                        {!selectedCity && (
                          <TableCell sx={{ fontWeight: 700 }}>
                            <TableSortLabel
                              active={orderBy === "startCity"}
                              direction={orderBy === "startCity" ? order : "asc"}
                              onClick={() => handleSort("startCity")}
                            >
                              Start City
                            </TableSortLabel>
                          </TableCell>
                        )}
                        <TableCell sx={{ fontWeight: 700 }}>
                          <TableSortLabel
                            active={orderBy === "endCity"}
                            direction={orderBy === "endCity" ? order : "asc"}
                            onClick={() => handleSort("endCity")}
                          >
                            Destination
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          <TableSortLabel
                            active={orderBy === "submittedAt"}
                            direction={orderBy === "submittedAt" ? order : "asc"}
                            onClick={() => handleSort("submittedAt")}
                          >
                            Submitted
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          <TableSortLabel
                            active={orderBy === "baseRate"}
                            direction={orderBy === "baseRate" ? order : "asc"}
                            onClick={() => handleSort("baseRate")}
                          >
                            Base Rate
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          <TableSortLabel
                            active={orderBy === "fsc"}
                            direction={orderBy === "fsc" ? order : "asc"}
                            onClick={() => handleSort("fsc")}
                          >
                            FSC %
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          <TableSortLabel
                            active={orderBy === "total"}
                            direction={orderBy === "total" ? order : "asc"}
                            onClick={() => handleSort("total")}
                          >
                            Total
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRates.map((rate) => (
                        <TableRow key={rate.id} hover>
                          <TableCell sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>{rate.vendorId}</TableCell>
                          <TableCell>{rate.vendorEmail}</TableCell>
                          {!selectedCity && (
                            <TableCell>
                              <span style={{ fontWeight: 500 }}>{rate.startCity}</span>
                            </TableCell>
                          )}
                          <TableCell>{rate.endCity}</TableCell>
                          <TableCell sx={{ fontSize: "0.875rem", color: "rgb(71 85 105)" }}>
                            {rate.submittedAt}
                          </TableCell>
                          <TableCell align="right">${rate.baseRate.toFixed(2)}</TableCell>
                          <TableCell align="right">{rate.fsc.toFixed(2)}%</TableCell>
                          <TableCell align="right">
                            <span style={{ fontWeight: 700, color: "rgb(37 99 235)" }}>${rate.total.toFixed(2)}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableWrapper>

              {filteredRates.length === 0 && <EmptyState>No rates found matching your search criteria</EmptyState>}

              <TableFooter>
                Showing {filteredRates.length} of {rates.length} total rates
              </TableFooter>
            </ContentCard>
          )}
        </Container>
      </Main>
    </PageContainer>
  )
}
