"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Truck, ArrowLeft, MapPin, Star } from "lucide-react"

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
`

const Header = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Logo = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const HeaderTitle = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #334155;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`

const Main = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const StartingRouteCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RouteInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const RouteIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #bfdbfe;
`

const RouteText = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 0.25rem 0;
    text-transform: uppercase;
  }
  p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }
`

const FavoriteButton = styled.button`
  background: ${(props) => (props.className?.includes("favorite") ? "#fbbf24" : "white")};
  border: 2px solid ${(props) => (props.className?.includes("favorite") ? "#fbbf24" : "#e2e8f0")};
  border-radius: 0.75rem;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: ${(props) => (props.className?.includes("favorite") ? "white" : "#94a3b8")};

  &:hover {
    transform: scale(1.1);
  }
`

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
`

const SidebarTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1rem 0;
`

const DestinationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const DestinationButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  height: 4rem;
  border-radius: 0.75rem;
  border: 2px solid ${(props) => (props.className?.includes("selected") ? "#2563eb" : "#e2e8f0")};
  background: ${(props) => (props.className?.includes("selected") ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "white")};
  color: ${(props) => (props.className?.includes("selected") ? "white" : "#0f172a")};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    border-color: ${(props) => (props.className?.includes("selected") ? "#1d4ed8" : "#cbd5e1")};
    background: ${(props) => (props.className?.includes("selected") ? "linear-gradient(135deg, #1d4ed8, #1e40af)" : "#f8fafc")};
  }

  div:first-child {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  div:last-child {
    font-size: 0.875rem;
    opacity: 0.8;
  }
`

const FormCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const EmptyState = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  color: #94a3b8;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #334155;
    margin: 1.5rem 0 0.75rem 0;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #64748b;
  }
`

const FormSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1rem 0;
  padding: 1rem;
  background: #eff6ff;
  border-radius: 0.5rem;
`

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FieldGridOptional = styled(FieldGrid)`
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
`

const Input = styled.input`
  padding: 0.75rem;
  height: 4rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: #0f172a;
  background: ${(props) => (props.readOnly ? "#f1f5f9" : "white")};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &::placeholder {
    color: #94a3b8;
  }
`

const SubmitButton = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: not-allowed;
  transition: all 0.2s;
  float: right;
  margin-top: 1rem;

  &:disabled {
    background: linear-gradient(135deg, #cbd5e1, #94a3b8);
    cursor: not-allowed;
  }
`

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
  philadelphia: [
    { id: 1, name: "New York, NY", distance: 95 },
    { id: 2, name: "Baltimore, MD", distance: 106 },
    { id: 3, name: "Washington, DC", distance: 140 },
  ],
}

export default function BidPage() {
  const params = useParams()
  const router = useRouter()
  const city = params.city as string
  const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
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

  const destinations = DESTINATIONS[city as keyof typeof DESTINATIONS] || DESTINATIONS.boston

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    setIsFavorite(favorites.includes(cityName))
  }, [cityName])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]")
    let updatedFavorites

    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter((c: string) => c !== cityName)
    } else {
      updatedFavorites = [...favorites, cityName]
    }

    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites))
    setIsFavorite(!isFavorite)
  }

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

  const handleSubmit = () => {
    if (formData.baseRate && formData.fsc && formData.total) {
      alert("Bid submitted successfully!")
      router.push("/cities")
    }
  }

  const isFormValid = formData.baseRate && formData.fsc && formData.total

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Logo>
            <Truck size={24} />
          </Logo>
          <HeaderTitle>
            <h1>Vendor Bid Portal</h1>
            <p>Motor Carrier Services</p>
          </HeaderTitle>
        </HeaderLeft>
        <BackButton onClick={() => router.push("/cities")}>
          <ArrowLeft size={16} />
          <span>Back to Cities</span>
        </BackButton>
      </Header>

      <Main>
        <StartingRouteCard>
          <RouteInfo>
            <RouteIcon>
              <MapPin size={32} color="#2563eb" />
            </RouteIcon>
            <RouteText>
              <h2>{cityName}</h2>
              <p>Starting Route</p>
            </RouteText>
          </RouteInfo>
          <FavoriteButton onClick={toggleFavorite} className={isFavorite ? "favorite" : ""}>
            <Star size={24} fill={isFavorite ? "white" : "none"} />
          </FavoriteButton>
        </StartingRouteCard>

        <GridLayout>
          <Sidebar>
            <SidebarTitle>Select Destination</SidebarTitle>
            <DestinationList>
              {destinations.map((dest) => (
                <DestinationButton
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest.id)}
                  className={selectedDestination === dest.id ? "selected" : ""}
                >
                  <div>{dest.name}</div>
                  <div>{dest.distance} miles</div>
                </DestinationButton>
              ))}
            </DestinationList>
          </Sidebar>

          <FormCard>
            {!selectedDestination ? (
              <EmptyState>
                <MapPin size={80} strokeWidth={1.5} />
                <h3>No Destination Selected</h3>
                <p>Please select a destination from the sidebar to begin entering your bid rates</p>
              </EmptyState>
            ) : (
              <>
                <FormSection>
                  <SectionTitle>REQUIRED FIELDS</SectionTitle>
                  <FieldGrid>
                    <InputGroup>
                      <Label>Base Rate *</Label>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={formData.baseRate}
                        onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Label>FSC *</Label>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={formData.fsc}
                        onChange={(e) => setFormData({ ...formData, fsc: e.target.value })}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Label>Total *</Label>
                      <Input type="text" value={formData.total} readOnly />
                    </InputGroup>
                  </FieldGrid>
                </FormSection>

                <FormSection>
                  <SectionTitle>OPTIONAL FIELDS</SectionTitle>
                  <FieldGridOptional>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <InputGroup key={num}>
                        <Label>Optional #{num}</Label>
                        <Input
                          type="text"
                          placeholder="Enter value"
                          value={formData[`optional${num}` as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [`optional${num}`]: e.target.value })}
                        />
                      </InputGroup>
                    ))}
                  </FieldGridOptional>
                </FormSection>

                <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
                  Submit Bid
                </SubmitButton>
              </>
            )}
          </FormCard>
        </GridLayout>
      </Main>
    </PageContainer>
  )
}
