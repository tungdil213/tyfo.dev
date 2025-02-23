import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@tyfo.dev/ui/primitives/context-menu";
import { Card } from "@tyfo.dev/ui/primitives/card";
import {
  Copy,
  Edit,
  Link,
  MoreHorizontal,
  Share,
  Trash,
  User,
  UserPlus,
  Users,
} from "lucide-react";

const meta: Meta<typeof ContextMenu> = {
  title: "Primitives/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

// Basic context menu
export const Default: Story = {
  render: function DefaultContextMenu() {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

// With checkboxes and radio groups
export const WithSelections: Story = {
  render: function SelectionsContextMenu() {
    const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true);
    const [showActivityBar, setShowActivityBar] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<"top" | "bottom" | "left">("left");

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>Appearance</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Panel Position</ContextMenuLabel>
          <ContextMenuRadioGroup 
            value={position} 
            onValueChange={(value: string) => setPosition(value as "top" | "bottom" | "left")}
          >
            <ContextMenuRadioItem value="left">Left</ContextMenuRadioItem>
            <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
            <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

// With nested submenus
export const WithSubmenus: Story = {
  render: function SubmenusContextMenu() {
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Share className="mr-2 h-4 w-4" />
              Share
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <Link className="mr-2 h-4 w-4" />
                Copy Link
              </ContextMenuItem>
              <ContextMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Users className="mr-2 h-4 w-4" />
                View Members
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            More Options...
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

// Card with context menu
export const CardContextMenu: Story = {
  render: function CardWithContextMenu() {
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Card className="w-[300px] p-6">
            <h3 className="text-lg font-semibold">Project Title</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Right click on this card to see the context menu options.
            </p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>Project Actions</ContextMenuLabel>
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </ContextMenuItem>
          <ContextMenuItem>
            <Share className="mr-2 h-4 w-4" />
            Share Project
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              Collaborators
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Collaborator
              </ContextMenuItem>
              <ContextMenuItem>
                <Users className="mr-2 h-4 w-4" />
                View All
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete Project
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
}; 