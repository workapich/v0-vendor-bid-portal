"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { TextField, Chip, InputAdornment, Button } from "@mui/material"
import { Search, Truck, LogOut, TrendingUp, Star, Clock, Users } from "lucide-react"

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
  gap: 1rem;
  margin-left: auto;
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

const Main = styled.main`
  flex: 1;
  padding: 1.5rem;
  max-width: 112rem;
  margin: 0 auto;
  width: 100%;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
`

const ActionCard = styled.div`
  background: linear-gradient(135deg, rgb(239 246 255), rgb(219 234 254));
  border: 2px solid rgb(191 219 254);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.75rem;

  &:hover {
    background: linear-gradient(135deg, rgb(219 234 254), rgb(191 219 254));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
`

const ActionCardIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: rgb(37 99 235);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionCardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(37 99 235);
  margin: 0;
`

const ActionCardDescription = styled.p`
  font-size: 0.875rem;
  color: rgb(71 85 105);
  margin: 0;
`

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(71 85 105);
`

const StatValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2rem;
  margin-top: 0.5rem;
`

const StatMainValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(15 23 42);
`

const StatInlineMetrics = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: baseline;
`

const InlineMetric = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

const InlineMetricLabel = styled.span`
  font-size: 0.75rem;
  color: rgb(100 116 139);
  font-weight: 500;
`

const InlineMetricValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: rgb(37 99 235);
`

const StatDescription = styled.p`
  font-size: 0.875rem;
  color: rgb(100 116 139);
  margin-top: 0.25rem;
`

const QuickActionsCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const QuickActionsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin: 0 0 1rem 0;
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`

const QuickActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgb(239 246 255), rgb(219 234 254));
  border: 2px solid rgb(191 219 254);
  border-radius: 0.5rem;
  color: rgb(37 99 235);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, rgb(219 234 254), rgb(191 219 254));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
`

const ContentCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 2rem;
`

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`

const CardTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin-bottom: 0.5rem;
`

const CardDescription = styled.p`
  color: rgb(71 85 105);
`

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const StepCircle = styled.div<{ $active?: boolean; $outline?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  background: ${(props) => (props.$outline ? "transparent" : "rgb(37 99 235)")};
  border: ${(props) => (props.$outline ? "2px solid rgb(37 99 235)" : "none")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$outline ? "rgb(37 99 235)" : "white")};
  font-weight: 700;
`

const StepLabel = styled.span<{ $active?: boolean }>`
  font-weight: 500;
  color: ${(props) => (props.$active ? "rgb(15 23 42)" : "rgb(71 85 105)")};
`

const StepDivider = styled.div`
  width: 4rem;
  height: 0.125rem;
  background: rgb(209 213 219);
`

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const StyledChip = styled(Chip)`
  font-size: 1rem !important;
  padding: 1.5rem 1rem !important;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(239 246 255) !important;
  }
`

const FavoriteStarIcon = styled(Star)`
  width: 1rem;
  height: 1rem;
  color: rgb(37 99 235);
  fill: rgb(37 99 235);
  margin-left: 0.25rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: rgb(100 116 139);
`

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
  const [favoriteCities, setFavoriteCities] = useState<string[]>([])

  useEffect(() => {
    const type = localStorage.getItem("userType") as "vendor" | "admin"
    if (type) setUserType(type)

    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    setFavoriteCities(favorites)
  }, [])

  const filteredCities = CITIES.filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase())).sort(
    (a, b) => {
      const aIsFavorite = favoriteCities.includes(a.name)
      const bIsFavorite = favoriteCities.includes(b.name)

      if (aIsFavorite && !bIsFavorite) return -1
      if (!aIsFavorite && bIsFavorite) return 1
      return 0
    },
  )

  const handleCityClick = (cityName: string) => {
    if (userType === "admin") {
      router.push(`/admin/vendors`)
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

  const bidsLast24Hours = 23
  const bidsLast7Days = 147

  if (userType === "admin") {
    return (
      <PageContainer>
        <Header>
          <HeaderContent>
            <LogoCircle>
              <Truck style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
            </LogoCircle>
            <HeaderText>
              <HeaderTitle>Vendor Bid Portal</HeaderTitle>
              <HeaderSubtitle>Admin Dashboard</HeaderSubtitle>
            </HeaderText>
          </HeaderContent>
          <HeaderActions>
            <StatusIndicator>
              <StatusDot />
              Secure Portal
            </StatusIndicator>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              startIcon={<LogOut style={{ width: "1rem", height: "1rem" }} />}
              sx={{
                color: "rgb(55 65 81)",
                borderColor: "rgb(209 213 219)",
                "&:hover": {
                  backgroundColor: "rgb(249 250 251)",
                },
              }}
            >
              Logout
            </Button>
          </HeaderActions>
        </Header>

        <Main>
          <CardHeader>
            <CardTitle>Rate Management Dashboard</CardTitle>
            <CardDescription>View and manage vendor bids across all cities</CardDescription>
          </CardHeader>

          <StatsGrid>
            <ActionCard onClick={() => router.push("/admin/vendors")}>
              <ActionCardIcon>
                <Users style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
              </ActionCardIcon>
              <ActionCardTitle>Manage Vendors</ActionCardTitle>
              <ActionCardDescription>View and create vendors</ActionCardDescription>
            </ActionCard>

            <StatCard>
              <StatHeader>
                <StatLabel>Total Bids</StatLabel>
                <Clock style={{ width: "1.25rem", height: "1.25rem", color: "rgb(37 99 235)" }} />
              </StatHeader>
              <StatValueRow>
                <StatMainValue>{totalBids}</StatMainValue>
                <StatInlineMetrics>
                  <InlineMetric>
                    <InlineMetricLabel>Last 24h:</InlineMetricLabel>
                    <InlineMetricValue>{bidsLast24Hours}</InlineMetricValue>
                  </InlineMetric>
                  <InlineMetric>
                    <InlineMetricLabel>Last 7d:</InlineMetricLabel>
                    <InlineMetricValue>{bidsLast7Days}</InlineMetricValue>
                  </InlineMetric>
                </StatInlineMetrics>
              </StatValueRow>
              <StatDescription>All time submissions</StatDescription>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatLabel>Active Routes</StatLabel>
                <TrendingUp style={{ width: "1.25rem", height: "1.25rem", color: "rgb(37 99 235)" }} />
              </StatHeader>
              <StatMainValue>{totalRoutes}</StatMainValue>
              <StatDescription>Available destinations</StatDescription>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatLabel>Active Cities</StatLabel>
                <Truck style={{ width: "1.25rem", height: "1.25rem", color: "rgb(37 99 235)" }} />
              </StatHeader>
              <StatMainValue>{activeCities}</StatMainValue>
              <StatDescription>Serviced locations</StatDescription>
            </StatCard>
          </StatsGrid>

          <ContentCard>
            <CardHeader>
              <CardTitle>Select City to View Rates</CardTitle>
              <CardDescription>Click on any city to manage vendors and view bids</CardDescription>
            </CardHeader>

            <SearchContainer>
              <TextField
                fullWidth
                placeholder="Search for a city..."
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

            <ChipsContainer>
              {filteredCities.map((city) => (
                <StyledChip
                  key={city.name}
                  label={
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {city.name}
                      <span style={{ fontSize: "0.75rem", color: "rgb(100 116 139)" }}>({city.totalBids} bids)</span>
                    </span>
                  }
                  onClick={() => handleCityClick(city.name)}
                  variant="outlined"
                />
              ))}
            </ChipsContainer>

            {filteredCities.length === 0 && <EmptyState>No cities found matching "{searchTerm}"</EmptyState>}
          </ContentCard>
        </Main>
      </PageContainer>
    )
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
            <HeaderSubtitle>Motor Carrier Services</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        <HeaderActions>
          <StatusIndicator>
            <StatusDot />
            Secure Portal
          </StatusIndicator>
          <Button
            variant="outlined"
            size="small"
            onClick={handleLogout}
            startIcon={<LogOut style={{ width: "1rem", height: "1rem" }} />}
            sx={{
              color: "rgb(55 65 81)",
              borderColor: "rgb(209 213 219)",
              "&:hover": {
                backgroundColor: "rgb(249 250 251)",
              },
            }}
          >
            Logout
          </Button>
        </HeaderActions>
      </Header>

      <Main>
        <ContentCard>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <CardTitle>Submit Your Bid</CardTitle>
            <CardDescription>Select the starting city to view and submit rates</CardDescription>
          </div>

          <StepsContainer>
            <StepItem>
              <StepCircle>1</StepCircle>
              <StepLabel $active>Choose Starting Point</StepLabel>
            </StepItem>
            <StepDivider />
            <StepItem>
              <StepCircle $outline>2</StepCircle>
              <StepLabel>Choose Destination and Input Rates</StepLabel>
            </StepItem>
          </StepsContainer>

          <SearchContainer>
            <TextField
              fullWidth
              placeholder="Search for a city..."
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

          <ChipsContainer>
            {filteredCities.map((city) => (
              <StyledChip
                key={city.name}
                label={
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {city.name}
                    {favoriteCities.includes(city.name) && <FavoriteStarIcon />}
                    {city.newRoutes > 0 && (
                      <span
                        style={{
                          background: "rgb(37 99 235)",
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.125rem 0.5rem",
                          borderRadius: "9999px",
                        }}
                      >
                        {city.newRoutes}
                      </span>
                    )}
                  </span>
                }
                onClick={() => handleCityClick(city.name)}
                variant="outlined"
              />
            ))}
          </ChipsContainer>

          {filteredCities.length === 0 && <EmptyState>No cities found matching "{searchTerm}"</EmptyState>}
        </ContentCard>
      </Main>
    </PageContainer>
  )
}
