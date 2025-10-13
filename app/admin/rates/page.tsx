"use client"

import styled from "styled-components"
import { TrendingUp } from "lucide-react"
import Header from "@/components/Header"

const AdminContainer = styled.div`
  min-height: 100vh;
  background: oklch(0.99 0 0);
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`

const AdminHeader = styled.div`
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: oklch(0.2 0 0);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    width: 32px;
    height: 32px;
    color: oklch(0.5 0.15 250);
  }
`

const Subtitle = styled.p`
  font-size: 16px;
  color: oklch(0.5 0 0);
  margin: 0;
`

const TableCard = styled.div`
  background: white;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const RatesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background: oklch(0.98 0 0);
  border-bottom: 1px solid oklch(0.92 0 0);
  
  th {
    padding: 16px 24px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: oklch(0.4 0 0);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid oklch(0.95 0 0);
    transition: background 0.2s;
    
    &:hover {
      background: oklch(0.99 0 0);
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
`

const TableCell = styled.td`
  padding: 20px 24px;
  font-size: 15px;
  color: oklch(0.3 0 0);
`

const RouteCell = styled(TableCell)`
  font-weight: 600;
  color: oklch(0.2 0 0);
`

const RateCell = styled(TableCell)`
  font-weight: 700;
  color: oklch(0.5 0.15 250);
  font-size: 16px;
`

const routes = [
  { from: "New York", to: "Los Angeles", rate: "$2.50/mile" },
  { from: "New York", to: "Chicago", rate: "$2.20/mile" },
  { from: "Los Angeles", to: "San Francisco", rate: "$2.35/mile" },
  { from: "Chicago", to: "Houston", rate: "$2.15/mile" },
  { from: "Houston", to: "Dallas", rate: "$2.05/mile" },
  { from: "Phoenix", to: "San Diego", rate: "$2.25/mile" },
  { from: "Philadelphia", to: "New York", rate: "$2.30/mile" },
  { from: "San Antonio", to: "Houston", rate: "$2.10/mile" },
  { from: "Dallas", to: "San Antonio", rate: "$2.08/mile" },
  { from: "San Jose", to: "Los Angeles", rate: "$2.40/mile" },
]

export default function AdminRatesPage() {
  return (
    <AdminContainer>
      <Header />
      <ContentWrapper>
        <AdminHeader>
          <Title>
            <TrendingUp />
            Current Rates
          </Title>
          <Subtitle>View and manage transportation rates across all routes</Subtitle>
        </AdminHeader>

        <TableCard>
          <RatesTable>
            <TableHeader>
              <tr>
                <th>Starting City</th>
                <th>Destination</th>
                <th>Current Rate</th>
              </tr>
            </TableHeader>
            <TableBody>
              {routes.map((route, index) => (
                <tr key={index}>
                  <RouteCell>{route.from}</RouteCell>
                  <RouteCell>{route.to}</RouteCell>
                  <RateCell>{route.rate}</RateCell>
                </tr>
              ))}
            </TableBody>
          </RatesTable>
        </TableCard>
      </ContentWrapper>
    </AdminContainer>
  )
}
