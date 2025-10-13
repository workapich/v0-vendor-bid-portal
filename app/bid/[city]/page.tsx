"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import styled from "styled-components"
import { Star, MapPin, ArrowRight, CheckCircle } from "lucide-react"
import Header from "@/components/Header"

const BidContainer = styled.div`
  min-height: 100vh;
  background: oklch(0.99 0 0);
`

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`

const BidCard = styled.div`
  background: white;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const RouteHeader = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid oklch(0.92 0 0);
`

const RouteTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: oklch(0.2 0 0);
  margin: 0 0 16px 0;
`

const RouteSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`

const CityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: oklch(0.98 0 0);
  border: 1px solid oklch(0.92 0 0);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: oklch(0.3 0 0);
  
  svg {
    width: 18px;
    height: 18px;
    color: oklch(0.5 0.15 250);
  }
`

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: ${(props) => (props.$isFavorite ? "oklch(0.75 0.15 85)" : "white")};
  border: 1px solid ${(props) => (props.$isFavorite ? "oklch(0.75 0.15 85)" : "oklch(0.92 0 0)")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.$isFavorite ? "white" : "oklch(0.3 0 0)")};
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => (props.$isFavorite ? "white" : "none")};
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: scale(0.98);
  }
`

const ArrowIcon = styled.div`
  svg {
    width: 20px;
    height: 20px;
    color: oklch(0.7 0 0);
  }
`

const BidForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: oklch(0.3 0 0);
`

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 8px;
  font-size: 15px;
  background: white;
  color: oklch(0.3 0 0);
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: oklch(0.5 0.15 250);
    box-shadow: 0 0 0 3px oklch(0.5 0.15 250 / 0.1);
  }
`

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: oklch(0.5 0.15 250);
    box-shadow: 0 0 0 3px oklch(0.5 0.15 250 / 0.1);
  }
  
  &::placeholder {
    color: oklch(0.7 0 0);
  }
`

const SubmitButton = styled.button`
  padding: 16px 24px;
  background: oklch(0.5 0.15 250);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  
  &:hover {
    background: oklch(0.45 0.15 250);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px oklch(0.5 0.15 250 / 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: oklch(0.95 0.05 145);
  border: 1px solid oklch(0.6 0.15 145);
  border-radius: 8px;
  color: oklch(0.3 0.1 145);
  font-weight: 500;
  margin-top: 16px;
  
  svg {
    width: 20px;
    height: 20px;
    color: oklch(0.6 0.15 145);
    flex-shrink: 0;
  }
`

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
]

export default function BidPage() {
  const params = useParams()
  const router = useRouter()
  const city = decodeURIComponent(params.city as string)

  const [isFavorite, setIsFavorite] = useState(false)
  const [destination, setDestination] = useState("")
  const [rate, setRate] = useState("")
  const [vendorName, setVendorName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    setIsFavorite(favorites.includes(city))
  }, [city])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    const newFavorites = isFavorite ? favorites.filter((c: string) => c !== city) : [...favorites, city]
    localStorage.setItem("favoriteCities", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push("/cities")
    }, 2000)
  }

  const availableDestinations = cities.filter((c) => c !== city)

  return (
    <BidContainer>
      <Header />
      <ContentWrapper>
        <BidCard>
          <RouteHeader>
            <RouteTitle>Submit Your Bid</RouteTitle>
            <RouteSection>
              <CityBadge>
                <MapPin />
                {city}
              </CityBadge>
              <FavoriteButton $isFavorite={isFavorite} onClick={toggleFavorite}>
                <Star />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </FavoriteButton>
              <ArrowIcon>
                <ArrowRight />
              </ArrowIcon>
              <CityBadge>
                <MapPin />
                {destination || "Select destination"}
              </CityBadge>
            </RouteSection>
          </RouteHeader>

          <BidForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="destination">Destination City</Label>
              <Select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required>
                <option value="">Select a destination</option>
                {availableDestinations.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="rate">Your Rate (per mile)</Label>
              <Input
                id="rate"
                type="text"
                placeholder="e.g., $2.25"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                type="text"
                placeholder="Your company name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormGroup>

            <SubmitButton type="submit">Submit Bid</SubmitButton>

            {submitted && (
              <SuccessMessage>
                <CheckCircle />
                Bid submitted successfully! Redirecting...
              </SuccessMessage>
            )}
          </BidForm>
        </BidCard>
      </ContentWrapper>
    </BidContainer>
  )
}
