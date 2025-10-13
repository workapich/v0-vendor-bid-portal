"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { Truck, ArrowLeft, Plus, History, Trash2 } from "lucide-react"

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

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const PageTitleSection = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 0.5rem 0;
  }
  p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
`

const VendorsCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const VendorsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
`

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s;

  &:hover {
    background: #f8fafc;
  }
`

const TableCell = styled.td`
  padding: 1rem;
  color: #0f172a;
`

const VendorName = styled.div`
  font-weight: 600;
  color: #0f172a;
`

const VendorEmail = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
`

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => (props.$status === "active" ? "#d1fae5" : "#fee2e2")};
  color: ${(props) => (props.$status === "active" ? "#065f46" : "#991b1b")};
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const IconButton = styled.button`
  padding: 0.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #334155;
  }

  &.danger:hover {
    background: #fee2e2;
    border-color: #fca5a5;
    color: #991b1b;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #94a3b8;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #334155;
    margin: 0 0 0.5rem 0;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
  }
`

const HistoryCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`

const HistoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1.5rem 0;
`

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const HistoryItem = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border-left: 4px solid #2563eb;
`

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const HistoryRoute = styled.div`
  font-weight: 600;
  color: #0f172a;
`

const HistoryDate = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`

const HistoryDetails = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 0.875rem;
  color: #64748b;

  span {
    display: flex;
    gap: 0.5rem;

    strong {
      color: #0f172a;
    }
  }
`

interface Vendor {
  id: number
  mcId: string
  email: string
  status: "active" | "inactive"
  totalBids: number
  joinedDate: string
}

interface RateHistory {
  id: number
  route: string
  baseRate: string
  fsc: string
  total: string
  submittedDate: string
}

export default function VendorsPage() {
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [rateHistory, setRateHistory] = useState<RateHistory[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newVendor, setNewVendor] = useState({
    mcId: "",
    email: "",
  })

  useEffect(() => {
    const savedVendors = JSON.parse(localStorage.getItem("vendors") || "[]")
    if (savedVendors.length === 0) {
      const defaultVendors: Vendor[] = [
        {
          id: 1,
          mcId: "MC-123456",
          email: "john.smith@transport.com",
          status: "active",
          totalBids: 45,
          joinedDate: "2024-01-15",
        },
        {
          id: 2,
          mcId: "MC-789012",
          email: "sarah.j@logistics.com",
          status: "active",
          totalBids: 32,
          joinedDate: "2024-02-20",
        },
        {
          id: 3,
          mcId: "MC-345678",
          email: "mike@davisfreight.com",
          status: "inactive",
          totalBids: 18,
          joinedDate: "2023-11-10",
        },
      ]
      localStorage.setItem("vendors", JSON.stringify(defaultVendors))
      setVendors(defaultVendors)
    } else {
      setVendors(savedVendors)
    }
  }, [])

  const handleAddVendor = () => {
    if (newVendor.mcId && newVendor.email) {
      const vendor: Vendor = {
        id: Date.now(),
        mcId: newVendor.mcId,
        email: newVendor.email,
        status: "active",
        totalBids: 0,
        joinedDate: new Date().toISOString().split("T")[0],
      }

      const updatedVendors = [...vendors, vendor]
      setVendors(updatedVendors)
      localStorage.setItem("vendors", JSON.stringify(updatedVendors))

      setNewVendor({ mcId: "", email: "" })
      setOpenDialog(false)
    }
  }

  const handleDeleteVendor = (id: number) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      const updatedVendors = vendors.filter((v) => v.id !== id)
      setVendors(updatedVendors)
      localStorage.setItem("vendors", JSON.stringify(updatedVendors))
    }
  }

  const handleViewHistory = (vendor: Vendor) => {
    setSelectedVendor(vendor)

    const mockHistory: RateHistory[] = [
      {
        id: 1,
        route: "Atlanta → Nashville, TN",
        baseRate: "$1250.00",
        fsc: "15%",
        total: "$1437.50",
        submittedDate: "2025-01-10",
      },
      {
        id: 2,
        route: "Boston → Portland, ME",
        baseRate: "$850.00",
        fsc: "12%",
        total: "$952.00",
        submittedDate: "2025-01-08",
      },
      {
        id: 3,
        route: "Philadelphia → New York, NY",
        baseRate: "$650.00",
        fsc: "10%",
        total: "$715.00",
        submittedDate: "2025-01-05",
      },
    ]
    setRateHistory(mockHistory)
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
            <p>Admin Dashboard</p>
          </HeaderTitle>
        </HeaderLeft>
        <BackButton onClick={() => router.push("/cities")}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </BackButton>
      </Header>

      <Main>
        <PageHeader>
          <PageTitleSection>
            <h2>Vendor Management</h2>
            <p>View, create, and manage all vendors in the system</p>
          </PageTitleSection>
          <AddButton onClick={() => setOpenDialog(true)}>
            <Plus size={20} />
            Add New Vendor
          </AddButton>
        </PageHeader>

        <VendorsCard>
          {vendors.length === 0 ? (
            <EmptyState>
              <h3>No Vendors Found</h3>
              <p>Click "Add New Vendor" to create your first vendor</p>
            </EmptyState>
          ) : (
            <VendorsTable>
              <TableHeader>
                <tr>
                  <TableHeaderCell>MC-ID</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Total Bids</TableHeaderCell>
                  <TableHeaderCell>Joined Date</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <VendorName>{vendor.mcId}</VendorName>
                    </TableCell>
                    <TableCell>
                      <VendorEmail>{vendor.email}</VendorEmail>
                    </TableCell>
                    <TableCell>
                      <StatusBadge $status={vendor.status}>
                        {vendor.status === "active" ? "Active" : "Inactive"}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>{vendor.totalBids}</TableCell>
                    <TableCell>{new Date(vendor.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <ActionButtons>
                        <IconButton onClick={() => handleViewHistory(vendor)} title="View Rate History">
                          <History size={18} />
                        </IconButton>
                        <IconButton
                          className="danger"
                          onClick={() => handleDeleteVendor(vendor.id)}
                          title="Delete Vendor"
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </VendorsTable>
          )}
        </VendorsCard>

        {selectedVendor && rateHistory.length > 0 && (
          <HistoryCard>
            <HistoryTitle>Rate History - {selectedVendor.mcId}</HistoryTitle>
            <HistoryList>
              {rateHistory.map((history) => (
                <HistoryItem key={history.id}>
                  <HistoryHeader>
                    <HistoryRoute>{history.route}</HistoryRoute>
                    <HistoryDate>{new Date(history.submittedDate).toLocaleDateString()}</HistoryDate>
                  </HistoryHeader>
                  <HistoryDetails>
                    <span>
                      <strong>Base Rate:</strong> {history.baseRate}
                    </span>
                    <span>
                      <strong>FSC:</strong> {history.fsc}
                    </span>
                    <span>
                      <strong>Total:</strong> {history.total}
                    </span>
                  </HistoryDetails>
                </HistoryItem>
              ))}
            </HistoryList>
          </HistoryCard>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <TextField
                label="Motor Carrier ID (MC-ID)"
                fullWidth
                placeholder="MC-123456"
                value={newVendor.mcId}
                onChange={(e) => setNewVendor({ ...newVendor, mcId: e.target.value })}
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={newVendor.email}
                onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddVendor} variant="contained" color="primary">
              Add Vendor
            </Button>
          </DialogActions>
        </Dialog>
      </Main>
    </PageContainer>
  )
}
