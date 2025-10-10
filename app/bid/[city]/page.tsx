"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { TextField, Button, InputAdornment } from "@mui/material"
import { Truck, ArrowLeft, Check } from "lucide-react"

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, rgb(239 246 255), rgb(219 234 254));
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

const Main = styled.main`
  flex: 1;
  padding: 1.5rem;
`

const Container = styled.div`
  max-width: 112rem;
  margin: 0 auto;
`

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const CityLabel = styled.p`
  font-size: 0.875rem;
  color: rgb(71 85 105);
  margin-bottom: 0.25rem;
`

const CityName = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: rgb(15 23 42);
  margin-bottom: 1rem;
`

const PageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(31 41 55);
  margin-bottom: 0.5rem;
`

const PageDescription = styled.p`
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

const StepCircle = styled.div<{ $completed?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  background: ${(props) => (props.$completed ? "rgb(22 163 74)" : "rgb(37 99 235)")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
  position: sticky;
  top: 1.5rem;
  height: 50vh;
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
  max-height: 600px;
  overflow-y: auto;
`

const DestinationButton = styled.button<{ $selected?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$selected ? "rgb(37 99 235)" : "rgb(243 244 246)")};
  color: ${(props) => (props.$selected ? "white" : "rgb(15 23 42)")};

  &:hover {
    background: ${(props) => (props.$selected ? "rgb(37 99 235)" : "rgb(229 231 235)")};
  }
`

const DestinationName = styled.div`
  font-weight: 500;
`

const FormCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: rgb(100 116 139);
`

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`

const SectionHeader = styled.div<{ $required?: boolean }>`
  background: ${(props) => (props.$required ? "rgb(239 246 255)" : "rgb(243 244 246)")};
  padding: 0.75rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border-bottom: 2px solid ${(props) => (props.$required ? "rgb(37 99 235)" : "rgb(156 163 175)")};
`

const SectionTitle = styled.h4`
  font-weight: 700;
  color: rgb(15 23 42);
  font-size: 1.125rem;
  margin: 0;
`

const SectionContent = styled.div`
  padding: 1.5rem;
  border: 1px solid rgb(229 231 235);
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
`

const FieldGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.$columns || 3}, 1fr);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
        <Button
          variant="outlined"
          startIcon={<ArrowLeft style={{ width: "1rem", height: "1rem" }} />}
          onClick={() => router.push("/cities")}
        >
          Back to Cities
        </Button>
      </Header>

      <Main>
        <Container>
          <TitleSection>
            <CityLabel>Starting route:</CityLabel>
            <CityName>{cityName.toUpperCase()}</CityName>
            <PageTitle>Submit Your Bid</PageTitle>
            <PageDescription>Select the destination and then fill up the rates!</PageDescription>
          </TitleSection>

          <StepsContainer>
            <StepItem>
              <StepCircle $completed>
                <Check style={{ width: "1.25rem", height: "1.25rem" }} />
              </StepCircle>
              <StepLabel>Pickup Location</StepLabel>
            </StepItem>
            <StepDivider />
            <StepItem>
              <StepCircle>2</StepCircle>
              <StepLabel $active>End Location & Rates</StepLabel>
            </StepItem>
          </StepsContainer>

          <GridContainer>
            <Sidebar>
              <SidebarTitle>Select Destination</SidebarTitle>
              <DestinationList>
                {destinations.map((dest) => (
                  <DestinationButton
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest.id)}
                    $selected={selectedDestination === dest.id}
                  >
                    <DestinationName>{dest.name}</DestinationName>
                  </DestinationButton>
                ))}
              </DestinationList>
            </Sidebar>

            <FormCard>
              {!selectedDestination ? (
                <EmptyState>Please select a destination from the left sidebar to enter rates</EmptyState>
              ) : (
                <>
                  <SectionContainer>
                    <SectionHeader $required>
                      <SectionTitle>REQUIRED FIELDS</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                      <FieldGrid $columns={3}>
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
                      </FieldGrid>
                    </SectionContent>
                  </SectionContainer>

                  <SectionContainer>
                    <SectionHeader>
                      <SectionTitle>OPTIONAL FIELDS</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                      <FieldGrid $columns={4}>
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
                      </FieldGrid>
                    </SectionContent>
                  </SectionContainer>

                  <ButtonContainer>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      sx={{
                        backgroundColor: "rgb(37 99 235)",
                        "&:hover": {
                          backgroundColor: "rgb(29 78 216)",
                        },
                        padding: "0.75rem 2rem",
                      }}
                    >
                      Submit Bid
                    </Button>
                  </ButtonContainer>
                </>
              )}
            </FormCard>
          </GridContainer>
        </Container>
      </Main>
    </PageContainer>
  )
}
