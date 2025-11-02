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
  Autocomplete,
  Collapse,
} from "@mui/material"
import { Truck, LogOut, Search, Plus, ChevronDown, ChevronUp } from "lucide-react"

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
  chassis?: number
  yardStorage?: number
  hazmat?: number
  bond?: number
  split?: number
  flip?: number
  overweight?: number
  prepull?: number
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
  box-shadow: 0 4px 6px -1px rgb(0 00 0 / 0.1);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #334155;
    margin: 0 0 0.75rem 0;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #64748b;
  }
`

const ExpandableTableCell = styled(TableCell)`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: rgb(249 250 251);
`

const AccessorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  margin: 1rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const AccessorialItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const AccessorialLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(100 116 139);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const AccessorialValue = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(15 23 42);

  &.empty {
    color: rgb(148 163 184);
    font-weight: 400;
  }
`

const ExpandButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(71 85 105);
  transition: all 0.2s;

  &:hover {
    color: rgb(37 99 235);
    background: rgb(239 246 255);
    border-radius: 0.25rem;
  }
`

const AddDestinationCard = styled.div`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: "rgb(241 245 249)";
  color: "rgb(15 23 42)";

  &:hover {
    background: "rgb(226 232 240)";
  }
`

const MOCK_RATES: RateData[] = [
  {
    id: "atlanta-1",
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-14 02:20 PM",
    chassis: 45,
    yardStorage: 35,
    hazmat: 75,
    bond: 25,
    split: 0,
    flip: 0,
    overweight: 50,
    prepull: 40,
  },
  {
    id: "atlanta-2",
    vendorId: "MC-667788",
    vendorEmail: "vendor17@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 290,
    fsc: 10.34,
    total: 320,
    submittedAt: "2025-01-10 09:15 AM",
    chassis: 40,
    yardStorage: 30,
    hazmat: 70,
    bond: 20,
    split: 0,
    flip: 0,
    overweight: 45,
    prepull: 35,
  },
  {
    id: "atlanta-3",
    vendorId: "MC-990011",
    vendorEmail: "vendor18@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-10 01:40 PM",
    chassis: 50,
    yardStorage: 40,
    hazmat: 80,
    bond: 30,
    split: 15,
    flip: 0,
    overweight: 55,
    prepull: 45,
  },
  {
    id: "atlanta-4",
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 285,
    fsc: 10.53,
    total: 315,
    submittedAt: "2025-01-09 10:20 AM",
    chassis: 38,
    yardStorage: 28,
    hazmat: 65,
    bond: 18,
    split: 0,
    flip: 0,
    overweight: 42,
    prepull: 32,
  },
  {
    id: "atlanta-5",
    vendorId: "MC-333444",
    vendorEmail: "lisa.martinez@quickship.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 275,
    fsc: 10.91,
    total: 305,
    submittedAt: "2025-01-09 02:45 AM",
    chassis: 42,
    yardStorage: 32,
    hazmat: 72,
    bond: 22,
    split: 0,
    flip: 0,
    overweight: 48,
    prepull: 38,
  },
  {
    id: "atlanta-6",
    vendorId: "MC-123456",
    vendorEmail: "vendor1@example.com",
    startCity: "Atlanta",
    endCity: "Birmingham, AL",
    baseRate: 280,
    fsc: 10.71,
    total: 310,
    submittedAt: "2025-01-07 02:20 PM",
    chassis: 45,
    yardStorage: 35,
    hazmat: 75,
    bond: 25,
    split: 0,
    flip: 0,
    overweight: 50,
    prepull: 40,
  },
  {
    id: "atlanta-7",
    vendorId: "MC-345678",
    vendorEmail: "mike@davisfreight.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 420,
    fsc: 9.52,
    total: 460,
    submittedAt: "2025-01-14 11:45 AM",
    chassis: 60,
    yardStorage: 45,
    hazmat: 95,
    bond: 35,
    split: 20,
    flip: 10,
    overweight: 65,
    prepull: 55,
  },
  {
    id: "atlanta-8",
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 425,
    fsc: 11.76,
    total: 475,
    submittedAt: "2025-01-14 10:20 AM",
    chassis: 55,
    yardStorage: 40,
    hazmat: 90,
    bond: 32,
    split: 18,
    flip: 8,
    overweight: 60,
    prepull: 50,
  },
  {
    id: "atlanta-9",
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 440,
    fsc: 11.36,
    total: 490,
    submittedAt: "2025-01-14 02:35 PM",
    chassis: 62,
    yardStorage: 48,
    hazmat: 100,
    bond: 38,
    split: 22,
    flip: 12,
    overweight: 70,
    prepull: 58,
  },
  {
    id: "atlanta-10",
    vendorId: "MC-223344",
    vendorEmail: "vendor13@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 430,
    fsc: 11.63,
    total: 480,
    submittedAt: "2025-01-10 10:25 AM",
    chassis: 57,
    yardStorage: 42,
    hazmat: 92,
    bond: 34,
    split: 19,
    flip: 9,
    overweight: 62,
    prepull: 52,
  },
  {
    id: "atlanta-11",
    vendorId: "MC-123456",
    vendorEmail: "john.smith@transport.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 480,
    fsc: 12.5,
    total: 540,
    submittedAt: "2025-01-10 09:30 AM",
    chassis: 65,
    yardStorage: 50,
    hazmat: 105,
    bond: 40,
    split: 25,
    flip: 15,
    overweight: 75,
    prepull: 65,
  },
  {
    id: "atlanta-12",
    vendorId: "MC-556677",
    vendorEmail: "vendor14@example.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 445,
    fsc: 11.24,
    total: 495,
    submittedAt: "2025-01-10 02:50 PM",
    chassis: 63,
    yardStorage: 49,
    hazmat: 102,
    bond: 39,
    split: 23,
    flip: 13,
    overweight: 72,
    prepull: 60,
  },
  {
    id: "atlanta-13",
    vendorId: "MC-111222",
    vendorEmail: "robert.chen@fasthaul.com",
    startCity: "Atlanta",
    endCity: "Charlotte, NC",
    baseRate: 435,
    fsc: 11.49,
    total: 485,
    submittedAt: "2025-01-09 11:15 AM",
    chassis: 58,
    yardStorage: 43,
    hazmat: 94,
    bond: 35,
    split: 20,
    flip: 10,
    overweight: 64,
    prepull: 54,
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
  const [expandedRows, setExpandedRows] = useState<string[]>([])

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

      // Combine MOCK_RATES with the loaded rates
      const allRates = [...MOCK_RATES, ...ratesArray]

      // Ensure unique IDs if necessary, or handle potential overlaps if mock and local storage can have same IDs
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

  const handleAddDestination = () => {
    if (newDestination && selectedCity) {
      // Add the new destination to the rates list
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

  const toggleExpandRow = (id: string) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const hasAccessorials = (rate: RateData): boolean => {
    return !!(
      rate.chassis ||
      rate.yardStorage ||
      rate.hazmat ||
      rate.bond ||
      rate.split ||
      rate.flip ||
      rate.overweight ||
      rate.prepull
    )
  }

  const formatCurrencyValue = (value?: number): string => {
    if (value === undefined || value === null || value === 0) return "—"
    return `$${value.toFixed(2)}`
  }

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <LogoCircle>
            <Truck style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
          </LogoCircle>
          <HeaderText>
            <HeaderTitle>Drayage Bid Portal</HeaderTitle>
            <HeaderSubtitle>Admin - Rate Management{selectedCity && ` - ${selectedCity}`}</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <HeaderActions>
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
                          <TableCell sx={{ fontWeight: 700, width: "60px" }} />
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
                            <TableRow key={rate.id} hover>
                              <TableCell
                                sx={{
                                  fontFamily: "monospace",
                                  fontSize: "0.875rem",
                                  width: "60px",
                                }}
                              >
                                <ExpandButton onClick={() => toggleExpandRow(rate.id)}>
                                  {expandedRows.includes(rate.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </ExpandButton>
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
                            <TableRow key={`${rate.id}-details`}>
                              <ExpandableTableCell colSpan={8}>
                                <Collapse in={expandedRows.includes(rate.id)} timeout="auto" unmountOnExit>
                                  <div style={{ padding: "1rem 0" }}>
                                    <div style={{ fontWeight: 600, marginBottom: "1rem", color: "rgb(15 23 42)" }}>
                                      Accessorial Charges
                                    </div>
                                    {hasAccessorials(rate) ? (
                                      <AccessorialsGrid>
                                        <AccessorialItem>
                                          <AccessorialLabel>Chassis</AccessorialLabel>
                                          <AccessorialValue className={!rate.chassis ? "empty" : ""}>
                                            {formatCurrencyValue(rate.chassis)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Yard Storage</AccessorialLabel>
                                          <AccessorialValue className={!rate.yardStorage ? "empty" : ""}>
                                            {formatCurrencyValue(rate.yardStorage)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Hazmat</AccessorialLabel>
                                          <AccessorialValue className={!rate.hazmat ? "empty" : ""}>
                                            {formatCurrencyValue(rate.hazmat)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Bond</AccessorialLabel>
                                          <AccessorialValue className={!rate.bond ? "empty" : ""}>
                                            {formatCurrencyValue(rate.bond)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Split</AccessorialLabel>
                                          <AccessorialValue className={!rate.split ? "empty" : ""}>
                                            {formatCurrencyValue(rate.split)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Flip</AccessorialLabel>
                                          <AccessorialValue className={!rate.flip ? "empty" : ""}>
                                            {formatCurrencyValue(rate.flip)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Overweight</AccessorialLabel>
                                          <AccessorialValue className={!rate.overweight ? "empty" : ""}>
                                            {formatCurrencyValue(rate.overweight)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                        <AccessorialItem>
                                          <AccessorialLabel>Prepull</AccessorialLabel>
                                          <AccessorialValue className={!rate.prepull ? "empty" : ""}>
                                            {formatCurrencyValue(rate.prepull)}
                                          </AccessorialValue>
                                        </AccessorialItem>
                                      </AccessorialsGrid>
                                    ) : (
                                      <div style={{ color: "rgb(148 163 184)", fontStyle: "italic" }}>
                                        No accessorial charges for this bid
                                      </div>
                                    )}
                                  </div>
                                </Collapse>
                              </ExpandableTableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableWrapper>

                {filteredRates.length === 0 && <EmptyState>No rates found matching your search criteria</EmptyState>}
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
              </CardHeader>

              <SearchContainer>
                <TextField
                  fullWidth
                  placeholder="Search by vendor ID, email..."
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
                        <TableCell sx={{ fontWeight: 700, width: "60px" }} />
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
                              Port Location
                            </TableSortLabel>
                          </TableCell>
                        )}
                        <TableCell sx={{ fontWeight: 700 }}>
                          <TableSortLabel
                            active={orderBy === "endCity"}
                            direction={orderBy === "endCity" ? order : "asc"}
                            onClick={() => handleSort("endCity")}
                          >
                            Inland Location
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
                          <TableRow key={rate.id} hover>
                            <TableCell
                              sx={{
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                                width: "60px",
                              }}
                            >
                              <ExpandButton onClick={() => toggleExpandRow(rate.id)}>
                                {expandedRows.includes(rate.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </ExpandButton>
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
                          <TableRow key={`${rate.id}-details`}>
                            <ExpandableTableCell colSpan={8}>
                              <Collapse in={expandedRows.includes(rate.id)} timeout="auto" unmountOnExit>
                                <div style={{ padding: "1rem 0" }}>
                                  <div style={{ fontWeight: 600, marginBottom: "1rem", color: "rgb(15 23 42)" }}>
                                    Accessorial Charges
                                  </div>
                                  {hasAccessorials(rate) ? (
                                    <AccessorialsGrid>
                                      <AccessorialItem>
                                        <AccessorialLabel>Chassis</AccessorialLabel>
                                        <AccessorialValue className={!rate.chassis ? "empty" : ""}>
                                          {formatCurrencyValue(rate.chassis)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Yard Storage</AccessorialLabel>
                                        <AccessorialValue className={!rate.yardStorage ? "empty" : ""}>
                                          {formatCurrencyValue(rate.yardStorage)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Hazmat</AccessorialLabel>
                                        <AccessorialValue className={!rate.hazmat ? "empty" : ""}>
                                          {formatCurrencyValue(rate.hazmat)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Bond</AccessorialLabel>
                                        <AccessorialValue className={!rate.bond ? "empty" : ""}>
                                          {formatCurrencyValue(rate.bond)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Split</AccessorialLabel>
                                        <AccessorialValue className={!rate.split ? "empty" : ""}>
                                          {formatCurrencyValue(rate.split)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Flip</AccessorialLabel>
                                        <AccessorialValue className={!rate.flip ? "empty" : ""}>
                                          {formatCurrencyValue(rate.flip)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Overweight</AccessorialLabel>
                                        <AccessorialValue className={!rate.overweight ? "empty" : ""}>
                                          {formatCurrencyValue(rate.overweight)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                      <AccessorialItem>
                                        <AccessorialLabel>Prepull</AccessorialLabel>
                                        <AccessorialValue className={!rate.prepull ? "empty" : ""}>
                                          {formatCurrencyValue(rate.prepull)}
                                        </AccessorialValue>
                                      </AccessorialItem>
                                    </AccessorialsGrid>
                                  ) : (
                                    <div style={{ color: "rgb(148 163 184)", fontStyle: "italic" }}>
                                      No accessorial charges for this bid
                                    </div>
                                  )}
                                </div>
                              </Collapse>
                            </ExpandableTableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableWrapper>

              {filteredRates.length === 0 && <EmptyState>No rates found matching your search criteria</EmptyState>}

              {/* TableFooter */}
            </ContentCard>
          )}
        </Container>
      </Main>

      <Dialog open={openAddDestDialog} onClose={() => setOpenAddDestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Destination</DialogTitle>
        <DialogContent>
          <div style={{ paddingTop: "1rem" }}>
            <Autocomplete
              options={US_CITIES}
              value={newDestination}
              inputValue={newDestinationInput}
              onInputChange={(event, newInputValue) => {
                setNewDestinationInput(newInputValue)
              }}
              onChange={(event, newValue) => {
                setNewDestination(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} label="Inland Location Route" placeholder="Type at least 3 characters..." />
              )}
              filterOptions={(options, state) => {
                if (state.inputValue.length < 3) return []
                return options.filter((option) => option.toLowerCase().includes(state.inputValue.toLowerCase()))
              }}
              noOptionsText={newDestinationInput.length < 3 ? "Type at least 3 characters" : "No cities found"}
            />
          </div>
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
          <Button onClick={handleAddDestination} variant="contained" color="primary" disabled={!newDestination}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  )
}
