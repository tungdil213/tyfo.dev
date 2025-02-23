import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@tyfo.dev/ui/primitives/navigation-menu";
import { cn } from "@tyfo.dev/ui/utils";
import {
  BarChart,
  Book,
  Code2,
  FileText,
  Github,
  Laptop,
  LayoutDashboard,
  LifeBuoy,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";

const meta: Meta<typeof NavigationMenu> = {
  title: "Primitives/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

// Basic navigation menu
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Code2 className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Documentation
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Learn how to integrate our components in your application.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Get started with our component library.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/components" title="Components">
                Learn about our component library.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Application navigation
export const ApplicationNav: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem
                href="/analytics"
                title="Analytics"
                icon={BarChart}
              >
                View detailed analytics and reports.
              </ListItem>
              <ListItem
                href="/users"
                title="Users"
                icon={Users}
              >
                Manage users and permissions.
              </ListItem>
              <ListItem
                href="/settings"
                title="Settings"
                icon={Settings}
              >
                Configure application settings.
              </ListItem>
              <ListItem
                href="/help"
                title="Help"
                icon={LifeBuoy}
              >
                Get help and support.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Book className="mr-2 h-4 w-4" />
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <ListItem
                href="/docs"
                title="Documentation"
                icon={FileText}
              >
                Read our documentation.
              </ListItem>
              <ListItem
                href="/github"
                title="GitHub"
                icon={Github}
              >
                View source code on GitHub.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Sun className="mr-2 h-4 w-4 dark:hidden" />
            <Moon className="mr-2 h-4 w-4 hidden dark:block" />
            Theme
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4">
              <ListItem
                href="#"
                title="Light"
                icon={Sun}
                onClick={() => {}}
              >
                Light theme
              </ListItem>
              <ListItem
                href="#"
                title="Dark"
                icon={Moon}
                onClick={() => {}}
              >
                Dark theme
              </ListItem>
              <ListItem
                href="#"
                title="System"
                icon={Laptop}
                onClick={() => {}}
              >
                System theme
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]; 