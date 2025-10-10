"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { TextField, Chip, InputAdornment, Button } from "@mui/material"
import { Search, Truck, LogOut, BarChart3, TrendingUp } from "lucide-react"

const CITIES = [
  { name: "Atlanta", routes: 12, newRoutes: 3, totalBids: 45 },
  { name: "Austin", routes: 8, newRoutes: 0, totalBids: 18 },
  { name: "Boston", routes: 15, newRoutes: 5, totalBids: 32 },
  { name: "Buffalo", routes: 6, newRoutes: 1, totalBids: 12 },
  { name: "Chicago", routes: 20, newRoutes: 2, totalBids: 56 },
  { name: "Cleveland", routes: 9, newRoutes: 0, totalBids: 21 },
  { name: "Dallas", routes: 18, newRoutes: 4, totalBids: 48 },
  { name: "Denver", routes: 11, newRoutes: 1, totalBids: 28 },
  { name: "El Paso", routes: 7, newRoutes: 0, totalBids: 15 },
  { name: "Fresno", routes: 5, newRoutes: 0, totalBids: 9 },
  { name: "Houston", routes: 16, newRoutes: 3, totalBids: 41 },
  { name: "Indianapolis", routes: 10, newRoutes: 2, totalBids: 24 },
  { name: "Jacksonville", routes: 8, newRoutes: 1, totalBids: 19 },
  { name: "Kansas City", routes: 9, newRoutes: 0, totalBids: 22 },
  { name: "Las Vegas", routes: 12, newRoutes: 2, totalBids: 31 },
  { name: "Los Angeles", routes: 25, newRoutes: 6, totalBids: 67 },
  { name: "Miami", routes: 14, newRoutes: 3, totalBids: 38 },
  { name: "Milwaukee", routes: 7, newRoutes: 0, totalBids: 16 },
  { name: "Nashville", routes: 11, newRoutes: 1, totalBids: 27 },
  { name: "New Orleans", routes: 9, newRoutes: 2, totalBids: 23 },
  { name: "New York", routes: 22, newRoutes: 5, totalBids: 59 },
  { name: "Oklahoma City", routes: 8, newRoutes: 0, totalBids: 17 },
  { name: "Orlando", routes: 10, newRoutes: 1, totalBids: 25 },
  { name: "Philadelphia", routes: 17, newRoutes: 4, totalBids: 44 },
  { name: "Phoenix", routes: 13, newRoutes: 2, totalBids: 34 },
  { name: "Portland", routes: 10, newRoutes: 1, totalBids: 26 },
  { name: "Raleigh", routes: 8, newRoutes: 0, totalBids: 18 },
  { name: "Sacramento", routes: 9, newRoutes: 1, totalBids: 21 },
  { name: "San Antonio", routes: 12, newRoutes: 2, totalBids: 30 },
  { name: "San Diego", routes: 14, newRoutes: 3, totalBids: 36 },
  { name: "San Francisco", routes: 16, newRoutes: 4, totalBids: 42 },
  { name: "Seattle", routes: 15, newRoutes: 3, totalBids: 39 },
  { name: "St. Louis", routes: 11, newRoutes: 1, totalBids: 28 },
  { name: "Tampa", routes: 10, newRoutes: 2, totalBids: 26 },
  { name: "Tucson", routes: 6, newRoutes: 0, totalBids: 13 },
  { name: "Virginia Beach", routes: 7, newRoutes: 1, totalBids: 16 },
  { name: "Washington D.C.", routes: 19, newRoutes: 4, totalBids: 51 },
]

export default function CitiesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [userType, setUserType] = useState<"vendor" | "admin">("vendor")

  useEffect(() => {
    const type = localStorage.getItem("userType") as "vendor" | "admin"
    if (type) setUserType(type)
  }, [])

  const filteredCities = CITIES.filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleCityClick = (cityName: string) => {
    if (userType === "admin") {
      router.push(`/admin/rates?city=${cityName}`)
    } else {
      router.push(`/bid/${cityName.toLowerCase().replace(/\s+/g, "-")}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/")
  }

  const totalBids = CITIES.reduce((sum, city) => sum + city.totalBids, 0)
  const totalRoutes = CITIES.reduce((sum, city) => sum + city.routes, 0)
  const activeCities = CITIES.length

  if (userType === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Vendor Bid Portal</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              Secure Portal
            </div>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              startIcon={<LogOut className="w-4 h-4" />}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Rate Management Dashboard</h2>
            <p className="text-gray-600">View and manage vendor bids across all cities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total Bids</span>
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalBids}</div>
              <p className="text-sm text-gray-500 mt-1">Across all cities</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Active Routes</span>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalRoutes}</div>
              <p className="text-sm text-gray-500 mt-1">Available destinations</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Active Cities</span>
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{activeCities}</div>
              <p className="text-sm text-gray-500 mt-1">Serviced locations</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select City to View Rates</h3>
              <p className="text-gray-600">Click on any city to view all vendor bids and rates</p>
            </div>

            <div className="mb-6">
              <TextField
                fullWidth
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="w-5 h-5 text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {filteredCities.map((city) => (
                <Chip
                  key={city.name}
                  label={
                    <span className="flex items-center gap-2">
                      {city.name}
                      <span className="text-xs text-gray-500">({city.totalBids} bids)</span>
                    </span>
                  }
                  onClick={() => handleCityClick(city.name)}
                  className="text-base py-6 px-4 hover:bg-blue-50 cursor-pointer transition-colors"
                  variant="outlined"
                />
              ))}
            </div>

            {filteredCities.length === 0 && (
              <div className="text-center py-12 text-gray-500">No cities found matching "{searchTerm}"</div>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vendor Bid Portal</h1>
            <p className="text-sm text-gray-600">Motor Carrier Services</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            Secure Portal
          </div>
          <Button
            variant="outlined"
            size="small"
            onClick={handleLogout}
            startIcon={<LogOut className="w-4 h-4" />}
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Bid</h2>
            <p className="text-gray-600">Select the starting city to view and submit rates</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <span className="font-medium text-gray-900">Choose Starting Point</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="font-medium text-gray-600">Input Rates</span>
            </div>
          </div>

          <div className="mb-6">
            <TextField
              fullWidth
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-gray-400" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filteredCities.map((city) => (
              <Chip
                key={city.name}
                label={
                  <span className="flex items-center gap-2">
                    {city.name}
                    {city.newRoutes > 0 && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {city.newRoutes}
                      </span>
                    )}
                  </span>
                }
                onClick={() => handleCityClick(city.name)}
                className="text-base py-6 px-4 hover:bg-blue-50 cursor-pointer transition-colors"
                variant="outlined"
              />
            ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-12 text-gray-500">No cities found matching "{searchTerm}"</div>
          )}
        </div>
      </main>
    </div>
  )
}
