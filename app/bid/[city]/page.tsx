"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Truck, ArrowLeft, MapPin, Star, CheckCircle2 } from "lucide-react"

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
  background: ${(props) => (props.className?.includes("favorite") ? "#2563eb" : "white")};
  border: 2px solid ${(props) => (props.className?.includes("favorite") ? "#2563eb" : "#e2e8f0")};
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
  height: 65vh;
  overflow-y: auto;
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

const DestinationButton = styled.button<{ $hasSubmittedRates?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  height: 4rem;
  border-radius: 0.75rem;
  border: 2px solid ${(props) => {
    if (props.$hasSubmittedRates) return "#10b981"
    if (props.className?.includes("selected")) return "#2563eb"
    return "#e2e8f0"
  }};
  background: ${(props) => {
    if (props.$hasSubmittedRates && props.className?.includes("selected"))
      return "linear-gradient(135deg, #10b981, #059669)"
    if (props.$hasSubmittedRates) return "linear-gradient(135deg, #d1fae5, #a7f3d0)"
    if (props.className?.includes("selected")) return "linear-gradient(135deg, #2563eb, #1d4ed8)"
    return "white"
  }};
  color: ${(props) => {
    if (props.$hasSubmittedRates && props.className?.includes("selected")) return "white"
    if (props.$hasSubmittedRates) return "#065f46"
    if (props.className?.includes("selected")) return "white"
    return "#0f172a"
  }};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:hover {
    border-color: ${(props) => {
      if (props.$hasSubmittedRates) return "#059669"
      if (props.className?.includes("selected")) return "#1d4ed8"
      return "#cbd5e1"
    }};
    background: ${(props) => {
      if (props.$hasSubmittedRates && props.className?.includes("selected"))
        return "linear-gradient(135deg, #059669, #047857)"
      if (props.$hasSubmittedRates) return "linear-gradient(135deg, #a7f3d0, #6ee7b7)"
      if (props.className?.includes("selected")) return "linear-gradient(135deg, #1d4ed8, #1e40af)"
      return "#f8fafc"
    }};
  }

  div:first-child {
    font-weight: 600;
  }
`

const DestinationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const DestinationName = styled.div`
  font-weight: 600;
`

const SubmittedBadge = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const FormCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 65vh;
  overflow-y: auto;
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

const SubmitButton = styled.button<{ $enabled?: boolean }>`
  padding: 1rem 3rem;
  background: ${(props) =>
    props.$enabled ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "linear-gradient(135deg, #cbd5e1, #94a3b8)"};
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: ${(props) => (props.$enabled ? "pointer" : "not-allowed")};
  transition: all 0.2s;
  float: right;
  margin-top: 1rem;

  &:hover {
    background: ${(props) =>
      props.$enabled ? "linear-gradient(135deg, #1d4ed8, #1e40af)" : "linear-gradient(135deg, #cbd5e1, #94a3b8)"};
    transform: ${(props) => (props.$enabled ? "translateY(-2px)" : "none")};
    box-shadow: ${(props) => (props.$enabled ? "0 4px 12px rgba(37, 99, 235, 0.3)" : "none")};
  }

  &:disabled {
    background: linear-gradient(135deg, #cbd5e1, #94a3b8);
    cursor: not-allowed;
  }
`

const DESTINATIONS = {
  boston: [
    { id: 1, name: "Franlin, NH" },
    { id: 2, name: "Slatersville, RI" },
    { id: 3, name: "Augustas, GA" },
    { id: 4, name: "Portland, ME" },
    { id: 5, name: "Hartford, CT" },
  ],
  atlanta: [
    { id: 1, name: "Birmingham, AL" },
    { id: 2, name: "Charlotte, NC" },
    { id: 3, name: "Nashville, TN" },
  ],
  philadelphia: [
    { id: 1, name: "New York, NY" },
    { id: 2, name: "Baltimore, MD" },
    { id: 3, name: "Washington, DC" },
  ],
}

export default function BidPage() {
  const params = useParams()
  const router = useRouter()
  const city = params.city as string
  const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [submittedRates, setSubmittedRates] = useState<Record<string, any>>({})
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

    const savedRates = JSON.parse(localStorage.getItem("submittedRates") || "{}")
    setSubmittedRates(savedRates)

    if (city === "atlanta" && !savedRates["atlanta-3"]) {
      const atlantaNashvilleRate = {
        baseRate: "$1250.00",
        fsc: "15%",
        total: "$1437.50",
        optional1: "$50.00",
        optional2: "",
        optional3: "",
        optional4: "",
        optional5: "",
        optional6: "",
        optional7: "",
        optional8: "",
      }
      savedRates["atlanta-3"] = atlantaNashvilleRate
      localStorage.setItem("submittedRates", JSON.stringify(savedRates))
      setSubmittedRates(savedRates)
    }

    if (selectedDestination) {
      const rateKey = `${city}-${selectedDestination}`
      if (savedRates[rateKey]) {
        setFormData(savedRates[rateKey])
      } else {
        setFormData({
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
      }
    }
  }, [cityName, selectedDestination, city])

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

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^0-9.]/g, "")
    if (!numericValue) return ""
    return `$${numericValue}`
  }

  const formatPercentage = (value: string): string => {
    const numericValue = value.replace(/[^0-9.]/g, "")
    if (!numericValue) return ""
    return `${numericValue}%`
  }

  const extractNumericValue = (value: string): string => {
    return value.replace(/[^0-9.]/g, "")
  }

  useEffect(() => {
    const baseRate = Number.parseFloat(extractNumericValue(formData.baseRate)) || 0
    const fsc = Number.parseFloat(extractNumericValue(formData.fsc)) || 0

    if (baseRate > 0 && fsc >= 0) {
      const total = baseRate + baseRate * (fsc / 100)
      setFormData((prev) => ({ ...prev, total: `$${total.toFixed(2)}` }))
    } else if (!formData.baseRate && !formData.fsc) {
      setFormData((prev) => ({ ...prev, total: "" }))
    }
  }, [formData.baseRate, formData.fsc])

  const handleCurrencyInput = (field: string, value: string) => {
    const formatted = formatCurrency(value)
    setFormData({ ...formData, [field]: formatted })
  }

  const handlePercentageInput = (value: string) => {
    const formatted = formatPercentage(value)
    setFormData({ ...formData, fsc: formatted })
  }

  const handleSubmit = () => {
    if (formData.baseRate && formData.fsc && formData.total && selectedDestination) {
      const savedRates = JSON.parse(localStorage.getItem("submittedRates") || "{}")
      const rateKey = `${city}-${selectedDestination}`
      savedRates[rateKey] = formData

      localStorage.setItem("submittedRates", JSON.stringify(savedRates))

      alert("Bid submitted successfully!")
      router.push("/cities")
    }
  }

  const isFormValid = formData.baseRate && formData.fsc && formData.total

  const hasSubmittedRates = (destId: number) => {
    const rateKey = `${city}-${destId}`
    return !!submittedRates[rateKey]
  }

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
                  $hasSubmittedRates={hasSubmittedRates(dest.id)}
                >
                  <DestinationContent>
                    <DestinationName>{dest.name}</DestinationName>
                    {hasSubmittedRates(dest.id) && (
                      <SubmittedBadge>
                        <CheckCircle2 size={12} />
                        Rates submitted
                      </SubmittedBadge>
                    )}
                  </DestinationContent>
                  {hasSubmittedRates(dest.id) && <CheckCircle2 size={20} />}
                </DestinationButton>
              ))}
            </DestinationList>
          </Sidebar>

          <FormCard>
            {!selectedDestination ? (
              <EmptyState>
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
                        placeholder="$0.00"
                        value={formData.baseRate}
                        onChange={(e) => handleCurrencyInput("baseRate", e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Label>FSC *</Label>
                      <Input
                        type="text"
                        placeholder="0%"
                        value={formData.fsc}
                        onChange={(e) => handlePercentageInput(e.target.value)}
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
                          placeholder="$0.00"
                          value={formData[`optional${num}` as keyof typeof formData]}
                          onChange={(e) => handleCurrencyInput(`optional${num}`, e.target.value)}
                        />
                      </InputGroup>
                    ))}
                  </FieldGridOptional>
                </FormSection>

                <SubmitButton onClick={handleSubmit} disabled={!isFormValid} $enabled={isFormValid}>
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
