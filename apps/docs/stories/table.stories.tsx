import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@tyfo.dev/ui/primitives/table";
import { Badge } from "@tyfo.dev/ui/primitives/badge";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { Checkbox } from "@tyfo.dev/ui/primitives/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@tyfo.dev/ui/primitives/avatar";
import {
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  Check,
  CreditCard,
  Download,
} from "lucide-react";

const meta: Meta<typeof Table> = {
  title: "Primitives/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

// Basic table
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            invoice: "INV001",
            status: "Paid",
            method: "Credit Card",
            amount: "$250.00",
          },
          {
            invoice: "INV002",
            status: "Pending",
            method: "PayPal",
            amount: "$150.00",
          },
          {
            invoice: "INV003",
            status: "Unpaid",
            method: "Bank Transfer",
            amount: "$350.00",
          },
          {
            invoice: "INV004",
            status: "Paid",
            method: "Credit Card",
            amount: "$450.00",
          },
          {
            invoice: "INV005",
            status: "Processing",
            method: "PayPal",
            amount: "$550.00",
          },
        ].map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === "Paid"
                    ? "default"
                    : invoice.status === "Pending"
                    ? "secondary"
                    : "destructive"
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// With selection
export const WithSelection: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
          },
          {
            name: "Alice Brown",
            email: "alice@example.com",
            role: "Editor",
            status: "Offline",
          },
          {
            name: "Bob Wilson",
            email: "bob@example.com",
            role: "User",
            status: "Active",
          },
        ].map((user) => (
          <TableRow key={user.email}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge
                variant={user.status === "Active" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// Sortable columns
export const SortableColumns: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" className="p-0 h-8">
              Transaction
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" className="p-0 h-8">
              Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" className="p-0 h-8">
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            id: "TX001",
            amount: "$250.00",
            status: "Complete",
          },
          {
            id: "TX002",
            amount: "$150.00",
            status: "Processing",
          },
          {
            id: "TX003",
            amount: "$350.00",
            status: "Failed",
          },
        ].map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  transaction.status === "Complete"
                    ? "default"
                    : transaction.status === "Processing"
                    ? "secondary"
                    : "destructive"
                }
              >
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// Payment methods table
export const PaymentMethods: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Method</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            type: "Credit Card",
            number: "**** **** **** 4242",
            expires: "04/24",
            icon: CreditCard,
            isDefault: true,
          },
          {
            type: "Credit Card",
            number: "**** **** **** 5555",
            expires: "08/25",
            icon: CreditCard,
            isDefault: false,
          },
        ].map((method) => (
          <TableRow key={method.number}>
            <TableCell>
              <method.icon className="h-4 w-4" />
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{method.type}</span>
                <span className="text-sm text-muted-foreground">
                  {method.number}
                </span>
              </div>
            </TableCell>
            <TableCell>{method.expires}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                {method.isDefault && (
                  <Badge variant="secondary" className="font-normal">
                    Default
                  </Badge>
                )}
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}; 