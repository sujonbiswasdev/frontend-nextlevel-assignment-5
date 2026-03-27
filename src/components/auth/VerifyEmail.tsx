'use client'
import { RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import { resendVerificationCodeAction, verifyEmailAction } from "@/actions/auth.actions"
import Link from "next/link"


  function VerifyEmailForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [success, setSuccess] = useState(false)
    const email = searchParams.get("email") || "" // get email from query param for dynamic display
    console.log(otp,'otp')
    console.log('ljfjsfjsjfksjfj')
    const handleChange = (value: string) => {
      if (value.length <= 6) setOtp(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email) {
        toast.error("Email is required for verification.", { theme: "dark" })
        return
      }
      if (otp.length !== 6) {
        toast.error("Please enter the 6-digit verification code.", { theme: "dark" })
        return
      }
      setLoading(true)
      const toastId = toast.loading("Verifying...")
      try {
        const res = await verifyEmailAction({ email, otp: otp })
        if (!res.success) {
          toast.dismiss(toastId)
          toast.error(res.message || "Verification failed", { theme: "dark" })
          setLoading(false)
          return
        }
        toast.dismiss(toastId)
        setSuccess(true)
        toast.success(res.message || "Email successfully verified!", { theme: "dark" })
          router.push("/login")
      } catch (err: any) {
        toast.dismiss(toastId)
        toast.error("An error occurred during verification.", { theme: "dark" })
      }
      setLoading(false)
    }

    const resendVerificationCode = async () => {
      if (!email) {
        toast.error("No email specified to resend verification code.", { theme: "dark" })
        return
      }
      setResending(true)
      const toastId = toast.loading("Resending code...")
      try {
       const res= await resendVerificationCodeAction({ email })
      if (!res.success) {
        toast.dismiss(toastId)
        toast.error(res.message || "Failed to resend code.", { theme: "dark" })
        setResending(false)
        return
      }
      toast.dismiss(toastId)
      toast.success(res.message || "Verification code resent successfully!", { theme: "dark" })
      setResending(false)
      } catch {
        toast.dismiss(toastId)
        toast.error("Failed to resend code.", { theme: "dark" })
        setResending(false)
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>
              Enter the verification code sent to your email address:&nbsp;
              <span className="font-medium break-all">{email || <span className="italic">Your email</span>}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={resendVerificationCode}
                  disabled={resending}
                >
                  <RefreshCwIcon className={resending ? "animate-spin" : ""} />
                  {resending ? "Resending..." : "Resend Code"}
                </Button>
              </div>
              <InputOTP
                maxLength={6}
                id="otp-verification"
                required
                value={otp}
                onChange={handleChange}
                disabled={loading || success}
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-2" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                <a href="#">I no longer have access to this email address.</a>
              </FieldDescription>
            </Field>
          </CardContent>
          <CardFooter>
            <Field>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || otp.length !== 6 || success}
              >
                {loading ? "Verifying..." : success ? "Verified" : "Verify"}
              </Button>
              <div className="text-sm text-muted-foreground">
                Having trouble signing in?{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Contact support
                </Link>
              </div>
            </Field>
          </CardFooter>
        </Card>
      </form>
    )
  }
export default VerifyEmailForm