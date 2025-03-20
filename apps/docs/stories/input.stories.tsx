import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@tyfo.dev/ui/primitives/input";
import { Mail, Search, User } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      description: "The type of the input field",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic input field
export const Default: Story = {
  render: (args) => <Input {...args} />,
  args: {
    placeholder: "Enter text here...",
  },
};

// Input with different types
export const Email: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const NumberInput: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

// State variations
export const Disabled: Story = {
  render: (args) => <Input {...args} />,
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Required: Story = {
  render: (args) => <Input {...args} />,
  args: {
    required: true,
    placeholder: "Required field",
  },
};

// With validation state
export const Invalid: Story = {
  render: (args) => (
    <Input
      {...args}
      aria-invalid="true"
      placeholder="Invalid input"
    />
  ),
};

// With icons (using wrapper div for positioning)
export const WithLeadingIcon: Story = {
  render: (args) => (
    <div className="relative">
      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input {...args} className="pl-10" />
    </div>
  ),
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const WithTrailingIcon: Story = {
  render: (args) => (
    <div className="relative">
      <Input {...args} className="pr-10" />
      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  ),
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

// Common form patterns
export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label
        htmlFor="username"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Username
      </label>
      <Input id="username" {...args} />
    </div>
  ),
  args: {
    placeholder: "Enter your username",
  },
};

export const WithLabelAndDescription: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label
        htmlFor="name"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Name
      </label>
      <Input id="name" {...args} />
      <p className="text-sm text-muted-foreground">
        This is how your name will appear in your account.
      </p>
    </div>
  ),
  args: {
    placeholder: "Enter your name",
  },
};

// File input
export const FileInput: Story = {
  render: (args) => <Input {...args} />,
  args: {
    type: "file",
    accept: "image/*",
  },
};

// Form group example
export const FormGroup: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="email-input"
          className="text-sm font-medium leading-none"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email-input"
            {...args}
            type="email"
            placeholder="Enter your email"
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="username-input"
          className="text-sm font-medium leading-none"
        >
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="username-input"
            {...args}
            placeholder="Enter your username"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  ),
}; 