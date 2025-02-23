import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@tyfo.dev/ui/primitives/form"
import { Input } from "@tyfo.dev/ui/primitives/input"
import { Button } from "@tyfo.dev/ui/primitives/button"
import { Checkbox } from "@tyfo.dev/ui/primitives/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@tyfo.dev/ui/primitives/select"
import { Card } from "@tyfo.dev/ui/primitives/card"

const meta = {
  title: "Primitives/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[350px] w-full items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof Form>

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
})

export const LoginForm: Story = {
  parameters: {
    docs: {
      description: {
        story: "A basic login form with email, password, and remember me checkbox.",
      },
    },
  },
  render: () => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
    })

    return (
      <Card className="w-[350px] p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your email address to sign in
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </Card>
    )
  },
}

const profileFormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  bio: z.string().max(160, "Bio must not exceed 160 characters"),
  role: z.string({
    required_error: "Please select a role",
  }),
  notifications: z.boolean().default(true),
})

export const ProfileForm: Story = {
  parameters: {
    docs: {
      description: {
        story: "A profile settings form with username, bio, role selection, and notifications.",
      },
    },
  },
  render: () => {
    const form = useForm<z.infer<typeof profileFormSchema>>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
        username: "",
        bio: "",
        notifications: true,
      },
    })

    return (
      <Card className="w-[600px] p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <p className="text-sm text-muted-foreground">
              Update your profile information
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input placeholder="Tell us about yourself" {...field} />
                    </FormControl>
                    <FormDescription>
                      Brief description for your profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your role in the system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Email notifications</FormLabel>
                      <FormDescription>
                        Receive emails about your account activity
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </div>
      </Card>
    )
  },
}

const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
})

export const NewsletterForm: Story = {
  parameters: {
    docs: {
      description: {
        story: "A newsletter signup form with email and interest selection.",
      },
    },
  },
  render: () => {
    const form = useForm<z.infer<typeof newsletterFormSchema>>({
      resolver: zodResolver(newsletterFormSchema),
      defaultValues: {
        email: "",
        interests: [],
      },
    })

    return (
      <Card className="w-[400px] p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Newsletter Signup</h3>
            <p className="text-sm text-muted-foreground">
              Get updates on topics that interest you
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>Interests</FormLabel>
                {["Technology", "Design", "Business", "Marketing"].map(
                  (interest) => (
                    <FormField
                      key={interest}
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem
                          key={interest}
                          className="flex flex-row items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(interest)}
                              onCheckedChange={(checked) => {
                                const interests = checked
                                  ? [...(field.value || []), interest]
                                  : field.value?.filter((i: string) => i !== interest) || []
                                field.onChange(interests)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {interest}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  )
                )}
                <FormMessage />
              </div>
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    )
  },
} 