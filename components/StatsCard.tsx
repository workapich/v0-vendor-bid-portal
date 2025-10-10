"use client"

import styled from "styled-components"
import type { LucideIcon } from "lucide-react"

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-between;
  margin-bottom: 0.5rem;
`

const CardLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(71 85 105);
`

const CardValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(15 23 42);
`

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: rgb(100 116 139);
  margin-top: 0.25rem;
  margin-bottom: 0;
`

interface StatsCardProps {
  label: string
  value: number | string
  description: string
  icon: LucideIcon
}

export default function StatsCard({ label, value, description, icon: Icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardLabel>{label}</CardLabel>
        <Icon className="w-5 h-5" style={{ color: "rgb(37 99 235)" }} />
      </CardHeader>
      <CardValue>{value}</CardValue>
      <CardDescription>{description}</CardDescription>
    </Card>
  )
}
