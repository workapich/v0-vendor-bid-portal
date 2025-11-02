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
  Collapse,
  Box,
} from "@mui/material"
import { Truck, LogOut, Search, ChevronDown, ChevronUp } from "lucide-react"

// Mock data for US cities
const US_CITIES = [
  "Akron, OH",
  "Albuquerque, NM",
  "Alexandria, VA",
  "Anaheim, CA",
  "Anchorage, AK",
  "Arlington, TX",
  "Atlanta, GA",
  "Augusta, GA",
  "Aurora, CO",
  "Austin, TX",
  "Bakersfield, CA",
  "Baltimore, MD",
  "Baton Rouge, LA",
  "Birmingham, AL",
  "Boise, ID",
  "Boston, MA",
  "Boulder, CO",
  "Buffalo, NY",
  "Burlington, VT",
  "Chandler, AZ",
  "Charlotte, NC",
  "Chattanooga, TN",
  "Chesapeake, VA",
  "Chicago, IL",
  "Chula Vista, CA",
  "Cincinnati, OH",
  "Cleveland, OH",
  "Colorado Springs, CO",
  "Columbia, SC",
  "Columbus, OH",
  "Corpus Christi, TX",
  "Dallas, TX",
  "Davis, CA",
  "Denver, CO",
  "Des Moines, IA",
  "Detroit, MI",
  "Durham, NC",
  "El Paso, TX",
  "Eugene, OR",
  "Fayetteville, NC",
  "Flagstaff, AZ",
  "Fontana, CA",
  "Fort Collins, CO",
  "Fort Lauderdale, FL",
  "Fort Wayne, IN",
  "Fort Worth, TX",
  "Franklin, NH",
  "Fremont, CA",
  "Fresno, CA",
  "Gilbert, AZ",
  "Glendale, AZ",
  "Greensboro, NC",
  "Greenville, SC",
  "Hartford, CT",
  "Hialeah, FL",
  "Honolulu, HI",
  "Houston, TX",
  "Indianapolis, IN",
  "Irvine, CA",
  "Irving, TX",
  "Jacksonville, FL",
  "Jersey City, NJ",
  "Kansas City, MO",
  "Key West, FL",
  "Knoxville, TN",
  "Laredo, TX",
  "Las Vegas, NV",
  "Lexington, KY",
  "Lincoln, NE",
  "Little Rock, AR",
  "Long Beach, CA",
  "Los Angeles, CA",
  "Louisville, KY",
  "Lubbock, TX",
  "Madison, WI",
  "Manchester, NH",
  "Memphis, TN",
  "Miami, FL",
  "Milwaukee, WI",
  "Minneapolis, MN",
  "Modesto, CA",
  "Moreno Valley, CA",
  "Nashville, TN",
  "New Haven, CT",
  "New Orleans, LA",
  "New York, NY",
  "Newark, NJ",
  "Newport Beach, CA",
  "Norfolk, VA",
  "Oakland, CA",
  "Oklahoma City, OK",
  "Omaha, NE",
  "Orlando, FL",
  "Overland Park, KS",
  "Oxnard, CA",
  "Philadelphia, PA",
  "Phoenix, AZ",
  "Pittsburgh, PA",
  "Plano, TX",
  "Portland, OR",
  "Portland, ME",
  "Providence, RI",
  "Raleigh, NC",
  "Rancho Cucamonga, CA",
  "Reno, NV",
  "Richmond, VA",
  "Riverside, CA",
  "Rochester, NY",
  "Sacramento, CA",
  "Saint Paul, MN",
  "Salem, OR",
  "Saltish, CA",
  "San Antonio, TX",
  "San Diego, CA",
  "San Francisco, CA",
  "San Jose, CA",
  "Santa Ana, CA",
  "Santa Clarita, CA",
  "Santa Rosa, CA",
  "Savannah, GA",
  "Scottsdale, AZ",
  "Seattle, WA",
  "Shreveport, LA",
  "Slatersville, RI",
  "Spokane, WA",
  "Springfield, IL",
  "Springfield, MA",
  "Springfield, MO",
  "St. Louis, MO",
  "Stamford, CT",
  "Stockton, CA",
  "Syracuse, NY",
  "Tallahassee, FL",
  "Tampa, FL",
  "Tempe, AZ",
  "Thornton, CO",
  "Thousand Oaks, CA",
  "Toledo, OH",
  "Toronto, ON",
  "Torrance, CA",
  "Tucson, AZ",
  "Tulsa, OK",
  "Vancouver, BC",
  "Virginia Beach, VA",
  "Washington, DC",
  "Wichita, KS",
  "Worcester, MA",
]

const DESTINATIONS: Record<string, Record<number, string>> = {
  boston: {
    1: "Franklin, NH",
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
  chassis?: string
  yardStorage?: string
  hazmat?: string
  bond?: string
  split?: string
  flip?: string
  overweight?: string
  prepull?: string
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
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: rgb(15 23 42);
`

const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  color: rgb(100 116 139);
  margin: 0;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  flex: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SidebarTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: rgb(15 23 42);
  margin: 0 0 0.5rem 0;
`

const DestinationButton = styled(Button)<{ isSelected?: boolean }>`
  && {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    padding: 0.75rem 1rem;
    background: ${(props) => (props.isSelected ? "rgb(37 99 235)" : "white")};
    color: ${(props) => (props.isSelected ? "white" : "rgb(15 23 42)")};
    border: 1px solid ${(props) => (props.isSelected ? "transparent" : "rgb(226 232 240)")};
    text-transform: none;
    font-weight: 500;
    
    &:hover {
      background: ${(props) => (props.isSelected ? "rgb(29 78 216)" : "rgb(248 250 252)")};
    }
  }
`

const ContentCard = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgb(226 232 240);
`

const SearchBox = styled(TextField)`
  && {
    flex: 1;
    max-width: 400px;
    
    .MuiOutlinedInput-root {
      background: white;
      border-radius: 0.5rem;
      
      &:hover fieldset {
        border-color: rgb(148 163 184);
      }
      
      &.Mui-focused fieldset {
        border-color: rgb(37 99 235);
      }
    }
  }
`

const TableWrapper = styled.div`
  overflow-x: auto;
  flex: 1;
`

const StyledTableCell = styled(TableCell)<{ isTotal?: boolean }>`
  && {
    padding: 1rem;
    border-bottom: 1px solid rgb(226 232 240);
    background: ${(props) => (props.isTotal ? "rgb(237 242 247)" : "white")};
    color: ${(props) => (props.isTotal ? "rgb(37 99 235)" : "rgb(15 23 42)")};
    font-weight: ${(props) => (props.isTotal ? "600" : "500")};
  }
`

const ExpandedDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  background: rgb(248 250 252);
  border-top: 1px solid rgb(226 232 240);
`

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgb(100 116 139);
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }
  
  value {
    font-size: 0.875rem;
    color: rgb(15 23 42);
  }
`

export default function AdminRatesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [orderBy, setOrderBy] = useState<keyof RateData>("submittedAt")
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [rates, setRates] = useState<RateData[]>([])
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [openAddDestDialog, setOpenAddDestDialog] = useState(false)
  const [newDestination, setNewDestination] = useState("")
  const [newDestinationInput, setNewDestinationInput] = useState("")
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  useEffect(() => {
    const city = searchParams.get("city")
    if (city) {
      setSelectedCity(city)
    }
    loadRates()
  }, [])

  const loadRates = async () => {
    const storedRates = localStorage.getItem("rates")
    if (storedRates) {
      try {
        setRates(JSON.parse(storedRates))
      } catch (e) {
        console.error("Error loading rates:", e)
        setRates([])
      }
    }
  }

  const handleSort = (property: keyof RateData) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleAddDestination = () => {
    if (newDestination && selectedCity) {
      const newRate: RateData = {
        id: Date.now().toString(),
        vendorId: "VENDOR001",
        vendorEmail: "vendor@example.com",
        startCity: selectedCity,
        endCity: newDestination,
        baseRate: 0,
        fsc: 0,
        total: 0,
        submittedAt: new Date().toISOString(),
      }
      const updatedRates = [...rates, newRate]
      setRates(updatedRates)
      localStorage.setItem("rates", JSON.stringify(updatedRates))
      setNewDestination("")
      setNewDestinationInput("")
      setOpenAddDestDialog(false)
    }
  }

  // Filter rates based on selection
  const filteredRates = rates.filter((rate) => {
    const matchesSearch =
      searchTerm === "" ||
      rate.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.startCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.endCity.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCity = !selectedCity || rate.startCity === selectedCity
    const matchesDestination = !selectedDestination || rate.endCity === selectedDestination

    return matchesSearch && matchesCity && matchesDestination
  })

  // Sort rates
  const sortedRates = [...filteredRates].sort((a, b) => {
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

  const destinations = selectedCity ? Object.values(DESTINATIONS).flatMap(Object.values) : []

  const hasOptionalData = (rate: RateData) => {
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

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <LogoCircle>
            <Truck size={24} color="white" />
          </LogoCircle>
          <HeaderText>
            <HeaderTitle>Admin Portal</HeaderTitle>
            <HeaderSubtitle>Manage Vendor Rates</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <HeaderActions>
          <Button
            onClick={handleLogout}
            variant="outlined"
            startIcon={<LogOut size={16} />}
            sx={{
              color: "rgb(100 116 139)",
              borderColor: "rgb(226 232 240)",
              "&:hover": {
                borderColor: "rgb(148 163 184)",
                backgroundColor: "rgb(248 250 252)",
              },
            }}
          >
            Logout
          </Button>
        </HeaderActions>
      </Header>

      {!selectedCity ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2 style={{ color: "rgb(15 23 42)", marginBottom: "1rem" }}>Select a City</h2>
          <p style={{ color: "rgb(100 116 139)", marginBottom: "2rem" }}>Please select a starting city to view rates</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {US_CITIES.slice(0, 12).map((city) => (
              <Button
                key={city}
                variant="contained"
                onClick={() => setSelectedCity(city)}
                sx={{
                  background: "rgb(37 99 235)",
                  "&:hover": {
                    background: "rgb(29 78 216)",
                  },
                }}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <GridContainer>
          <Sidebar>
            <div>
              <SidebarTitle>Starting City</SidebarTitle>
              <DestinationButton isSelected={true} onClick={() => setSelectedCity(null)}>
                {selectedCity}
              </DestinationButton>
            </div>
          </Sidebar>

          <ContentCard>
            <ContentHeader>
              <SearchBox
                placeholder="Search vendor ID, email, or cities..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="rgb(148 163 184)" />
                    </InputAdornment>
                  ),
                }}
              />
            </ContentHeader>

            <TableWrapper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "rgb(248 250 252)" }}>
                      <StyledTableCell style={{ width: "40px" }}></StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={orderBy === "vendorId"}
                          direction={orderBy === "vendorId" ? order : "asc"}
                          onClick={() => handleSort("vendorId")}
                        >
                          Vendor ID
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={orderBy === "vendorEmail"}
                          direction={orderBy === "vendorEmail" ? order : "asc"}
                          onClick={() => handleSort("vendorEmail")}
                        >
                          Email
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={orderBy === "endCity"}
                          direction={orderBy === "endCity" ? order : "asc"}
                          onClick={() => handleSort("endCity")}
                        >
                          Destination
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          active={orderBy === "submittedAt"}
                          direction={orderBy === "submittedAt" ? order : "asc"}
                          onClick={() => handleSort("submittedAt")}
                        >
                          Submitted
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TableSortLabel
                          active={orderBy === "baseRate"}
                          direction={orderBy === "baseRate" ? order : "asc"}
                          onClick={() => handleSort("baseRate")}
                        >
                          Base Rate
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TableSortLabel
                          active={orderBy === "fsc"}
                          direction={orderBy === "fsc" ? order : "asc"}
                          onClick={() => handleSort("fsc")}
                        >
                          FSC %
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell align="right" isTotal>
                        <TableSortLabel
                          active={orderBy === "total"}
                          direction={orderBy === "total" ? order : "asc"}
                          onClick={() => handleSort("total")}
                        >
                          Total
                        </TableSortLabel>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRates.length === 0 ? (
                      <TableRow>
                        <StyledTableCell colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>
                          No rates found for this selection
                        </StyledTableCell>
                      </TableRow>
                    ) : (
                      sortedRates.map((rate) => (
                        <Box key={rate.id}>
                          <TableRow
                            sx={{
                              cursor: hasOptionalData(rate) ? "pointer" : "default",
                              "&:hover": {
                                background: hasOptionalData(rate) ? "rgb(241 245 249)" : "transparent",
                              },
                            }}
                            onClick={() => {
                              if (hasOptionalData(rate)) {
                                setExpandedRowId(expandedRowId === rate.id ? null : rate.id)
                              }
                            }}
                          >
                            <StyledTableCell>
                              {hasOptionalData(rate) &&
                                (expandedRowId === rate.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                            </StyledTableCell>
                            <StyledTableCell>{rate.vendorId}</StyledTableCell>
                            <StyledTableCell>{rate.vendorEmail}</StyledTableCell>
                            <StyledTableCell>{rate.endCity}</StyledTableCell>
                            <StyledTableCell>{new Date(rate.submittedAt).toLocaleDateString()}</StyledTableCell>
                            <StyledTableCell align="right">${rate.baseRate.toFixed(2)}</StyledTableCell>
                            <StyledTableCell align="right">{rate.fsc}%</StyledTableCell>
                            <StyledTableCell align="right" isTotal>
                              ${rate.total.toFixed(2)}
                            </StyledTableCell>
                          </TableRow>
                          {hasOptionalData(rate) && expandedRowId === rate.id && (
                            <TableRow>
                              <StyledTableCell colSpan={8} style={{ padding: 0 }}>
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                  <ExpandedDetailsGrid>
                                    {rate.chassis && (
                                      <DetailItem>
                                        <label>Chassis</label>
                                        <value>{rate.chassis}</value>
                                      </DetailItem>
                                    )}
                                    {rate.yardStorage && (
                                      <DetailItem>
                                        <label>Yard Storage</label>
                                        <value>{rate.yardStorage}</value>
                                      </DetailItem>
                                    )}
                                    {rate.hazmat && (
                                      <DetailItem>
                                        <label>Hazmat</label>
                                        <value>{rate.hazmat}</value>
                                      </DetailItem>
                                    )}
                                    {rate.bond && (
                                      <DetailItem>
                                        <label>Bond</label>
                                        <value>{rate.bond}</value>
                                      </DetailItem>
                                    )}
                                    {rate.split && (
                                      <DetailItem>
                                        <label>Split</label>
                                        <value>{rate.split}</value>
                                      </DetailItem>
                                    )}
                                    {rate.flip && (
                                      <DetailItem>
                                        <label>Flip</label>
                                        <value>{rate.flip}</value>
                                      </DetailItem>
                                    )}
                                    {rate.overweight && (
                                      <DetailItem>
                                        <label>Overweight</label>
                                        <value>{rate.overweight}</value>
                                      </DetailItem>
                                    )}
                                    {rate.prepull && (
                                      <DetailItem>
                                        <label>Prepull</label>
                                        <value>{rate.prepull}</value>
                                      </DetailItem>
                                    )}
                                  </ExpandedDetailsGrid>
                                </Collapse>
                              </StyledTableCell>
                            </TableRow>
                          )}
                        </Box>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableWrapper>
          </ContentCard>
        </GridContainer>
      )}
    </PageContainer>
  )
}
