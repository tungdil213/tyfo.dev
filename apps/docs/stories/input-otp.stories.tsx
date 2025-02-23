import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@tyfo.dev/ui/primitives/input-otp"
import { Button } from "@tyfo.dev/ui/primitives/button"
import { Card } from "@tyfo.dev/ui/primitives/card"

const meta = {
  title: "Primitives/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: "number",
      description: "Maximum length of the OTP input",
    },
    pattern: {
      control: "text",
      description: "Regular expression pattern for input validation",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    value: {
      control: "text",
      description: "Current value of the input",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[350px] w-full items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof InputOTP>

// Basic OTP input
export const Default: Story = {
  args: {
    maxLength: 6,
  },
  render: ({ maxLength }) => (
    <InputOTP maxLength={maxLength}>
      <InputOTPGroup>
        {Array.from({ length: maxLength }, (_, i) => ({
          id: `default-slot-${i + 1}`,
          position: i
        })).map((slot) => (
          <InputOTPSlot key={slot.id} index={slot.position} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

// With separator
export const WithSeparator: Story = {
  args: {
    maxLength: 6,
  },
  render: ({ maxLength }) => (
    <InputOTP maxLength={maxLength}>
      <InputOTPGroup>
        {Array.from({ length: maxLength }, (_, i) => ({
          id: `separator-slot-${i + 1}`,
          position: i
        })).map((slot) => (
          <React.Fragment key={slot.id}>
            <InputOTPSlot index={slot.position} />
            {slot.position === 2 && <InputOTPSeparator />}
          </React.Fragment>
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

// In a verification form
export const VerificationForm: Story = {
  args: {
    maxLength: 6,
    pattern: "^[0-9]{1,6}$",
  },
  render: function VerificationForm({ maxLength, pattern }) {
    const [value, setValue] = useState("")
    const [isVerifying, setIsVerifying] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const handleSubmit = () => {
      setIsVerifying(true)
      setTimeout(() => {
        setIsVerified(true)
        setIsVerifying(false)
      }, 1500)
    }

    return (
      <Card className="w-[350px] p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Verify your email</h4>
            <p className="text-sm text-muted-foreground">
              Enter the verification code sent to your email
            </p>
          </div>
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={maxLength}
            pattern={pattern}
            disabled={isVerifying || isVerified}
          >
            <InputOTPGroup>
              {Array.from({ length: maxLength }, (_, i) => ({
                id: `verification-slot-${i + 1}`,
                position: i
              })).map((slot) => (
                <React.Fragment key={slot.id}>
                  <InputOTPSlot index={slot.position} />
                  {slot.position === 2 && <InputOTPSeparator />}
                </React.Fragment>
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={value.length < maxLength || isVerifying || isVerified}
          >
            {isVerifying ? "Verifying..." : isVerified ? "Verified ✓" : "Verify Email"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Didn't receive a code? <Button variant="link" className="p-0">Resend</Button>
          </p>
        </div>
      </Card>
    )
  },
}

// Pattern validation
export const PatternValidation: Story = {
  args: {
    maxLength: 4,
  },
  render: ({ maxLength }) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Numbers only (0-9)</h4>
        <InputOTP maxLength={maxLength} pattern="^[0-9]{1,4}$">
          <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => ({
              id: `numbers-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Letters only (A-F)</h4>
        <InputOTP maxLength={maxLength} pattern="^[A-F]{1,4}$">
          <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => ({
              id: `letters-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Mixed (0-9, A-F)</h4>
        <InputOTP maxLength={maxLength} pattern="^[0-9A-F]{1,4}$">
          <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => ({
              id: `mixed-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  ),
}

// Different lengths
export const DifferentLengths: Story = {
  args: {
    maxLength: 8,
  },
  render: ({ maxLength }) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">4-digit code</h4>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            {Array.from({ length: 4 }, (_, i) => ({
              id: `four-digit-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">6-digit code</h4>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, i) => ({
              id: `six-digit-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">8-digit code</h4>
        <InputOTP maxLength={maxLength}>
          <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => ({
              id: `eight-digit-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  args: {
    maxLength: 6,
    disabled: true,
    value: "123456",
  },
  render: ({ maxLength, disabled, value }) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Empty disabled</h4>
        <InputOTP maxLength={maxLength} disabled={disabled}>
          <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => ({
              id: `empty-disabled-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Filled disabled</h4>
        <InputOTP maxLength={maxLength} value={value} disabled={disabled}>
          <InputOTPGroup>
            {Array.from({ length: maxLength }, (_, i) => ({
              id: `filled-disabled-slot-${i + 1}`,
              position: i
            })).map((slot) => (
              <InputOTPSlot key={slot.id} index={slot.position} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  ),
} 