"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import { Star, TrendingUp } from "lucide-react"
import Header from "@/components/Header"

const PageContainer = styled.div`
  min-height: 100vh;
  background: oklch(0.99 0 0);
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
`

const PageHeader = styled.div`
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: oklch(0.2 0 0);
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  font-size: 16px;
  color: oklch(0.5 0 0);
  margin: 0;
`

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`

const CityCard = styled.div`
  background: white;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    border-color: oklch(0.5 0.15 250);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`

const CityName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: oklch(0.2 0 0);
  margin: 0;
`

const FavoriteIcon = styled.div<{ $isFavorite: boolean }>`
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => (props.$isFavorite ? "oklch(0.75 0.15 85)" : "oklch(0.85 0 0)")};
    fill: ${(props) => (props.$isFavorite ? "oklch(0.75 0.15 85)" : "none")};
  }
`

const RateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: oklch(0.98 0 0);
  border-radius: 8px;
  margin-bottom: 16px;
`

const RateLabel = styled.span`
  font-size: 13px;
  color: oklch(0.5 0 0);
`

const RateValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: oklch(0.5 0.15 250);
`

const CityButton = styled.button`
  width: 100%;
  padding: 12px;
  background: oklch(0.5 0.15 250);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: oklch(0.45 0.15 250);
  }
`

const cities = [
  { name: "New York", rate: "$2.50/mile" },
  { name: "Los Angeles", rate: "$2.30/mile" },
  { name: "Chicago", rate: "$2.20/mile" },
  { name: "Houston", rate: "$2.10/mile" },
  { name: "Phoenix", rate: "$2.15/mile" },
  { name: "Philadelphia", rate: "$2.25/mile" },
  { name: "San Antonio", rate: "$2.05/mile" },
  { name: "San Diego", rate: "$2.35/mile" },
  { name: "Dallas", rate: "$2.12/mile" },
  { name: "San Jose", rate: "$2.40/mile" },
]

export default function CitiesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("favoriteCities")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const sortedCities = [...cities].sort((a, b) => {
    const aFav = favorites.includes(a.name)
    const bFav = favorites.includes(b.name)
    if (aFav && !bFav) return -1
    if (!aFav && bFav) return 1
    return 0
  })

  const handleCityClick = (cityName: string) => {
    router.push(`/bid/${encodeURIComponent(cityName)}`)
  }

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <PageHeader>
          <Title>Available Cities</Title>
          <Subtitle>Select a city to submit your bid for transportation routes</Subtitle>
        </PageHeader>

        <CitiesGrid>
          {sortedCities.map((city) => (
            <CityCard key={city.name} onClick={() => handleCityClick(city.name)}>
              <CardHeader>
                <CityName>{city.name}</CityName>
                <FavoriteIcon $isFavorite={favorites.includes(city.name)}>
                  <Star />
                </FavoriteIcon>
              </CardHeader>

              <RateSection>
                <TrendingUp style={{ width: "16px", height: "16px", color: "oklch(0.5 0.15 250)" }} />
                <RateLabel>Current Rate:</RateLabel>
                <RateValue>{city.rate}</RateValue>
              </RateSection>

              <CityButton>Submit Bid</CityButton>
            </CityCard>
          ))}
        </CitiesGrid>
      </ContentWrapper>
    </PageContainer>
  )
}
