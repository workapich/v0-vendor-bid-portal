"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"
import { TextField, Card, CardContent } from "@mui/material"
import { Lock } from "lucide-react"
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

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
`

const LoginContent = styled(CardContent)`
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

const StyledLockIcon = styled(Lock)`
  width: 2rem;
  height: 2rem;
  color: white;
`

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: rgb(15 23 42);
`

const LoginSubtitle = styled.p`
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

const SmallLockIcon = styled(Lock)`
  width: 1rem;
  height: 1rem;
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

const LoginButton = styled.button`
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

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (password === "123456") {
      localStorage.setItem("userType", "admin")
      router.push("/cities")
    } else if (password === "qwerty") {
      localStorage.setItem("userType", "vendor")
      router.push("/cities")
    } else {
      setError("Invalid password")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <PageContainer>
      <Header />

      <Main>
        <LoginCard>
          <LoginContent>
            <IconCircle>
              <StyledLockIcon />
            </IconCircle>

            <LoginTitle>Vendor Entry</LoginTitle>
            <LoginSubtitle>Enter your password to access the bid portal</LoginSubtitle>

            <FormSection>
              <InputWrapper>
                <InputLabel>
                  <SmallLockIcon />
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
                  autoFocus
                />
              </InputWrapper>

              <LoginButton onClick={handleLogin}>Login</LoginButton>
            </FormSection>
          </LoginContent>
        </LoginCard>
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
