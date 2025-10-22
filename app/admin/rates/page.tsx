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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  DialogContentText,
} from "@mui/material"
import { Truck, LogOut, Search, Plus, ChevronDown, ChevronRight, MapPin } from "lucide-react"

// Mock data for US cities, needed for Autocomplete
const US_CITIES = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "Charlotte, NC",
  "San Francisco, CA",
  "Indianapolis, IN",
  "Seattle, WA",
  "Denver, CO",
  "Washington, DC",
  "Boston, MA",
  "El Paso, TX",
  "Nashville, TN",
  "Detroit, MI",
  "Oklahoma City, OK",
  "Portland, OR",
  "Las Vegas, NV",
  "Memphis, TN",
  "Louisville, KY",
  "Baltimore, MD",
  "Milwaukee, WI",
  "Albuquerque, NM",
  "Tucson, AZ",
  "Fresno, CA",
  "Sacramento, CA",
  "Kansas City, MO",
  "Atlanta, GA",
  "Colorado Springs, CO",
  "Omaha, NE",
  "Raleigh, NC",
  "Miami, FL",
  "Oakland, CA",
  "Minneapolis, MN",
  "Tulsa, OK",
  "Cleveland, OH",
  "Wichita, KS",
  "Arlington, TX",
  "New Orleans, LA",
  "Bakersfield, CA",
  "Tampa, FL",
  "Aurora, CO",
  "Honolulu, HI",
  "Anaheim, CA",
  "Santa Ana, CA",
  "St. Louis, MO",
  "Riverside, CA",
  "Corpus Christi, TX",
  "Lexington, KY",
  "Pittsburgh, PA",
  "Anchorage, AK",
  "Stockton, CA",
  "Cincinnati, OH",
  "St. Paul, MN",
  "Toledo, OH",
  "Newark, NJ",
  "Greensboro, NC",
  "Chandler, AZ",
  "Plano, TX",
  "Lincoln, NE",
  "Orlando, FL",
  "Irvine, CA",
  "Newark, CA",
  "Durham, NC",
  "Chula Vista, CA",
  "Fort Wayne, IN",
  "Jersey City, NJ",
  "St. Petersburg, FL",
  "Laredo, TX",
  "Buffalo, NY",
  "Madison, WI",
  "Lubbock, TX",
  "Scottsdale, AZ",
  "Reno, NV",
  "Glendale, AZ",
  "Norfolk, VA",
  "Baton Rouge, LA",
  "Boise, ID",
  "Hialeah, FL",
  "Gilbert, AZ",
  "Chesapeake, VA",
  "Irving, TX",
  "San Bernardino, CA",
  "Fremont, CA",
  "Spokane, WA",
  "San Francisco, CA",
  "Richmond, VA",
  "Des Moines, IA",
  "Tacoma, WA",
  "San Jose, CA",
  "Fontana, CA",
  "Modesto, CA",
  "Salt Lake City, UT",
  "Santa Clarita, CA",
  "Birmingham, AL",
  "Akron, OH",
  "Worcester, MA",
  "Knoxville, TN",
  "Oxnard, CA",
  "Augusta, GA",
  "Manchester, NH",
  "Fort Lauderdale, FL",
  "Fayetteville, NC",
  "Springfield, MA",
  "Rochester, NY",
  "Little Rock, AR",
  "Moreno Valley, CA",
  "Renton, WA",
  "Long Beach, CA",
  "Oceanside, CA",
  "Davis, CA",
  "New Haven, CT",
  "Columbia, SC",
  "Springfield, MO",
  "Vancouver, BC",
  "Salem, OR",
  "Fort Collins, CO",
  "Alexandria, VA",
  "Knoxville, TN",
  "Chattanooga, TN",
  "Santa Barbara, CA",
  "Flagstaff, AZ",
  "Boulder, CO",
  "San Jose, CA",
  "Oakland, CA",
  "Fort Lauderdale, FL",
  "Key West, FL",
  "Savannah, GA",
  "Greenville, SC",
  "Pittsburgh, PA",
  "Burlington, VT",
  "Albany, NY",
  "Manchester, NH",
  "Colorado Springs, CO",
  "Minneapolis, MN",
  "Orlando, FL",
  "Eugene, OR",
  "New Orleans, LA",
  "San Antonio, TX",
  "Austin, TX",
  "Houston, TX",
  "Philadelphia, PA",
  "Baltimore, MD",
  "Washington, DC",
  "New York, NY",
  "Boston, MA",
  "Providence, RI",
  "Hartford, CT",
  "Franlin, NH",
  "Slatersville, RI",
  "Augustas, GA",
  "Portland, ME",
]

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
  optional1?: string
  optional2?: string
  optional3?: string
  optional4?: string
  optional5?: string
  optional6?: string
  optional7?: string
  optional8?: string
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    rgb(248 250 252),
    rgb(226 232 240)
  );
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

// Modified Header to use flex layout for children
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

// Renamed LogoCircle to Logo and adjusted styling
const Logo = styled.div`
  width: 3rem;
  height: 3rem;
  background: rgb(37 99 235);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  color: white;
`

// Renamed HeaderText to HeaderTitle and adjusted styling
const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    color: rgb(15 23 42);
    margin: 0;
  }
  p {
    font-size: 0.875rem;
    color: rgb(71 85 105);
    margin: 0;
  }
`

// Renamed HeaderActions to HeaderActions
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Created a styled component for the CitySelector dropdown
const CitySelector = styled.select`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid rgb(203 213 225);
  background-color: rgb(255 255 255);
  font-size: 0.875rem;
  color: rgb(71 85 105);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(148 163 184);
  }

  &:focus {
    outline: none;
    border-color: rgb(59 130 246);
    ring: 2px solid rgb(59 130 246);
    ring-offset: 2px;
  }
`

// Created a styled component for the ActionButton
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid rgb(203 213 225);
  background-color: rgb(255 255 255);
  font-size: 0.875rem;
  color: rgb(71 85 105);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(148 163 184);
    background-color: rgb(248 250 252);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
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

const AddDestinationCard = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px dashed #2563eb;
  background: #eff6ff;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 1rem;

  &:hover {
    background: #dbeafe;
    border-color: #1d4ed8;
  }

  svg {
    flex-shrink: 0;
  }
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
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Boston",
    endCity: "Providence, RI",
    baseRate: 320,
    fsc: 12.5,
    total: 360,
    submittedAt: "2025-01-09 08:15 AM",
  },
  {
    id: 3,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Boston",
    endCity: "Hartford, CT",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-09 11:45 AM",
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
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 480,
    fsc: 12.5,
    total: 540,
    submittedAt: "2025-01-10 09:30 AM",
  },
  {
    id: 6,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Jacksonville, FL",
    baseRate: 630,
    fsc: 11.11,
    total: 700,
    submittedAt: "2025-01-10 02:15 PM",
  },
  {
    id: 7,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "Philadelphia",
    endCity: "Baltimore, MD",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-08 11:15 AM",
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "New York",
    endCity: "Boston, MA",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-11 10:20 AM",
  },
  {
    id: 13,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "New York",
    endCity: "Washington, DC",
    baseRate: 405,
    fsc: 11.11,
    total: 450,
    submittedAt: "2025-01-11 03:45 PM",
  },
  {
    id: 14,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Chicago",
    endCity: "Milwaukee, WI",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-08 09:45 AM",
  },
  {
    id: 15,
    vendorId: "MC-567890",
    vendorEmail: "vendor5@example.com",
    startCity: "Boston",
    endCity: "Portland, ME",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-08 01:10 PM",
  },
  {
    id: 16,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "Chicago",
    endCity: "Milwaukee, WI",
    baseRate: 220,
    fsc: 9.09,
    total: 240,
    submittedAt: "2025-01-08 03:45 PM",
  },
  {
    id: 17,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "Dallas",
    endCity: "Fort Worth, TX",
    baseRate: 150,
    fsc: 13.33,
    total: 170,
    submittedAt: "2025-01-08 02:30 PM",
  },
  {
    id: 18,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "Los Angeles",
    endCity: "San Diego, CA",
    baseRate: 340,
    fsc: 11.76,
    total: 380,
    submittedAt: "2025-01-07 04:15 PM",
  },
  {
    id: 19,
    vendorId: "MC-678901",
    vendorEmail: "vendor9@example.com",
    startCity: "Miami",
    endCity: "Tampa, FL",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-07 11:20 AM",
  },
  {
    id: 20,
    vendorId: "MC-112233",
    vendorEmail: "vendor10@example.com",
    startCity: "Seattle",
    endCity: "Portland, OR",
    baseRate: 290,
    fsc: 10.34,
    total: 320,
    submittedAt: "2025-01-08 08:50 AM",
  },
  {
    id: 21,
    vendorId: "MC-445566",
    vendorEmail: "vendor11@example.com",
    startCity: "New York",
    endCity: "Philadelphia, PA",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-06 01:30 PM",
  },
  {
    id: 22,
    vendorId: "MC-778899",
    vendorEmail: "vendor12@example.com",
    startCity: "Phoenix",
    endCity: "Tucson, AZ",
    baseRate: 260,
    fsc: 15.38,
    total: 300,
    submittedAt: "2025-01-06 10:45 AM",
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
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Los Angeles",
    endCity: "San Diego, CA",
    baseRate: 225,
    fsc: 11.11,
    total: 250,
    submittedAt: "2025-01-12 08:30 AM",
  },
  {
    id: 25,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Los Angeles",
    endCity: "Las Vegas, NV",
    baseRate: 495,
    fsc: 11.11,
    total: 550,
    submittedAt: "2025-01-12 01:15 PM",
  },
  {
    id: 26,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Miami",
    endCity: "Orlando, FL",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-08 10:20 AM",
  },
  {
    id: 27,
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
    id: 28,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "Seattle",
    endCity: "Spokane, WA",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-08 08:15 AM",
  },
  {
    id: 29,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "Seattle",
    endCity: "Vancouver, BC",
    baseRate: 320,
    fsc: 12.5,
    total: 360,
    submittedAt: "2025-01-07 04:35 PM",
  },
  {
    id: 30,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "New York",
    endCity: "Boston, MA",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-08 02:10 PM",
  },
  {
    id: 31,
    vendorId: "MC-678901",
    vendorEmail: "vendor9@example.com",
    startCity: "New York",
    endCity: "Washington, DC",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-07 11:45 AM",
  },
  {
    id: 32,
    vendorId: "MC-112233",
    vendorEmail: "vendor10@example.com",
    startCity: "Phoenix",
    endCity: "Albuquerque, NM",
    baseRate: 630,
    fsc: 11.11,
    total: 700,
    submittedAt: "2025-01-08 09:55 AM",
  },
  {
    id: 33,
    vendorId: "MC-445566",
    vendorEmail: "vendor11@example.com",
    startCity: "Denver",
    endCity: "Salt Lake City, UT",
    baseRate: 720,
    fsc: 11.11,
    total: 800,
    submittedAt: "2025-01-06 03:30 PM",
  },
  {
    id: 34,
    vendorId: "MC-778899",
    vendorEmail: "vendor12@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-08 10:40 AM",
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
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Chicago",
    endCity: "Indianapolis, IN",
    baseRate: 315,
    fsc: 11.11,
    total: 350,
    submittedAt: "2025-01-13 09:00 AM",
  },
  {
    id: 37,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Chicago",
    endCity: "Detroit, MI",
    baseRate: 495,
    fsc: 11.11,
    total: 550,
    submittedAt: "2025-01-13 02:30 PM",
  },
  {
    id: 38,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Dallas",
    endCity: "Austin, TX",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-08 01:30 PM",
  },
  {
    id: 39,
    vendorId: "MC-345678",
    vendorEmail: "vendor3@example.com",
    startCity: "Dallas",
    endCity: "Houston, TX",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-07 03:10 PM",
  },
  {
    id: 40,
    vendorId: "MC-901234",
    vendorEmail: "vendor4@example.com",
    startCity: "Dallas",
    endCity: "San Antonio, TX",
    baseRate: 380,
    fsc: 10.53,
    total: 420,
    submittedAt: "2025-01-05 03:20 PM",
  },
  {
    id: 41,
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
    id: 42,
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
    id: 43,
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
    id: 44,
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
    id: 45,
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
    id: 46,
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
    id: 47,
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
    id: 48,
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
    id: 49,
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
    id: 50,
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
    id: 51,
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
    id: 52,
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
    id: 53,
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
    id: 54,
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
    id: 55,
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
    id: 56,
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
    id: 57,
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
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Dallas",
    endCity: "Houston, TX",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-14 10:45 AM",
  },
  {
    id: 60,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Dallas",
    endCity: "San Antonio, TX",
    baseRate: 495,
    fsc: 11.11,
    total: 550,
    submittedAt: "2025-01-14 03:20 PM",
  },
  {
    id: 61,
    vendorId: "MC-789012",
    vendorEmail: "vendor2@example.com",
    startCity: "Seattle",
    endCity: "Portland, OR",
    baseRate: 315,
    fsc: 11.11,
    total: 350,
    submittedAt: "2025-01-09 08:30 AM",
  },
  {
    id: 62,
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
    id: 63,
    vendorId: "MC-234567",
    vendorEmail: "vendor6@example.com",
    startCity: "Philadelphia",
    endCity: "New York, NY",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-08 09:30 AM",
  },
  {
    id: 64,
    vendorId: "MC-890123",
    vendorEmail: "vendor7@example.com",
    startCity: "Philadelphia",
    endCity: "New York, NY",
    baseRate: 175,
    fsc: 11.43,
    total: 195,
    submittedAt: "2025-01-07 02:15 PM",
  },
  {
    id: 65,
    vendorId: "MC-456789",
    vendorEmail: "vendor8@example.com",
    startCity: "Philadelphia",
    endCity: "Baltimore, MD",
    baseRate: 220,
    fsc: 10.91,
    total: 244,
    submittedAt: "2025-01-08 10:45 AM",
  },
  {
    id: 66,
    vendorId: "MC-678901",
    vendorEmail: "vendor9@example.com",
    startCity: "Philadelphia",
    endCity: "Baltimore, MD",
    baseRate: 215,
    fsc: 11.63,
    total: 240,
    submittedAt: "2025-01-07 03:20 PM",
  },
  {
    id: 67,
    vendorId: "MC-112233",
    vendorEmail: "vendor10@example.com",
    startCity: "Philadelphia",
    endCity: "Washington, DC",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-08 11:55 AM",
  },
  {
    id: 68,
    vendorId: "MC-445566",
    vendorEmail: "vendor11@example.com",
    startCity: "Philadelphia",
    endCity: "Washington, DC",
    baseRate: 275,
    fsc: 11.11,
    total: 305,
    submittedAt: "2025-01-07 08:40 AM",
  },
  {
    id: 69,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Boston",
    endCity: "Franlin, NH",
    baseRate: 460,
    fsc: 10.87,
    total: 510,
    submittedAt: "2025-01-09 09:20 AM",
  },
  {
    id: 70,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Boston",
    endCity: "Slatersville, RI",
    baseRate: 330,
    fsc: 12.12,
    total: 370,
    submittedAt: "2025-01-09 10:45 AM",
  },
  {
    id: 71,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Boston",
    endCity: "Portland, ME",
    baseRate: 390,
    fsc: 10.26,
    total: 430,
    submittedAt: "2025-01-09 02:15 PM",
  },
  {
    id: 72,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Boston",
    endCity: "Hartford, CT",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-09 11:30 AM",
  },
  {
    id: 73,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Boston",
    endCity: "Providence, RI",
    baseRate: 145,
    fsc: 13.79,
    total: 165,
    submittedAt: "2025-01-09 03:40 PM",
  },
  {
    id: 74,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Boston",
    endCity: "Worcester, MA",
    baseRate: 220,
    fsc: 9.09,
    total: 240,
    submittedAt: "2025-01-09 01:20 PM",
  },
  {
    id: 75,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Boston",
    endCity: "Burlington, VT",
    baseRate: 370,
    fsc: 10.81,
    total: 410,
    submittedAt: "2025-01-09 08:50 AM",
  },
  {
    id: 76,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Boston",
    endCity: "Albany, NY",
    baseRate: 330,
    fsc: 12.12,
    total: 370,
    submittedAt: "2025-01-09 04:10 PM",
  },
  {
    id: 77,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Boston",
    endCity: "Manchester, NH",
    baseRate: 195,
    fsc: 10.26,
    total: 215,
    submittedAt: "2025-01-09 12:05 PM",
  },
  {
    id: 78,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Boston",
    endCity: "Augustas, GA",
    baseRate: 1850,
    fsc: 10.81,
    total: 2050,
    submittedAt: "2025-01-09 09:35 AM",
  },
  {
    id: 79,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 285,
    fsc: 10.53,
    total: 315,
    submittedAt: "2025-01-09 10:20 AM",
  },
  {
    id: 80,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 275,
    fsc: 10.91,
    total: 305,
    submittedAt: "2025-01-09 02:45 PM",
  },
  {
    id: 81,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 435,
    fsc: 11.49,
    total: 485,
    submittedAt: "2025-01-09 11:15 AM",
  },
  {
    id: 82,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 425,
    fsc: 11.76,
    total: 475,
    submittedAt: "2025-01-09 03:30 PM",
  },
  {
    id: 83,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 1265,
    fsc: 10.28,
    total: 1395,
    submittedAt: "2025-01-09 09:50 AM",
  },
  {
    id: 84,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 1245,
    fsc: 11.24,
    total: 1385,
    submittedAt: "2025-01-09 01:40 PM",
  },
  {
    id: 85,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Chattanooga, TN",
    baseRate: 225,
    fsc: 13.33,
    total: 255,
    submittedAt: "2025-01-09 10:55 AM",
  },
  {
    id: 86,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Greenville, SC",
    baseRate: 275,
    fsc: 10.91,
    total: 305,
    submittedAt: "2025-01-09 02:20 PM",
  },
  {
    id: 87,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Jacksonville, FL",
    baseRate: 550,
    fsc: 10.91,
    total: 610,
    submittedAt: "2025-01-09 11:45 AM",
  },
  {
    id: 88,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Knoxville, TN",
    baseRate: 355,
    fsc: 11.27,
    total: 395,
    submittedAt: "2025-01-09 03:10 PM",
  },
  {
    id: 89,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Memphis, TN",
    baseRate: 620,
    fsc: 11.29,
    total: 690,
    submittedAt: "2025-01-09 09:25 AM",
  },
  {
    id: 90,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Savannah, GA",
    baseRate: 445,
    fsc: 11.24,
    total: 495,
    submittedAt: "2025-01-09 01:55 PM",
  },
  {
    id: 91,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Tampa, FL",
    baseRate: 730,
    fsc: 10.96,
    total: 810,
    submittedAt: "2025-01-09 10:30 AM",
  },
  {
    id: 92,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Philadelphia",
    endCity: "New York, NY",
    baseRate: 185,
    fsc: 10.81,
    total: 205,
    submittedAt: "2025-01-09 11:20 AM",
  },
  {
    id: 93,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Philadelphia",
    endCity: "Baltimore, MD",
    baseRate: 225,
    fsc: 11.11,
    total: 250,
    submittedAt: "2025-01-09 02:35 PM",
  },
  {
    id: 94,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Philadelphia",
    endCity: "Washington, DC",
    baseRate: 285,
    fsc: 10.53,
    total: 315,
    submittedAt: "2025-01-09 09:40 AM",
  },
  {
    id: 95,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Philadelphia",
    endCity: "Pittsburgh, PA",
    baseRate: 550,
    fsc: 10.91,
    total: 610,
    submittedAt: "2025-01-09 03:25 PM",
  },
  {
    id: 96,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Boston",
    endCity: "Franlin, NH",
    baseRate: 455,
    fsc: 10.99,
    total: 505,
    submittedAt: "2025-01-10 08:15 AM",
  },
  {
    id: 97,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Boston",
    endCity: "Slatersville, RI",
    baseRate: 325,
    fsc: 11.54,
    total: 363,
    submittedAt: "2025-01-10 09:30 AM",
  },
  {
    id: 98,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Boston",
    endCity: "Portland, ME",
    baseRate: 385,
    fsc: 10.39,
    total: 425,
    submittedAt: "2025-01-10 10:45 AM",
  },
  {
    id: 99,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Boston",
    endCity: "Hartford, CT",
    baseRate: 275,
    fsc: 10.91,
    total: 305,
    submittedAt: "2025-01-10 11:20 AM",
  },
  {
    id: 100,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Boston",
    endCity: "Providence, RI",
    baseRate: 150,
    fsc: 13.33,
    total: 170,
    submittedAt: "2025-01-10 01:15 PM",
  },
  {
    id: 101,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Boston",
    endCity: "Worcester, MA",
    baseRate: 215,
    fsc: 9.3,
    total: 235,
    submittedAt: "2025-01-10 02:30 PM",
  },
  {
    id: 102,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Boston",
    endCity: "Burlington, VT",
    baseRate: 365,
    fsc: 10.96,
    total: 405,
    submittedAt: "2025-01-10 03:45 PM",
  },
  {
    id: 103,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Boston",
    endCity: "Albany, NY",
    baseRate: 325,
    fsc: 12.31,
    total: 365,
    submittedAt: "2025-01-10 08:50 AM",
  },
  {
    id: 104,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Boston",
    endCity: "Manchester, NH",
    baseRate: 200,
    fsc: 10.0,
    total: 220,
    submittedAt: "2025-01-10 10:10 AM",
  },
  {
    id: 105,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Boston",
    endCity: "Augustas, GA",
    baseRate: 1820,
    fsc: 10.99,
    total: 2020,
    submittedAt: "2025-01-10 11:35 AM",
  },
  {
    id: 106,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 290,
    fsc: 10.34,
    total: 320,
    submittedAt: "2025-01-10 09:15 AM",
  },
  {
    id: 107,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-10 01:40 PM",
  },
  {
    id: 108,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 430,
    fsc: 11.63,
    total: 480,
    submittedAt: "2025-01-10 10:25 AM",
  },
  {
    id: 109,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 445,
    fsc: 11.24,
    total: 495,
    submittedAt: "2025-01-10 02:50 PM",
  },
  {
    id: 110,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 1255,
    fsc: 10.76,
    total: 1390,
    submittedAt: "2025-01-10 08:35 AM",
  },
  {
    id: 111,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 1235,
    fsc: 11.34,
    total: 1375,
    submittedAt: "2025-01-10 11:50 AM",
  },
  {
    id: 112,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 1275,
    fsc: 10.59,
    total: 1410,
    submittedAt: "2025-01-10 03:20 PM",
  },
  {
    id: 113,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Atlanta",
    endCity: "Chattanooga, TN",
    baseRate: 235,
    fsc: 12.77,
    total: 265,
    submittedAt: "2025-01-10 09:45 AM",
  },
  {
    id: 114,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Greenville, SC",
    baseRate: 285,
    fsc: 10.53,
    total: 315,
    submittedAt: "2025-01-10 01:10 PM",
  },
  {
    id: 115,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Jacksonville, FL",
    baseRate: 545,
    fsc: 11.01,
    total: 605,
    submittedAt: "2025-01-10 10:35 AM",
  },
  {
    id: 116,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Atlanta",
    endCity: "Knoxville, TN",
    baseRate: 365,
    fsc: 10.96,
    total: 405,
    submittedAt: "2025-01-10 02:25 PM",
  },
  {
    id: 117,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Atlanta",
    endCity: "Memphis, TN",
    baseRate: 625,
    fsc: 11.2,
    total: 695,
    submittedAt: "2025-01-10 08:55 AM",
  },
  {
    id: 118,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Atlanta",
    endCity: "Savannah, GA",
    baseRate: 455,
    fsc: 10.99,
    total: 505,
    submittedAt: "2025-01-10 11:40 AM",
  },
  {
    id: 119,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Atlanta",
    endCity: "Tampa, FL",
    baseRate: 735,
    fsc: 10.88,
    total: 815,
    submittedAt: "2025-01-10 03:05 PM",
  },
  {
    id: 120,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Philadelphia",
    endCity: "New York, NY",
    baseRate: 190,
    fsc: 10.53,
    total: 210,
    submittedAt: "2025-01-10 09:20 AM",
  },
  {
    id: 121,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Philadelphia",
    endCity: "Baltimore, MD",
    baseRate: 230,
    fsc: 10.87,
    total: 255,
    submittedAt: "2025-01-10 01:45 PM",
  },
  {
    id: 122,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Philadelphia",
    endCity: "Washington, DC",
    baseRate: 290,
    fsc: 10.34,
    total: 320,
    submittedAt: "2025-01-10 10:15 AM",
  },
  {
    id: 123,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Philadelphia",
    endCity: "Pittsburgh, PA",
    baseRate: 545,
    fsc: 11.01,
    total: 605,
    submittedAt: "2025-01-10 02:40 PM",
  },
  {
    id: 124,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Chicago",
    endCity: "Milwaukee, WI",
    baseRate: 225,
    fsc: 8.89,
    total: 245,
    submittedAt: "2025-01-10 08:25 AM",
  },
  {
    id: 125,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Chicago",
    endCity: "Indianapolis, IN",
    baseRate: 355,
    fsc: 11.27,
    total: 395,
    submittedAt: "2025-01-10 11:30 AM",
  },
  {
    id: 126,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Chicago",
    endCity: "Detroit, MI",
    baseRate: 485,
    fsc: 10.31,
    total: 535,
    submittedAt: "2025-01-10 03:15 PM",
  },
  {
    id: 127,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Chicago",
    endCity: "St. Louis, MO",
    baseRate: 545,
    fsc: 11.01,
    total: 605,
    submittedAt: "2025-01-10 09:50 AM",
  },
  {
    id: 128,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Dallas",
    endCity: "Fort Worth, TX",
    baseRate: 155,
    fsc: 12.9,
    total: 175,
    submittedAt: "2025-01-10 01:25 PM",
  },
  {
    id: 129,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Dallas",
    endCity: "Austin, TX",
    baseRate: 325,
    fsc: 12.31,
    total: 365,
    submittedAt: "2025-01-10 10:40 AM",
  },
  {
    id: 130,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Dallas",
    endCity: "Houston, TX",
    baseRate: 455,
    fsc: 10.99,
    total: 505,
    submittedAt: "2025-01-10 02:55 PM",
  },
  {
    id: 131,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Houston",
    endCity: "San Antonio, TX",
    baseRate: 385,
    fsc: 10.39,
    total: 425,
    submittedAt: "2025-01-10 08:45 AM",
  },
  {
    id: 132,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Houston",
    endCity: "New Orleans, LA",
    baseRate: 635,
    fsc: 11.02,
    total: 705,
    submittedAt: "2025-01-10 11:55 AM",
  },
  {
    id: 133,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Los Angeles",
    endCity: "San Diego, CA",
    baseRate: 345,
    fsc: 11.59,
    total: 385,
    submittedAt: "2025-01-10 03:30 PM",
  },
  {
    id: 134,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Los Angeles",
    endCity: "Las Vegas, NV",
    baseRate: 545,
    fsc: 11.01,
    total: 605,
    submittedAt: "2025-01-10 09:10 AM",
  },
  {
    id: 135,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Los Angeles",
    endCity: "Phoenix, AZ",
    baseRate: 725,
    fsc: 11.03,
    total: 805,
    submittedAt: "2025-01-10 01:35 PM",
  },
  {
    id: 136,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Miami",
    endCity: "Tampa, FL",
    baseRate: 425,
    fsc: 9.41,
    total: 465,
    submittedAt: "2025-01-10 10:50 AM",
  },
  {
    id: 137,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Miami",
    endCity: "Orlando, FL",
    baseRate: 385,
    fsc: 10.39,
    total: 425,
    submittedAt: "2025-01-10 03:00 PM",
  },
  {
    id: 138,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Miami",
    endCity: "Jacksonville, FL",
    baseRate: 545,
    fsc: 11.01,
    total: 605,
    submittedAt: "2025-01-10 08:20 AM",
  },
  {
    id: 139,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Seattle",
    endCity: "Portland, OR",
    baseRate: 295,
    fsc: 10.17,
    total: 325,
    submittedAt: "2025-01-10 11:45 AM",
  },
  {
    id: 140,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Seattle",
    endCity: "Spokane, WA",
    baseRate: 448,
    fsc: 11.16,
    total: 498,
    submittedAt: "2025-01-10 02:10 PM",
  },
  {
    id: 141,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Seattle",
    endCity: "Vancouver, BC",
    baseRate: 325,
    fsc: 12.31,
    total: 365,
    submittedAt: "2025-01-10 09:35 AM",
  },
  {
    id: 142,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "New York",
    endCity: "Philadelphia, PA",
    baseRate: 185,
    fsc: 10.81,
    total: 205,
    submittedAt: "2025-01-10 01:50 PM",
  },
  {
    id: 143,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "New York",
    endCity: "Boston, MA",
    baseRate: 385,
    fsc: 10.39,
    total: 425,
    submittedAt: "2025-01-10 10:25 AM",
  },
  {
    id: 144,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "New York",
    endCity: "Washington, DC",
    baseRate: 425,
    fsc: 9.41,
    total: 465,
    submittedAt: "2025-01-10 03:40 PM",
  },
  {
    id: 145,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Phoenix",
    endCity: "Tucson, AZ",
    baseRate: 265,
    fsc: 15.09,
    total: 305,
    submittedAt: "2025-01-10 08:30 AM",
  },
  {
    id: 146,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Phoenix",
    endCity: "Albuquerque, NM",
    baseRate: 635,
    fsc: 11.02,
    total: 705,
    submittedAt: "2025-01-10 12:00 PM",
  },
  {
    id: 147,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Denver",
    endCity: "Colorado Springs, CO",
    baseRate: 195,
    fsc: 10.26,
    total: 215,
    submittedAt: "2025-01-10 02:45 PM",
  },
  {
    id: 148,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Denver",
    endCity: "Salt Lake City, UT",
    baseRate: 725,
    fsc: 11.03,
    total: 805,
    submittedAt: "2025-01-10 09:15 AM",
  },
  {
    id: 149,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "San Francisco",
    endCity: "Sacramento, CA",
    baseRate: 185,
    fsc: 10.81,
    total: 205,
    submittedAt: "2025-01-10 01:20 PM",
  },
  {
    id: 150,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "San Francisco",
    endCity: "Los Angeles, CA",
    baseRate: 725,
    fsc: 11.03,
    total: 805,
    submittedAt: "2025-01-10 10:55 AM",
  },
  {
    id: 151,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Portland",
    endCity: "Eugene, OR",
    baseRate: 225,
    fsc: 13.33,
    total: 255,
    submittedAt: "2025-01-10 03:25 PM",
  },
  {
    id: 152,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-14 02:20 PM",
  },
  {
    id: 153,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Phoenix",
    endCity: "Tucson, AZ",
    baseRate: 225,
    fsc: 11.11,
    total: 250,
    submittedAt: "2025-01-15 09:15 AM",
  },
  {
    id: 154,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Denver",
    endCity: "Colorado Springs, CO",
    baseRate: 135,
    fsc: 11.11,
    total: 150,
    submittedAt: "2025-01-15 11:30 AM",
  },
  {
    id: 155,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "San Francisco",
    endCity: "Sacramento, CA",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-15 02:45 PM",
  },
  {
    id: 156,
    vendorId: "MC-789012",
    vendorEmail: "sarah.j@logistics.com",
    startCity: "Philadelphia",
    endCity: "Pittsburgh, PA",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-14 09:30 AM",
  },
  {
    id: 157,
    vendorId: "MC-345678",
    vendorEmail: "mike@davisfreight.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-14 11:45 AM",
  },
  {
    id: 158,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Nashville, TN",
    baseRate: 1250,
    fsc: 15.0,
    total: 1437.5,
    submittedAt: "2025-01-14 12:38 PM",
  },
  {
    id: 159,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Seattle",
    endCity: "Spokane, WA",
    baseRate: 495,
    fsc: 11.11,
    total: 550,
    submittedAt: "2025-01-16 08:00 AM",
  },
  {
    id: 160,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Miami",
    endCity: "Tampa, FL",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-16 10:30 AM",
  },
  {
    id: 161,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Portland",
    endCity: "Eugene, OR",
    baseRate: 225,
    fsc: 11.11,
    total: 250,
    submittedAt: "2025-01-16 01:15 PM",
  },
  {
    id: 162,
    vendorId: "MC-789012",
    vendorEmail: "sarah.j@logistics.com",
    startCity: "Chicago",
    endCity: "Minneapolis, MN",
    baseRate: 720,
    fsc: 11.11,
    total: 800,
    submittedAt: "2025-01-14 02:45 PM",
  },
  {
    id: 163,
    vendorId: "MC-345678",
    vendorEmail: "mike@davisfreight.com",
    startCity: "Dallas",
    endCity: "Austin, TX",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-14 01:30 PM",
  },
  {
    id: 164,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 425,
    fsc: 11.76,
    total: 475,
    submittedAt: "2025-01-14 10:20 AM",
  },
  {
    id: 165,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 440,
    fsc: 11.36,
    total: 490,
    submittedAt: "2025-01-14 02:35 PM",
  },
  {
    id: 166,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Philadelphia",
    endCity: "New York, NY",
    baseRate: 182,
    fsc: 10.99,
    total: 202,
    submittedAt: "2025-01-14 09:45 AM",
  },
  {
    id: 167,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Philadelphia",
    endCity: "Baltimore, MD",
    baseRate: 218,
    fsc: 11.01,
    total: 242,
    submittedAt: "2025-01-14 11:50 AM",
  },
  {
    id: 168,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Philadelphia",
    endCity: "Washington, DC",
    baseRate: 282,
    fsc: 10.64,
    total: 312,
    submittedAt: "2025-01-14 03:15 PM",
  },
  {
    id: 169,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Boston",
    endCity: "Franlin, NH",
    baseRate: 448,
    fsc: 11.16,
    total: 498,
    submittedAt: "2025-01-14 08:30 AM",
  },
  {
    id: 170,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Boston",
    endCity: "Slatersville, RI",
    baseRate: 318,
    fsc: 11.01,
    total: 353,
    submittedAt: "2025-01-14 10:40 AM",
  },
  {
    id: 171,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Boston",
    endCity: "Portland, ME",
    baseRate: 378,
    fsc: 10.58,
    total: 418,
    submittedAt: "2025-01-14 01:55 PM",
  },
  {
    id: 172,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Boston",
    endCity: "Hartford, CT",
    baseRate: 268,
    fsc: 11.19,
    total: 298,
    submittedAt: "2025-01-14 03:20 PM",
  },
  {
    id: 173,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Chicago",
    endCity: "Milwaukee, WI",
    baseRate: 218,
    fsc: 9.17,
    total: 238,
    submittedAt: "2025-01-14 09:10 AM",
  },
  {
    id: 174,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Chicago",
    endCity: "Indianapolis, IN",
    baseRate: 348,
    fsc: 11.49,
    total: 388,
    submittedAt: "2025-01-14 11:25 AM",
  },
  {
    id: 175,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Chicago",
    endCity: "Detroit, MI",
    baseRate: 478,
    fsc: 10.46,
    total: 528,
    submittedAt: "2025-01-14 02:40 PM",
  },
  {
    id: 176,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Dallas",
    endCity: "Fort Worth, TX",
    baseRate: 148,
    fsc: 13.51,
    total: 168,
    submittedAt: "2025-01-14 08:55 AM",
  },
  {
    id: 177,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Dallas",
    endCity: "Austin, TX",
    baseRate: 318,
    fsc: 12.58,
    total: 358,
    submittedAt: "2025-01-14 10:30 AM",
  },
  {
    id: 178,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Dallas",
    endCity: "Houston, TX",
    baseRate: 448,
    fsc: 11.16,
    total: 498,
    submittedAt: "2025-01-14 01:15 PM",
  },
  {
    id: 179,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Los Angeles",
    endCity: "San Diego, CA",
    baseRate: 338,
    fsc: 11.83,
    total: 378,
    submittedAt: "2025-01-14 09:35 AM",
  },
  {
    id: 180,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Los Angeles",
    endCity: "Las Vegas, NV",
    baseRate: 538,
    fsc: 11.15,
    total: 598,
    submittedAt: "2025-01-14 11:50 AM",
  },
  {
    id: 181,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Miami",
    endCity: "Tampa, FL",
    baseRate: 418,
    fsc: 9.57,
    total: 458,
    submittedAt: "2025-01-14 10:05 AM",
  },
  {
    id: 182,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "Miami",
    endCity: "Orlando, FL",
    baseRate: 378,
    fsc: 10.58,
    total: 418,
    submittedAt: "2025-01-14 02:20 PM",
  },
  {
    id: 183,
    vendorId: "MC-334455",
    vendorEmail: "vendor16@example.com",
    startCity: "Seattle",
    endCity: "Portland, OR",
    baseRate: 288,
    fsc: 10.42,
    total: 318,
    submittedAt: "2025-01-14 08:45 AM",
  },
  {
    id: 184,
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Seattle",
    endCity: "Spokane, WA",
    baseRate: 448,
    fsc: 11.16,
    total: 498,
    submittedAt: "2025-01-14 11:10 AM",
  },
  {
    id: 185,
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "New York",
    endCity: "Philadelphia, PA",
    baseRate: 178,
    fsc: 11.24,
    total: 198,
    submittedAt: "2025-01-14 01:35 PM",
  },
  {
    id: 186,
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "New York",
    endCity: "Boston, MA",
    baseRate: 378,
    fsc: 10.58,
    total: 418,
    submittedAt: "2025-01-14 03:50 PM",
  },
  {
    id: 187,
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Phoenix",
    endCity: "Tucson, AZ",
    baseRate: 258,
    fsc: 15.5,
    total: 298,
    submittedAt: "2025-01-14 09:25 AM",
  },
  {
    id: 188,
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Denver",
    endCity: "Colorado Springs, CO",
    baseRate: 188,
    fsc: 10.64,
    total: 208,
    submittedAt: "2025-01-14 11:40 AM",
  },
  {
    id: 189,
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Houston",
    endCity: "San Antonio, TX",
    baseRate: 378,
    fsc: 10.58,
    total: 418,
    submittedAt: "2025-01-14 02:05 PM",
  },
  {
    id: 190,
    vendorId: "MC-889900",
    vendorEmail: "vendor15@example.com",
    startCity: "San Francisco",
    endCity: "Sacramento, CA",
    baseRate: 178,
    fsc: 11.24,
    total: 198,
    submittedAt: "2025-01-14 08:20 AM",
  },
  {
    id: 191,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Chicago",
    endCity: "Detroit, MI",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-12 11:20 AM",
  },
  {
    id: 192,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Dallas",
    endCity: "Houston, TX",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-12 02:45 PM",
  },
  {
    id: 193,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Phoenix",
    endCity: "Las Vegas, NV",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-13 09:15 AM",
  },
  {
    id: 194,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Denver",
    endCity: "Colorado Springs, CO",
    baseRate: 180,
    fsc: 11.11,
    total: 200,
    submittedAt: "2025-01-13 10:30 AM",
  },
  {
    id: 195,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "San Francisco",
    endCity: "Oakland, CA",
    baseRate: 90,
    fsc: 11.11,
    total: 100,
    submittedAt: "2025-01-13 01:50 PM",
  },
  {
    id: 196,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Seattle",
    endCity: "Tacoma, WA",
    baseRate: 135,
    fsc: 11.11,
    total: 150,
    submittedAt: "2025-01-13 03:25 PM",
  },
  {
    id: 197,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Miami",
    endCity: "Fort Lauderdale, FL",
    baseRate: 90,
    fsc: 11.11,
    total: 100,
    submittedAt: "2025-01-14 08:40 AM",
  },
  {
    id: 198,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Philadelphia",
    endCity: "Pittsburgh, PA",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-14 11:15 AM",
  },
  {
    id: 199,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Boston",
    endCity: "Worcester, MA",
    baseRate: 135,
    fsc: 11.11,
    total: 150,
    submittedAt: "2025-01-14 02:30 PM",
  },
  {
    id: 200,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Savannah, GA",
    baseRate: 450,
    fsc: 11.11,
    total: 500,
    submittedAt: "2025-01-15 09:00 AM",
  },
  {
    id: 201,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Portland",
    endCity: "Eugene, OR",
    baseRate: 270,
    fsc: 11.11,
    total: 300,
    submittedAt: "2025-01-15 10:45 AM",
  },
  {
    id: 202,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "New York",
    endCity: "Albany, NY",
    baseRate: 315,
    fsc: 11.11,
    total: 350,
    submittedAt: "2025-01-15 01:20 PM",
  },
  {
    id: 203,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Chicago",
    endCity: "Indianapolis, IN",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-15 03:55 PM",
  },
  {
    id: 204,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Los Angeles",
    endCity: "Santa Barbara, CA",
    baseRate: 225,
    fsc: 11.11,
    total: 250,
    submittedAt: "2025-01-16 08:10 AM",
  },
  {
    id: 205,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Dallas",
    endCity: "Austin, TX",
    baseRate: 360,
    fsc: 11.11,
    total: 400,
    submittedAt: "2025-01-16 10:35 AM",
  },
  {
    id: 206,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Phoenix",
    endCity: "Flagstaff, AZ",
    baseRate: 315,
    fsc: 11.11,
    total: 350,
    submittedAt: "2025-01-16 01:50 PM",
  },
  {
    id: 207,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Denver",
    endCity: "Boulder, CO",
    baseRate: 90,
    fsc: 11.11,
    total: 100,
    submittedAt: "2025-01-16 03:15 PM",
  },
  {
    id: 208,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "San Francisco",
    endCity: "San Jose, CA",
    baseRate: 135,
    fsc: 11.11,
    total: 150,
    submittedAt: "2025-01-17 09:30 AM",
  },
  {
    id: 209,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Seattle",
    endCity: "Spokane, WA",
    baseRate: 540,
    fsc: 11.11,
    total: 600,
    submittedAt: "2025-01-17 11:45 AM",
  },
  {
    id: 210,
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Miami",
    endCity: "Key West, FL",
    baseRate: 315,
    fsc: 11.11,
    total: 350,
    submittedAt: "2025-01-17 02:20 PM",
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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const [openAddDestDialog, setOpenAddDestDialog] = useState(false)
  const [newDestination, setNewDestination] = useState<string | null>(null)
  const [newDestinationInput, setNewDestinationInput] = useState("")

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
          vendorId: "MC-123456",
          vendorEmail: "vendor@example.com",
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
          optional1: value.optional1,
          optional2: value.optional2,
          optional3: value.optional3,
          optional4: value.optional4,
          optional5: value.optional5,
          optional6: value.optional6,
          optional7: value.optional7,
          optional8: value.optional8,
        })
      })

      const allRates = [...MOCK_RATES, ...ratesArray]

      const uniqueRates = allRates.reduce((acc, rate) => {
        if (!acc.some((r) => r.id === String(rate.id))) {
          acc.push({ ...rate, id: String(rate.id) })
        }
        return acc
      }, [] as RateData[])

      setRates(uniqueRates)
    }

    loadRates()
  }, [])

  const toggleRowExpansion = (rateId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(rateId)) {
        newSet.delete(rateId)
      } else {
        newSet.add(rateId)
      }
      return newSet
    })
  }

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

  const handleLogout = () => {
    router.push("/")
  }

  const handleAddDestination = () => {
    if (newDestination && selectedCity) {
      const newRate: RateData = {
        id: `${selectedCity.toLowerCase()}-${Date.now()}`,
        vendorId: "PENDING",
        vendorEmail: "pending@example.com",
        startCity: selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1),
        endCity: newDestination,
        baseRate: 0,
        fsc: 0,
        total: 0,
        submittedAt: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }

      const updatedRates = [...rates, newRate]
      setRates(updatedRates)

      setNewDestination(null)
      setNewDestinationInput("")
      setOpenAddDestDialog(false)
    }
  }

  const hasOptionalFields = (rate: RateData) => {
    return (
      rate.optional1 ||
      rate.optional2 ||
      rate.optional3 ||
      rate.optional4 ||
      rate.optional5 ||
      rate.optional6 ||
      rate.optional7 ||
      rate.optional8
    )
  }

  const optionalFieldLabels = ["Chassis", "Yard Storage", "Hazmat", "Bond", "Split", "Flip", "Overweight", "Prepull"]

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Logo>
            <Truck size={24} />
          </Logo>
          <HeaderTitle>
            <h1>Vendor Bid Portal</h1>
            <p>Admin - Rate Management {selectedCity && ` - ${selectedCity}`}</p>
          </HeaderTitle>
        </HeaderLeft>

        <HeaderActions>
          <CitySelector
            value={selectedCity || ""}
            onChange={(e) => {
              const city = e.target.value || null
              setSelectedDestination(null)
              router.push(city ? `/admin/rates?city=${city}` : "/admin/rates")
            }}
          >
            <option value="">All Cities</option>
            <option value="boston">Boston</option>
            <option value="atlanta">Atlanta</option>
            <option value="philadelphia">Philadelphia</option>
          </CitySelector>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid rgb(203 213 225)",
              backgroundColor: "rgb(255 255 255)",
              fontSize: "0.875rem",
              color: "rgb(71 85 105)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgb(148 163 184)"
              e.currentTarget.style.backgroundColor = "rgb(248 250 252)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgb(203 213 225)"
              e.currentTarget.style.backgroundColor = "rgb(255 255 255)"
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </HeaderActions>
      </Header>

      <Main>
        <Container>
          {selectedCity?.toLowerCase() === "atlanta" ? (
            <GridContainer>
              <Sidebar>
                <SidebarTitle>Select Destination</SidebarTitle>
                <AddDestinationCard onClick={() => setOpenAddDestDialog(true)}>
                  <Plus size={18} />
                  Add a New Destination
                </AddDestinationCard>
                <DestinationList>
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
                </CardHeader>

                {selectedDestination ? (
                  <>
                    <SearchContainer>
                      <TextField
                        fullWidth
                        placeholder="Search by vendor ID, email ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search
                                style={{
                                  width: "1.25rem",
                                  height: "1.25rem",
                                  color: "rgb(156 163 175)",
                                }}
                              />
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
                              <TableCell sx={{ fontWeight: 700, width: 50 }}></TableCell>
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
                              <>
                                <TableRow
                                  key={rate.id}
                                  hover
                                  onClick={() => toggleRowExpansion(rate.id)}
                                  sx={{ cursor: "pointer" }}
                                >
                                  <TableCell>
                                    {hasOptionalFields(rate) && (
                                      <IconButton size="small">
                                        {expandedRows.has(rate.id) ? (
                                          <ChevronDown size={16} />
                                        ) : (
                                          <ChevronRight size={16} />
                                        )}
                                      </IconButton>
                                    )}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontFamily: "monospace",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    {rate.vendorId}
                                  </TableCell>
                                  <TableCell>{rate.vendorEmail}</TableCell>
                                  <TableCell>{rate.endCity}</TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "0.875rem",
                                      color: "rgb(71 85 105)",
                                    }}
                                  >
                                    {rate.submittedAt}
                                  </TableCell>
                                  <TableCell align="right">${rate.baseRate.toFixed(2)}</TableCell>
                                  <TableCell align="right">{rate.fsc.toFixed(2)}%</TableCell>
                                  <TableCell align="right">
                                    <span
                                      style={{
                                        fontWeight: 700,
                                        color: "rgb(37 99 235)",
                                      }}
                                    >
                                      ${rate.total.toFixed(2)}
                                    </span>
                                  </TableCell>
                                </TableRow>
                                {expandedRows.has(rate.id) && hasOptionalFields(rate) && (
                                  <TableRow>
                                    <TableCell
                                      colSpan={8}
                                      sx={{
                                        backgroundColor: "rgb(249 250 251)",
                                        padding: "1.5rem",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "grid",
                                          gridTemplateColumns: "repeat(4, 1fr)",
                                          gap: "1rem",
                                        }}
                                      >
                                        {optionalFieldLabels.map((label, index) => {
                                          const fieldKey = `optional${index + 1}` as keyof RateData
                                          const value = rate[fieldKey]
                                          if (value) {
                                            return (
                                              <div
                                                key={label}
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  gap: "0.25rem",
                                                }}
                                              >
                                                <span
                                                  style={{
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600,
                                                    color: "rgb(71 85 105)",
                                                    textTransform: "uppercase",
                                                  }}
                                                >
                                                  {label}
                                                </span>
                                                <span
                                                  style={{
                                                    fontSize: "0.875rem",
                                                    fontWeight: 600,
                                                    color: "rgb(15 23 42)",
                                                  }}
                                                >
                                                  {value}
                                                </span>
                                              </div>
                                            )
                                          }
                                          return null
                                        })}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TableWrapper>

                    {filteredRates.length === 0 && (
                      <EmptyState>No rates found matching your search criteria</EmptyState>
                    )}
                  </>
                ) : (
                  <EmptyState>
                    <MapPin size={48} color="rgb(148 163 184)" />
                    <h3 style={{ marginTop: "1rem" }}>No Destination Selected</h3>
                    <p>Please select a destination from the sidebar to view rates</p>
                  </EmptyState>
                )}
              </ContentCard>
            </GridContainer>
          ) : (
            <ContentCard>
              <CardHeader>
                <CardHeaderText>
                  <CardTitle>
                    {selectedCity
                      ? `${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} Vendor Rates`
                      : "All Vendor Rates"}
                  </CardTitle>
                  <CardDescription>
                    {selectedCity ? `Viewing all rates for ${selectedCity}` : "Viewing rates from all cities"}
                  </CardDescription>
                </CardHeaderText>
              </CardHeader>

              <SearchContainer>
                <TextField
                  fullWidth
                  placeholder="Search by vendor ID, email, city, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "rgb(156 163 175)",
                          }}
                        />
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
                        <TableCell sx={{ fontWeight: 700, width: 50 }}></TableCell>
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
                        <>
                          <TableRow
                            key={rate.id}
                            hover
                            onClick={() => toggleRowExpansion(rate.id)}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell>
                              {hasOptionalFields(rate) && (
                                <IconButton size="small">
                                  {expandedRows.has(rate.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </IconButton>
                              )}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                              }}
                            >
                              {rate.vendorId}
                            </TableCell>
                            <TableCell>{rate.vendorEmail}</TableCell>
                            {!selectedCity && <TableCell>{rate.startCity}</TableCell>}
                            <TableCell>{rate.endCity}</TableCell>
                            <TableCell
                              sx={{
                                fontSize: "0.875rem",
                                color: "rgb(71 85 105)",
                              }}
                            >
                              {rate.submittedAt}
                            </TableCell>
                            <TableCell align="right">${rate.baseRate.toFixed(2)}</TableCell>
                            <TableCell align="right">{rate.fsc.toFixed(2)}%</TableCell>
                            <TableCell align="right">
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: "rgb(37 99 235)",
                                }}
                              >
                                ${rate.total.toFixed(2)}
                              </span>
                            </TableCell>
                          </TableRow>
                          {expandedRows.has(rate.id) && hasOptionalFields(rate) && (
                            <TableRow>
                              <TableCell
                                colSpan={!selectedCity ? 9 : 8}
                                sx={{
                                  backgroundColor: "rgb(249 250 251)",
                                  padding: "1.5rem",
                                }}
                              >
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: "1rem",
                                  }}
                                >
                                  {optionalFieldLabels.map((label, index) => {
                                    const fieldKey = `optional${index + 1}` as keyof RateData
                                    const value = rate[fieldKey]
                                    if (value) {
                                      return (
                                        <div
                                          key={label}
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0.25rem",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: "0.75rem",
                                              fontWeight: 600,
                                              color: "rgb(71 85 105)",
                                              textTransform: "uppercase",
                                            }}
                                          >
                                            {label}
                                          </span>
                                          <span
                                            style={{
                                              fontSize: "0.875rem",
                                              fontWeight: 600,
                                              color: "rgb(15 23 42)",
                                            }}
                                          >
                                            {value}
                                          </span>
                                        </div>
                                      )
                                    }
                                    return null
                                  })}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
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

      <Dialog open={openAddDestDialog} onClose={() => setOpenAddDestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Destination</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the new destination you want to add to Atlanta routes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Destination Name"
            fullWidth
            variant="outlined"
            value={newDestinationInput}
            onChange={(e) => setNewDestinationInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAddDestDialog(false)
              setNewDestination(null)
              setNewDestinationInput("")
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setNewDestination(newDestinationInput)
              handleAddDestination()
            }}
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  )
}
