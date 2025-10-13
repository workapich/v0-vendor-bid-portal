"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import { Truck, Lock } from "lucide-react"

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, oklch(0.5 0.15 250) 0%, oklch(0.4 0.12 250) 100%);
  padding: 24px;
`

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 48px;
  width: 100%;
  max-width: 440px;
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  justify-content: center;
`

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: oklch(0.5 0.15 250);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
  }
`

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: oklch(0.2 0 0);
  margin: 0;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: oklch(0.2 0 0);
  margin: 0 0 8px 0;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 15px;
  color: oklch(0.5 0 0);
  margin: 0 0 32px 0;
  text-align: center;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: oklch(0.3 0 0);
`

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid oklch(0.92 0 0);
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  background: white;
  
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
  padding: 14px 24px;
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

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px;
  background: oklch(0.98 0 0);
  border-radius: 8px;
  font-size: 13px;
  color: oklch(0.5 0 0);
  
  svg {
    width: 16px;
    height: 16px;
    color: oklch(0.6 0.15 145);
  }
`

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation for demo
    if (username && password) {
      router.push("/cities")
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LogoSection>
          <LogoIcon>
            <Truck />
          </LogoIcon>
          <LogoText>VendorBid</LogoText>
        </LogoSection>

        <Title>Vendor Portal</Title>
        <Subtitle>Sign in to access your bidding dashboard</Subtitle>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Sign In</SubmitButton>
        </LoginForm>

        <SecureBadge>
          <Lock />
          <span>Secure Portal - Your data is encrypted</span>
        </SecureBadge>
      </LoginCard>
    </LoginContainer>
  )
}
