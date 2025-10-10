"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { TextField, Button, Divider, InputAdornment } from "@mui/material"
import { Truck, ArrowLeft, Check } from "lucide-react"

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
  // Add more cities as needed
}

export default function BidPage() {
  const params = useParams()
  const router = useRouter()
  const city = params.city as string
  const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)
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

  const destinations = DESTINATIONS[city as keyof typeof DESTINATIONS] || DESTINATIONS.boston

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.baseRate) newErrors.baseRate = "Base rate is required"
    if (!formData.fsc) newErrors.fsc = "FSC is required"
    if (!formData.total) newErrors.total = "Total is required"

    if (formData.baseRate && isNaN(Number(formData.baseRate))) {
      newErrors.baseRate = "Must be a number"
    }
    if (formData.fsc && isNaN(Number(formData.fsc))) {
      newErrors.fsc = "Must be a number"
    }
    if (formData.total && isNaN(Number(formData.total))) {
      newErrors.total = "Must be a number"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
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
        <Button variant="outlined" startIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => router.push("/cities")}>
          Back to Cities
        </Button>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">Starting route:</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{cityName.toUpperCase()}</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Submit Your Bid</h3>
            <p className="text-gray-600">Select the destination and then fill up the rates!</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-600">Pickup Location</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="font-medium text-gray-900">End Location & Rates</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Destinations */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6 h-[50vh] overflow-y-auto">
                <h4 className="font-semibold text-gray-900 mb-4">Select Destination</h4>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setSelectedDestination(dest.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedDestination === dest.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      <div className="font-medium">{dest.name}</div>
                    
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {!selectedDestination ? (
                  <div className="text-center py-12 text-gray-500">
                    Please select a destination from the left sidebar to enter rates
                  </div>
                ) : (
                  <>
                    {/* Required Fields */}
                    <div className="mb-8">
                      <div className="bg-blue-50 px-4 py-3 rounded-t-lg border-b-2 border-blue-600">
                        <h4 className="font-bold text-gray-900 text-lg">REQUIRED FIELDS</h4>
                      </div>
                      <div className="p-6 border border-t-0 rounded-b-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <TextField
                            label="Base Rate"
                            value={formData.baseRate}
                            onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
                            error={!!errors.baseRate}
                            helperText={errors.baseRate}
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                          <TextField
                            label="FSC"
                            value={formData.fsc}
                            onChange={(e) => setFormData({ ...formData, fsc: e.target.value })}
                            error={!!errors.fsc}
                            helperText={errors.fsc}
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                          />
                          <TextField
                            label="Total"
                            value={formData.total}
                            error={!!errors.total}
                            helperText={errors.total || "Auto-calculated: Base Rate + FSC%"}
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              readOnly: true,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Optional Fields */}
                    <div className="mb-8">
                      <div className="bg-gray-100 px-4 py-3 rounded-t-lg border-b-2 border-gray-400">
                        <h4 className="font-bold text-gray-900 text-lg">OPTIONAL FIELDS</h4>
                      </div>
                      <div className="p-6 border border-t-0 rounded-b-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <TextField
                            label="Optional #1"
                            value={formData.optional1}
                            onChange={(e) => setFormData({ ...formData, optional1: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #2"
                            value={formData.optional2}
                            onChange={(e) => setFormData({ ...formData, optional2: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #3"
                            value={formData.optional3}
                            onChange={(e) => setFormData({ ...formData, optional3: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #4"
                            value={formData.optional4}
                            onChange={(e) => setFormData({ ...formData, optional4: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #5"
                            value={formData.optional5}
                            onChange={(e) => setFormData({ ...formData, optional5: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #6"
                            value={formData.optional6}
                            onChange={(e) => setFormData({ ...formData, optional6: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #7"
                            value={formData.optional7}
                            onChange={(e) => setFormData({ ...formData, optional7: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                          <TextField
                            label="Optional #8"
                            value={formData.optional8}
                            onChange={(e) => setFormData({ ...formData, optional8: e.target.value })}
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      </div>
                    </div>


                    <div className="flex justify-end">
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                      >
                        Submit Bid
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
