"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Truck,
  ArrowLeft,
  Trash2,
  ChevronDown,
  ChevronUp,
  Upload,
  Ban,
} from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
`;

const Header = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

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
`;

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
`;

const Main = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

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
`;

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
`;

const VendorsCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableContainer = styled.div`
  max-height: 65vh;
  overflow-y: auto;
  border-radius: 0.5rem;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const VendorsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s;

  &:hover {
    background: #f8fafc;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #0f172a;
`;

const VendorName = styled.div`
  font-weight: 600;
  color: #0f172a;
`;

const VendorEmail = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    if (props.$status === "active") return "#d1fae5";
    if (props.$status === "banned") return "#e9d5ff";
    return "#fee2e2";
  }};
  color: ${(props) => {
    if (props.$status === "active") return "#065f46";
    if (props.$status === "banned") return "#581c87";
    return "#991b1b";
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

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
`;

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
`;

const AccordionRow = styled.tr<{ $isOpen: boolean }>`
  background: ${(props) => (props.$isOpen ? "#f8fafc" : "transparent")};
`;

const AccordionCell = styled.td`
  padding: 0 !important;
  border-bottom: ${(props) =>
    props.colSpan ? "2px solid #e2e8f0" : "1px solid #e2e8f0"};
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${(props) => (props.$isOpen ? "400px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const HistoryContainer = styled.div`
  padding: 1.5rem;
  background: #ffffff;
  border-top: 2px solid #e2e8f0;
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HistoryScrollContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HistoryItem = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border-left: 4px solid #2563eb;
`;

const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const HistoryRoute = styled.div`
  font-weight: 600;
  color: #0f172a;
  font-size: 0.875rem;
`;

const HistoryDate = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

const HistoryDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;

  span {
    display: flex;
    gap: 0.5rem;

    strong {
      color: #0f172a;
    }
  }
`;

const ToggleButton = styled.button`
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
`;

const EmptyHistory = styled.div`
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-size: 0.875rem;
`;

const BanButton = styled.button`
  padding: 0.5rem;
  background: white;
  border: 2px solid #fca5a5;
  border-radius: 0.5rem;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fee2e2;
    border-color: #f87171;
    color: #991b1b;
  }
`;

const EmailInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const EmailChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  min-height: 3rem;
  background: #f8fafc;
`;

const EmailChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: #2563eb;
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RemoveChipButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 1.125rem;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const CSVUploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid #2563eb;
  border-radius: 0.5rem;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background: #eff6ff;
    border-color: #1d4ed8;
  }

  input {
    display: none;
  }
`;

const HelpText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

interface Vendor {
  id: number;
  mcId: string | null;
  email: string;
  status: "active" | "inactive" | "banned";
  totalBids: number;
  joinedDate: string;
}

interface RateHistory {
  id: number;
  route: string;
  baseRate: string;
  fsc: string;
  total: string;
  submittedDate: string;
}

export default function VendorsPage() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [expandedVendorId, setExpandedVendorId] = useState<number | null>(null);
  const [vendorHistories, setVendorHistories] = useState<
    Record<number, RateHistory[]>
  >({});
  const [openDialog, setOpenDialog] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);

  useEffect(() => {
    const savedVendors = JSON.parse(localStorage.getItem("vendors") || "[]");
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
        {
          id: 4,
          mcId: "MC-223344",
          email: "vendor13@example.com",
          status: "active",
          totalBids: 28,
          joinedDate: "2024-03-05",
        },
        {
          id: 5,
          mcId: "MC-556677",
          email: "vendor14@example.com",
          status: "active",
          totalBids: 35,
          joinedDate: "2024-01-22",
        },
        {
          id: 6,
          mcId: "MC-889900",
          email: "vendor15@example.com",
          status: "active",
          totalBids: 41,
          joinedDate: "2023-12-18",
        },
        {
          id: 7,
          mcId: "MC-334455",
          email: "vendor16@example.com",
          status: "active",
          totalBids: 29,
          joinedDate: "2024-02-14",
        },
        {
          id: 8,
          mcId: "MC-667788",
          email: "vendor17@example.com",
          status: "active",
          totalBids: 37,
          joinedDate: "2024-01-08",
        },
        {
          id: 9,
          mcId: "MC-990011",
          email: "vendor18@example.com",
          status: "active",
          totalBids: 33,
          joinedDate: "2024-03-12",
        },
        {
          id: 10,
          mcId: "MC-445566",
          email: "vendor11@example.com",
          status: "active",
          totalBids: 26,
          joinedDate: "2024-02-28",
        },
        {
          id: 11,
          mcId: "MC-778899",
          email: "vendor12@example.com",
          status: "active",
          totalBids: 31,
          joinedDate: "2024-01-19",
        },
        {
          id: 12,
          mcId: "MC-112233",
          email: "vendor10@example.com",
          status: "active",
          totalBids: 24,
          joinedDate: "2024-03-01",
        },
        {
          id: 13,
          mcId: "MC-901234",
          email: "vendor4@example.com",
          status: "active",
          totalBids: 38,
          joinedDate: "2023-12-05",
        },
        {
          id: 14,
          mcId: "MC-567890",
          email: "vendor5@example.com",
          status: "active",
          totalBids: 42,
          joinedDate: "2024-01-30",
        },
        {
          id: 15,
          mcId: "MC-234567",
          email: "vendor6@example.com",
          status: "inactive",
          totalBids: 15,
          joinedDate: "2023-10-22",
        },
        {
          id: 16,
          mcId: "MC-890123",
          email: "vendor7@example.com",
          status: "active",
          totalBids: 36,
          joinedDate: "2024-02-11",
        },
        {
          id: 17,
          mcId: "MC-456789",
          email: "vendor8@example.com",
          status: "active",
          totalBids: 27,
          joinedDate: "2024-03-08",
        },
        {
          id: 18,
          mcId: "MC-678901",
          email: "vendor9@example.com",
          status: "active",
          totalBids: 34,
          joinedDate: "2024-01-25",
        },
        {
          id: 19,
          mcId: "MC-111222",
          email: "robert.chen@fasthaul.com",
          status: "active",
          totalBids: 39,
          joinedDate: "2024-02-05",
        },
        {
          id: 20,
          mcId: "MC-333444",
          email: "lisa.martinez@quickship.com",
          status: "active",
          totalBids: 30,
          joinedDate: "2024-03-15",
        },
      ];
      localStorage.setItem("vendors", JSON.stringify(defaultVendors));
      setVendors(defaultVendors);
    } else {
      const migratedVendors = savedVendors.map((vendor: Vendor) => {
        if (!vendor.mcId || vendor.mcId === "") {
          if (vendor.email === "john.smith@transport.com") {
            return { ...vendor, mcId: "MC-123456" };
          } else if (vendor.email === "sarah.j@logistics.com") {
            return { ...vendor, mcId: "MC-789012" };
          } else if (vendor.email === "mike@davisfreight.com") {
            return { ...vendor, mcId: "MC-345678" };
          } else {
            return {
              ...vendor,
              mcId: `MC-${Math.floor(100000 + Math.random() * 900000)}`,
            };
          }
        }
        return vendor;
      });

      localStorage.setItem("vendors", JSON.stringify(migratedVendors));
      setVendors(migratedVendors);
    }
  }, []);

  const loadVendorHistory = (vendor: Vendor) => {
    try {
      const savedRatesString = localStorage.getItem("submittedRates");
      const savedRates = savedRatesString ? JSON.parse(savedRatesString) : [];

      if (!Array.isArray(savedRates)) {
        console.log("[v0] savedRates is not an array:", savedRates);
        setVendorHistories((prev) => ({
          ...prev,
          [vendor.id]: [],
        }));
        return;
      }

      const vendorRates = savedRates.filter(
        (rate: any) => rate.vendorId === vendor.mcId
      );
      console.log(
        "[v0] Found rates for vendor",
        vendor.mcId,
        ":",
        vendorRates.length
      );

      const history: RateHistory[] = vendorRates.map((rate: any) => ({
        id: rate.id,
        route: `${rate.startCity} → ${rate.endCity}`,
        baseRate: `$${rate.baseRate.toFixed(2)}`,
        fsc: `${rate.fsc.toFixed(2)}%`,
        total: `$${rate.total.toFixed(2)}`,
        submittedDate: rate.submittedAt,
      }));

      setVendorHistories((prev) => ({
        ...prev,
        [vendor.id]: history,
      }));
    } catch (error) {
      console.error("[v0] Error loading vendor history:", error);
      setVendorHistories((prev) => ({
        ...prev,
        [vendor.id]: [],
      }));
    }
  };

  const toggleVendorHistory = (vendor: Vendor) => {
    if (expandedVendorId === vendor.id) {
      setExpandedVendorId(null);
    } else {
      setExpandedVendorId(vendor.id);
      if (!vendorHistories[vendor.id]) {
        loadVendorHistory(vendor);
      }
    }
  };

  const handleAddEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (trimmedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      if (!emailList.includes(trimmedEmail)) {
        setEmailList([...emailList, trimmedEmail]);
      }
      setEmailInput("");
    }
  };

  const handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddEmail(emailInput);
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter((email) => email !== emailToRemove));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const emails = text
          .split(/[\n,;]/)
          .map((email) => email.trim())
          .filter((email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

        const uniqueEmails = [...new Set([...emailList, ...emails])];
        setEmailList(uniqueEmails);
      };
      reader.readAsText(file);
    }
    e.target.value = "";
  };

  const handleAddVendor = () => {
    if (emailList.length > 0) {
      const newVendors: Vendor[] = emailList.map((email) => ({
        id: Date.now() + Math.random(),
        mcId: null,
        email: email,
        status: "inactive",
        totalBids: 0,
        joinedDate: new Date().toISOString().split("T")[0],
      }));

      const updatedVendors = [...vendors, ...newVendors];
      setVendors(updatedVendors);
      localStorage.setItem("vendors", JSON.stringify(updatedVendors));

      setEmailList([]);
      setEmailInput("");
      setOpenDialog(false);
    }
  };

  const handleDeleteVendor = (id: number) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      const updatedVendors = vendors.filter((v) => v.id !== id);
      setVendors(updatedVendors);
      localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    }
  };

  const handleBanVendor = (id: number) => {
    if (confirm("Are you sure you want to ban this vendor?")) {
      const updatedVendors = vendors.map((v) =>
        v.id === id
          ? {
              ...v,
              status: (v.status === "banned" ? "active" : "banned") as
                | "active"
                | "banned",
            }
          : v
      );

      setVendors(updatedVendors);
      localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    }
  };

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
            <p>Manage all vendors in the system</p>
          </PageTitleSection>
          <AddButton onClick={() => setOpenDialog(true)}>
            <Truck size={18} />
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
            <TableContainer>
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
                    <>
                      <TableRow key={vendor.id}>
                        <TableCell>
                          <VendorName>{vendor.mcId || "Not Added"}</VendorName>
                        </TableCell>
                        <TableCell>
                          <VendorEmail>{vendor.email}</VendorEmail>
                        </TableCell>
                        <TableCell>
                          <StatusBadge $status={vendor.status}>
                            {vendor.status === "active"
                              ? "Active"
                              : vendor.status === "banned"
                              ? "Banned"
                              : "Inactive"}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>{vendor.totalBids}</TableCell>
                        <TableCell>
                          {new Date(vendor.joinedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <ActionButtons>
                            <ToggleButton
                              onClick={() => toggleVendorHistory(vendor)}
                              title={
                                expandedVendorId === vendor.id
                                  ? "Hide Rate History"
                                  : "View Rate History"
                              }
                            >
                              {expandedVendorId === vendor.id ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </ToggleButton>

                            <BanButton
                              onClick={() => handleBanVendor(vendor.id)}
                              title={
                                vendor.status !== "banned"
                                  ? "Ban Vendor"
                                  : "UnBan Vendor"
                              }
                            >
                              <Ban size={18} />
                            </BanButton>
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
                      <AccordionRow
                        key={`${vendor.id}-accordion`}
                        $isOpen={expandedVendorId === vendor.id}
                      >
                        <AccordionCell colSpan={6}>
                          <AccordionContent
                            $isOpen={expandedVendorId === vendor.id}
                          >
                            <HistoryContainer>
                              <HistoryHeader>
                                Rate History - {vendor.mcId}
                              </HistoryHeader>
                              {vendorHistories[vendor.id] &&
                              vendorHistories[vendor.id].length > 0 ? (
                                <HistoryScrollContainer>
                                  <HistoryList>
                                    {vendorHistories[vendor.id].map(
                                      (history) => (
                                        <HistoryItem key={history.id}>
                                          <HistoryItemHeader>
                                            <HistoryRoute>
                                              {history.route}
                                            </HistoryRoute>
                                            <HistoryDate>
                                              {history.submittedDate}
                                            </HistoryDate>
                                          </HistoryItemHeader>
                                          <HistoryDetails>
                                            <span>
                                              <strong>Base Rate:</strong>{" "}
                                              {history.baseRate}
                                            </span>
                                            <span>
                                              <strong>FSC:</strong>{" "}
                                              {history.fsc}
                                            </span>
                                            <span>
                                              <strong>Total:</strong>{" "}
                                              {history.total}
                                            </span>
                                          </HistoryDetails>
                                        </HistoryItem>
                                      )
                                    )}
                                  </HistoryList>
                                </HistoryScrollContainer>
                              ) : (
                                <EmptyHistory>
                                  No bid history available for this vendor
                                </EmptyHistory>
                              )}
                            </HistoryContainer>
                          </AccordionContent>
                        </AccordionCell>
                      </AccordionRow>
                    </>
                  ))}
                </TableBody>
              </VendorsTable>
            </TableContainer>
          )}
        </VendorsCard>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Vendor(s)</DialogTitle>
          <DialogContent>
            <EmailInputSection>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                placeholder="Enter email and press Enter or comma"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleEmailKeyPress}
                onBlur={() => emailInput && handleAddEmail(emailInput)}
              />
              <HelpText>Press Enter or comma to add multiple emails</HelpText>
              {emailList.length > 0 && (
                <EmailChipsContainer>
                  {emailList.map((email) => (
                    <EmailChip key={email}>
                      {email}
                      <RemoveChipButton
                        onClick={() => handleRemoveEmail(email)}
                      >
                        ×
                      </RemoveChipButton>
                    </EmailChip>
                  ))}
                </EmailChipsContainer>
              )}
              <CSVUploadButton>
                <Upload size={18} />
                Import from CSV
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCSVUpload}
                />
              </CSVUploadButton>
              <HelpText>
                Upload a CSV file with email addresses (one per line or
                comma-separated)
              </HelpText>
            </EmailInputSection>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
                setEmailList([]);
                setEmailInput("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddVendor}
              variant="contained"
              color="primary"
              disabled={emailList.length === 0}
            >
              Add{" "}
              {emailList.length > 0
                ? `${emailList.length} Vendor${emailList.length > 1 ? "s" : ""}`
                : "Vendor"}
            </Button>
          </DialogActions>
        </Dialog>
      </Main>
    </PageContainer>
  );
}
