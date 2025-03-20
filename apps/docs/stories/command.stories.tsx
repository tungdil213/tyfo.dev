import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@tyfo.dev/ui/primitives/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Command> = {
  title: "Primitives/Command",
  component: Command,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Command>;

// Basic command menu
export const Default: Story = {
  render: function DefaultCommand() {
    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

// Command Dialog
export const AsDialog: Story = {
  render: function DialogCommand() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
        >
          <Search className="mr-2 h-4 w-4" />
          Search...
          <CommandShortcut className="ml-2">⌘K</CommandShortcut>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Create New</span>
                </CommandItem>
                <CommandItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Send Email</span>
                </CommandItem>
                <CommandItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Send Message</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    );
  },
};

// With sections and search
export const WithSections: Story = {
  render: function SectionsCommand() {
    const [inputValue, setInputValue] = useState("");
    
    const sections = {
      "Quick Actions": [
        { icon: Plus, label: "Create New Document", shortcut: "⌘N" },
        { icon: Mail, label: "Compose Email", shortcut: "⌘E" },
        { icon: MessageSquare, label: "New Chat", shortcut: "⌘M" },
      ],
      "Recent Items": [
        { icon: Calendar, label: "Q4 Planning", shortcut: null },
        { icon: Mail, label: "Weekly Newsletter", shortcut: null },
        { icon: MessageSquare, label: "Team Chat", shortcut: null },
      ],
      "Tools": [
        { icon: Calculator, label: "Calculator", shortcut: "⌘1" },
        { icon: Settings, label: "Preferences", shortcut: "⌘," },
        { icon: CreditCard, label: "Billing Portal", shortcut: "⌘B" },
      ],
    };

    const filteredSections = Object.entries(sections).map(([heading, items]) => ({
      heading,
      items: items.filter(item =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    })).filter(section => section.items.length > 0);

    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Type to search..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredSections.map((section, index) => (
            <React.Fragment key={section.heading}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={section.heading}>
                {section.items.map((item) => (
                  <CommandItem key={item.label}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    );
  },
};

// With loading state and async search
export const AsyncSearch: Story = {
  render: function AsyncSearchCommand() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    
    const handleSearch = (value: string) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          "Dashboard",
          "Profile Settings",
          "Billing History",
          "Team Members",
          "API Documentation",
        ].filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        );
        setResults(mockResults);
        setLoading(false);
      }, 500);
    };

    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search..."
          onValueChange={handleSearch}
        />
        <CommandList>
          {loading ? (
            <div className="py-6 text-center text-sm">
              Loading...
            </div>
          ) : results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Results">
              {results.map((result) => (
                <CommandItem key={result}>
                  <Search className="mr-2 h-4 w-4" />
                  {result}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    );
  },
}; 