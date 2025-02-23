import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@tyfo.dev/ui/primitives/select";

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Basic select
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// With label and groups
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// With disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>
            Banana
          </SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// Form field example
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label
        htmlFor="food"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Favorite Food
      </label>
      <Select>
        <SelectTrigger id="food" className="w-[180px]">
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="pizza">Pizza</SelectItem>
            <SelectItem value="burger">Burger</SelectItem>
            <SelectItem value="pasta">Pasta</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Select your favorite food from the list.
      </p>
    </div>
  ),
};

// With error state
export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <label
        htmlFor="error-select"
        className="text-sm font-medium leading-none text-destructive"
      >
        Invalid Selection
      </label>
      <Select>
        <SelectTrigger
          id="error-select"
          className="w-[180px]"
          aria-invalid="true"
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-sm text-destructive">Please select a valid option.</p>
    </div>
  ),
};

// Long list with scroll
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {[
            "United States",
            "United Kingdom",
            "Canada",
            "Australia",
            "Germany",
            "France",
            "Italy",
            "Spain",
            "Japan",
            "China",
            "India",
            "Brazil",
            "Mexico",
          ].map((country) => (
            <SelectItem key={country} value={country.toLowerCase()}>
              {country}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}; 