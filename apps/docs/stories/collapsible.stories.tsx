import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@tyfo.dev/ui/primitives/collapsible";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import { Card } from "@tyfo.dev/ui/primitives/card";
import {
  ChevronsUpDown,
  Plus,
  Minus,
  Settings,
  ChevronRight,
  Bell,
  Mail,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Collapsible> = {
  title: "Primitives/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

// Basic collapsible
export const Default: Story = {
  render: function DefaultCollapsible() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            Notifications
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 text-sm">
            Push Notifications: On
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            Email Notifications: Off
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

// With animation
export const WithAnimation: Story = {
  render: function AnimatedCollapsible() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
          >
            <span>Toggle Content</span>
            {isOpen ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="transition-all data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              This content smoothly animates when opening and closing.
            </p>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

// Settings panel
export const SettingsPanel: Story = {
  render: function SettingsCollapsible() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[400px]"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Advanced Settings</span>
            </div>
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 px-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Notifications</span>
            </div>
            <Badge>New</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email Preferences</span>
            </div>
            <Button variant="ghost" size="sm">Configure</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

// Multiple sections
export const MultipleSections: Story = {
  render: function MultipleSectionsCollapsible() {
    const [openSections, setOpenSections] = useState<string[]>([]);

    const toggleSection = (section: string) => {
      setOpenSections((current) =>
        current.includes(section)
          ? current.filter((s) => s !== section)
          : [...current, section]
      );
    };

    return (
      <div className="w-[400px] space-y-2">
        {[
          {
            id: "notifications",
            title: "Notifications",
            icon: Bell,
            content: "Configure your notification preferences",
          },
          {
            id: "messages",
            title: "Messages",
            icon: Mail,
            content: "Manage your message settings",
          },
          {
            id: "alerts",
            title: "Alerts",
            icon: AlertCircle,
            content: "Set up your alert thresholds",
          },
        ].map((section) => (
          <Collapsible
            key={section.id}
            open={openSections.includes(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between p-4"
              >
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4" />
                  <span>{section.title}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openSections.includes(section.id) ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-2">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  {section.content}
                </p>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    );
  },
};

// Nested collapsibles
export const NestedCollapsibles: Story = {
  render: function NestedCollapsible() {
    const [outerOpen, setOuterOpen] = useState(false);
    const [innerOpen, setInnerOpen] = useState(false);

    return (
      <Collapsible
        open={outerOpen}
        onOpenChange={setOuterOpen}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Outer Section</span>
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-200 ${
                outerOpen ? "rotate-90" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 px-4 pt-2">
          <p className="text-sm text-muted-foreground">
            This is the outer content
          </p>
          <Collapsible
            open={innerOpen}
            onOpenChange={setInnerOpen}
            className="space-y-2"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between"
                size="sm"
              >
                <span>Inner Section</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    innerOpen ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 px-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  This is the inner content
                </p>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    );
  },
}; 