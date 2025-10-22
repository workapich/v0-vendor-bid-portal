"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"
import { TextField, Card, CardContent } from "@mui/material"
import { UserPlus, Mail, Lock, Hash } from "lucide-react"
import Header from "@/components/Header"

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, rgb(248 250 252), rgb(226 232 240));
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
`

const RegisterContent = styled(CardContent)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconCircle = styled.div`
  width: 4rem;
  height: 4rem;
  background: rgb(37 99 235);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const StyledUserPlusIcon = styled(UserPlus)`
  width: 2rem;
  height: 2rem;
  color: white;
`

const RegisterTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: rgb(15 23 42);
`

const RegisterSubtitle = styled.p`
  text-align: center;
  color: rgb(71 85 105);
  margin-bottom: 2rem;
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(51 65 85);
  margin-bottom: 0.5rem;
`

const SmallIcon = styled.div`
  width: 1rem;
  height: 1rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

const StyledTextField = styled(TextField)`
  width: 100%;
  
  & .MuiOutlinedInput-root {
    background: white;
    
    &:hover fieldset {
      border-color: rgb(37 99 235);
    }
    
    &.Mui-focused fieldset {
      border-color: rgb(37 99 235);
    }
  }
`

const RegisterButton = styled.button`
  width: 100%;
  background: rgb(37 99 235);
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgb(29 78 216);
  }
  
  &:active {
    background: rgb(30 64 175);
  }
`

const BackToLoginButton = styled.button`
  width: 100%;
  background: white;
  color: rgb(37 99 235);
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  border: 2px solid rgb(37 99 235);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgb(239 246 255);
  }
  
  &:active {
    background: rgb(219 234 254);
  }
`

const Footer = styled.footer`
  background: white;
  border-top: 1px solid rgb(226 232 240);
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgb(71 85 105);
`

const FooterStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  color: rgb(22 163 74);
`

const StatusDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: rgb(22 163 74);
  border-radius: 50%;
`

const SuccessMessage = styled.div`
  width: 100%;
  padding: 0.75rem;
  background: rgb(220 252 231);
  border: 1px solid rgb(134 239 172);
  border-radius: 4px;
  color: rgb(22 101 52);
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
`

export default function RegisterPage() {
  const router = useRouter()
  const [mcid, setMcid] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleRegister = () => {
    // Reset messages
    setError("")
    setSuccess(false)

    // Validation
    if (!mcid.trim()) {
      setError("MCID is required")
      return
    }
    if (!email.trim()) {
      setError("Email is required")
      return
    }
    if (!password.trim()) {
      setError("Password is required")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate registration (in a real app, this would call an API)
    console.log("[v0] Registration attempt:", { mcid, email })

    // Show success message
    setSuccess(true)

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister()
    }
  }

  const handleBackToLogin = () => {
    router.push("/")
  }

  return (
    <PageContainer>
      <Header />

      <Main>
        <RegisterCard>
          <RegisterContent>
            <IconCircle>
              <StyledUserPlusIcon />
            </IconCircle>

            <RegisterTitle>Create Account</RegisterTitle>
            <RegisterSubtitle>Register to access the bid portal</RegisterSubtitle>

            {success && <SuccessMessage>Registration successful! Redirecting to login...</SuccessMessage>}

            <FormSection>
              <InputWrapper>
                <InputLabel>
                  <SmallIcon>
                    <Hash />
                  </SmallIcon>
                  MCID
                </InputLabel>
                <StyledTextField
                  type="text"
                  placeholder="Enter your MCID"
                  value={mcid}
                  onChange={(e) => {
                    setMcid(e.target.value)
                    setError("")
                  }}
                  onKeyPress={handleKeyPress}
                  error={!!error && !mcid.trim()}
                  variant="outlined"
                  autoFocus
                />
              </InputWrapper>

              <InputWrapper>
                <InputLabel>
                  <SmallIcon>
                    <Mail />
                  </SmallIcon>
                  Email
                </InputLabel>
                <StyledTextField
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  onKeyPress={handleKeyPress}
                  error={!!error && !email.trim()}
                  variant="outlined"
                />
              </InputWrapper>

              <InputWrapper>
                <InputLabel>
                  <SmallIcon>
                    <Lock />
                  </SmallIcon>
                  Password
                </InputLabel>
                <StyledTextField
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  onKeyPress={handleKeyPress}
                  error={!!error}
                  helperText={error}
                  variant="outlined"
                />
              </InputWrapper>

              <RegisterButton onClick={handleRegister}>Register</RegisterButton>

              <BackToLoginButton onClick={handleBackToLogin}>Back to Login</BackToLoginButton>
            </FormSection>
          </RegisterContent>
        </RegisterCard>
      </Main>

      <Footer>
        <p>© 2025 Motor Carrier Services. All rights reserved.</p>
        <FooterStatus>
          <StatusDot />
          Your information is secure and encrypted
        </FooterStatus>
      </Footer>
    </PageContainer>
  )
}
