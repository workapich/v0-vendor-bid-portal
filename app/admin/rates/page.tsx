"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
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
  const [orderBy, setOrderBy] = useState<keyof (typeof MOCK_RATES)[0]>("submittedAt")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)

  const handleSort = (property: keyof (typeof MOCK_RATES)[0]) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const filteredRates = MOCK_RATES.filter((rate) => {
    const matchesCity = selectedCity ? rate.startCity === selectedCity : true
    const matchesDestination =
      selectedCity === "Atlanta" && selectedDestination ? rate.endCity === selectedDestination : true
    const matchesSearch =
      rate.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.startCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.endCity.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCity && matchesDestination && matchesSearch
  }).sort((a, b) => {
    if (selectedCity === "Atlanta" && orderBy === "submittedAt") {
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
    selectedCity === "Atlanta"
      ? Array.from(new Set(MOCK_RATES.filter((r) => r.startCity === "Atlanta").map((r) => r.endCity))).sort()
      : []

  const handleExport = () => {
    alert("Exporting rates to CSV...")
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Vendor Bid Portal</h1>
            <p className="text-sm text-slate-600">Admin - Rate Management{selectedCity && ` - ${selectedCity}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-600">Admin Portal</span>
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push("/cities")}
            sx={{
              ml: 2,
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
            startIcon={<LogOut className="w-4 h-4" />}
            onClick={handleLogout}
            sx={{
              ml: 2,
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
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {selectedCity === "Atlanta" ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
              <div className="lg:col-span-1 max-h-[80vh] overflow-y-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200 flex flex-col h-[80vh] overflow-y-auto">
                  <h4 className="font-semibold text-slate-900 mb-4">Select Destination</h4>
                  <div className="space-y-2 overflow-y-auto flex-1">
                    <button
                      onClick={() => setSelectedDestination(null)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedDestination === null
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                      }`}
                    >
                      <div className="font-medium">All Destinations</div>
                      <div className={`text-sm ${selectedDestination === null ? "text-blue-100" : "text-slate-600"}`}>
                        {MOCK_RATES.filter((r) => r.startCity === "Atlanta").length} rates
                      </div>
                    </button>
                    {atlantaDestinations.map((dest) => {
                      const count = MOCK_RATES.filter((r) => r.startCity === "Atlanta" && r.endCity === dest).length
                      return (
                        <button
                          key={dest}
                          onClick={() => setSelectedDestination(dest)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            selectedDestination === dest
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                          }`}
                        >
                          <div className="font-medium">{dest}</div>
                          <div
                            className={`text-sm ${selectedDestination === dest ? "text-blue-100" : "text-slate-600"}`}
                          >
                            {count} {count === 1 ? "rate" : "rates"}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 max-h-[80vh] overflow-y-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Atlanta Vendor Rates
                        {selectedDestination && ` - ${selectedDestination}`}
                      </h2>
                      <p className="text-slate-600">
                        {selectedDestination
                          ? `Viewing rates for ${selectedDestination}`
                          : "Select a destination to view rates"}
                      </p>
                    </div>
                    <Button
                      variant="contained"
                      startIcon={<Download className="w-4 h-4" />}
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
                  </div>

                  <div className="mb-6">
                    <TextField
                      fullWidth
                      placeholder="Search by vendor ID, email, or city..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search className="w-5 h-5 text-slate-400" />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </div>

                  <div className="flex-1 overflow-auto">
                    <TableContainer component={Paper} variant="outlined" sx={{ height: "100%" }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow className="bg-slate-50">
                            <TableCell className="font-bold">
                              <TableSortLabel
                                active={orderBy === "vendorId"}
                                direction={orderBy === "vendorId" ? order : "asc"}
                                onClick={() => handleSort("vendorId")}
                              >
                                Vendor ID
                              </TableSortLabel>
                            </TableCell>
                            <TableCell className="font-bold">
                              <TableSortLabel
                                active={orderBy === "vendorEmail"}
                                direction={orderBy === "vendorEmail" ? order : "asc"}
                                onClick={() => handleSort("vendorEmail")}
                              >
                                Email
                              </TableSortLabel>
                            </TableCell>
                            <TableCell className="font-bold">
                              <TableSortLabel
                                active={orderBy === "endCity"}
                                direction={orderBy === "endCity" ? order : "asc"}
                                onClick={() => handleSort("endCity")}
                              >
                                Destination
                              </TableSortLabel>
                            </TableCell>
                            <TableCell className="font-bold">
                              <TableSortLabel
                                active={orderBy === "submittedAt"}
                                direction={orderBy === "submittedAt" ? order : "asc"}
                                onClick={() => handleSort("submittedAt")}
                              >
                                Submitted
                              </TableSortLabel>
                            </TableCell>
                            <TableCell className="font-bold" align="right">
                              <TableSortLabel
                                active={orderBy === "baseRate"}
                                direction={orderBy === "baseRate" ? order : "asc"}
                                onClick={() => handleSort("baseRate")}
                              >
                                Base Rate
                              </TableSortLabel>
                            </TableCell>
                            <TableCell className="font-bold" align="right">
                              <TableSortLabel
                                active={orderBy === "fsc"}
                                direction={orderBy === "fsc" ? order : "asc"}
                                onClick={() => handleSort("fsc")}
                              >
                                FSC %
                              </TableSortLabel>
                            </TableCell>
                            <TableCell className="font-bold" align="right">
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
                              <TableCell className="font-mono text-sm">{rate.vendorId}</TableCell>
                              <TableCell>{rate.vendorEmail}</TableCell>
                              <TableCell>{rate.endCity}</TableCell>
                              <TableCell className="text-sm text-slate-600">{rate.submittedAt}</TableCell>
                              <TableCell align="right">${rate.baseRate.toFixed(2)}</TableCell>
                              <TableCell align="right">{rate.fsc.toFixed(2)}%</TableCell>
                              <TableCell align="right">
                                <span className="font-bold text-blue-600">${rate.total.toFixed(2)}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {filteredRates.length === 0 && (
                    <div className="text-center py-12 text-slate-500">No rates found matching your search criteria</div>
                  )}

                  <div className="mt-4 text-sm text-slate-600">Showing {filteredRates.length} rates</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {selectedCity ? `${selectedCity} Vendor Rates` : "All Vendor Rates"}
                  </h2>
                  <p className="text-slate-600">
                    {selectedCity
                      ? `View and manage bids starting from ${selectedCity}`
                      : "View and manage all submitted vendor bids"}
                  </p>
                </div>
                <Button
                  variant="contained"
                  startIcon={<Download className="w-4 h-4" />}
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
              </div>

              <div className="mb-6">
                <TextField
                  fullWidth
                  placeholder="Search by vendor ID, email, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="w-5 h-5 text-slate-400" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </div>

              <div className="max-h-[50vh] overflow-auto">
                <TableContainer component={Paper} variant="outlined">
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow className="bg-slate-50">
                        <TableCell className="font-bold">
                          <TableSortLabel
                            active={orderBy === "vendorId"}
                            direction={orderBy === "vendorId" ? order : "asc"}
                            onClick={() => handleSort("vendorId")}
                          >
                            Vendor ID
                          </TableSortLabel>
                        </TableCell>
                        <TableCell className="font-bold">
                          <TableSortLabel
                            active={orderBy === "vendorEmail"}
                            direction={orderBy === "vendorEmail" ? order : "asc"}
                            onClick={() => handleSort("vendorEmail")}
                          >
                            Email
                          </TableSortLabel>
                        </TableCell>
                        {!selectedCity && (
                          <TableCell className="font-bold">
                            <TableSortLabel
                              active={orderBy === "startCity"}
                              direction={orderBy === "startCity" ? order : "asc"}
                              onClick={() => handleSort("startCity")}
                            >
                              Start City
                            </TableSortLabel>
                          </TableCell>
                        )}
                        <TableCell className="font-bold">
                          <TableSortLabel
                            active={orderBy === "endCity"}
                            direction={orderBy === "endCity" ? order : "asc"}
                            onClick={() => handleSort("endCity")}
                          >
                            Destination
                          </TableSortLabel>
                        </TableCell>
                        <TableCell className="font-bold">
                          <TableSortLabel
                            active={orderBy === "submittedAt"}
                            direction={orderBy === "submittedAt" ? order : "asc"}
                            onClick={() => handleSort("submittedAt")}
                          >
                            Submitted
                          </TableSortLabel>
                        </TableCell>
                        <TableCell className="font-bold" align="right">
                          <TableSortLabel
                            active={orderBy === "baseRate"}
                            direction={orderBy === "baseRate" ? order : "asc"}
                            onClick={() => handleSort("baseRate")}
                          >
                            Base Rate
                          </TableSortLabel>
                        </TableCell>
                        <TableCell className="font-bold" align="right">
                          <TableSortLabel
                            active={orderBy === "fsc"}
                            direction={orderBy === "fsc" ? order : "asc"}
                            onClick={() => handleSort("fsc")}
                          >
                            FSC %
                          </TableSortLabel>
                        </TableCell>
                        <TableCell className="font-bold" align="right">
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
                          <TableCell className="font-mono text-sm">{rate.vendorId}</TableCell>
                          <TableCell>{rate.vendorEmail}</TableCell>
                          {!selectedCity && (
                            <TableCell>
                              <span className="font-medium">{rate.startCity}</span>
                            </TableCell>
                          )}
                          <TableCell>{rate.endCity}</TableCell>
                          <TableCell className="text-sm text-slate-600">{rate.submittedAt}</TableCell>
                          <TableCell align="right">${rate.baseRate.toFixed(2)}</TableCell>
                          <TableCell align="right">{rate.fsc.toFixed(2)}%</TableCell>
                          <TableCell align="right">
                            <span className="font-bold text-blue-600">${rate.total.toFixed(2)}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {filteredRates.length === 0 && (
                <div className="text-center py-12 text-slate-500">No rates found matching your search criteria</div>
              )}

              <div className="mt-4 text-sm text-slate-600">
                Showing {filteredRates.length} of {MOCK_RATES.length} total rates
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
