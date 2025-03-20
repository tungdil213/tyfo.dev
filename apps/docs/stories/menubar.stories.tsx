import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarLabel,
} from "@tyfo.dev/ui/primitives/menubar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

const meta: Meta<typeof Menubar> = {
  title: "Primitives/Menubar",
  component: Menubar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menubar>;

// Basic menubar
export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Tab
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Plus className="mr-2 h-4 w-4" />
            New Window
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <MenubarShortcut>⌘,</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Statusbar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            Zoom In
            <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Zoom Out
            <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// With nested submenus
export const WithSubmenus: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Account</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              Team
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Users
              </MenubarItem>
              <MenubarItem>
                <Settings className="mr-2 h-4 w-4" />
                Manage Team
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Communication</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Inbox</MenubarItem>
              <MenubarItem>Sent</MenubarItem>
              <MenubarItem>Drafts</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Direct Messages</MenubarItem>
              <MenubarItem>Channels</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// With radio groups
export const WithRadioGroups: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Theme</MenubarLabel>
          <MenubarRadioGroup value="light">
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="system">System</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarLabel>View</MenubarLabel>
          <MenubarRadioGroup value="grid">
            <MenubarRadioItem value="list">List</MenubarRadioItem>
            <MenubarRadioItem value="grid">Grid</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// Application menubar
export const ApplicationMenubar: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Cloud className="mr-2 h-4 w-4" />
          Platform
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Account</MenubarItem>
              <MenubarItem>Security</MenubarItem>
              <MenubarItem>Notifications</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </MenubarItem>
          <MenubarItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            Support
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Keyboard className="mr-2 h-4 w-4" />
            Keyboard Shortcuts
            <MenubarShortcut>⌘K</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}; 