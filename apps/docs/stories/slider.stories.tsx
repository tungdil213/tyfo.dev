import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@tyfo.dev/ui/primitives/slider";
import { useState } from "react";
import { Volume2, VolumeX, Sun, Moon } from "lucide-react";

const meta: Meta<typeof Slider> = {
  title: "Primitives/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "object",
      description: "The default value(s) of the slider",
    },
    min: {
      control: "number",
      description: "The minimum value of the slider",
    },
    max: {
      control: "number",
      description: "The maximum value of the slider",
    },
    step: {
      control: "number",
      description: "The step value of the slider",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the slider",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Basic slider
export const Default: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} />,
};

// Volume control
export const VolumeControl: Story = {
  render: function VolumeSlider() {
    const [volume, setVolume] = useState(50);

    return (
      <div className="flex items-center space-x-4">
        {volume === 0 ? (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Volume2 className="h-5 w-5 text-primary" />
        )}
        <Slider
          defaultValue={[volume]}
          max={100}
          step={1}
          className="w-[200px]"
          onValueChange={([value]) => setVolume(value)}
        />
        <span className="w-12 text-sm text-muted-foreground">
          {volume}%
        </span>
      </div>
    );
  },
};

// Range slider
export const Range: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Price Range</span>
        <span>$20-$80</span>
      </div>
      <Slider defaultValue={[20, 80]} min={0} max={100} step={1} />
    </div>
  ),
};

// Brightness control
export const BrightnessControl: Story = {
  render: function BrightnessSlider() {
    const [brightness, setBrightness] = useState(75);

    return (
      <div className="w-[200px] space-y-4">
        <div className="flex items-center justify-between">
          <Moon className="h-4 w-4" />
          <Sun className="h-5 w-5" />
        </div>
        <Slider
          defaultValue={[brightness]}
          max={100}
          step={1}
          onValueChange={([value]) => setBrightness(value)}
        />
      </div>
    );
  },
};

// Vertical slider
export const Vertical: Story = {
  render: () => (
    <div className="flex h-[180px] items-center justify-center">
      <Slider
        defaultValue={[50]}
        orientation="vertical"
        className="h-[150px]"
      />
    </div>
  ),
};

// Multiple vertical sliders
export const VerticalGroup: Story = {
  render: () => (
    <div className="flex h-[180px] items-end space-x-8 rounded-lg border p-8">
      {[
        { value: 30, label: "Low" },
        { value: 60, label: "Medium" },
        { value: 80, label: "High" },
        { value: 45, label: "Custom 1" },
        { value: 65, label: "Custom 2" },
      ].map((item) => (
        <Slider
          key={item.label}
          defaultValue={[item.value]}
          orientation="vertical"
          className="h-[150px]"
        />
      ))}
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Slider defaultValue={[50]} disabled />
      <Slider defaultValue={[20, 80]} disabled />
    </div>
  ),
};

// Custom styles
export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-8">
      <Slider
        defaultValue={[75]}
        className="[&_[data-slot=slider-range]]:bg-blue-500 [&_[data-slot=slider-thumb]]:border-blue-500"
      />
      <Slider
        defaultValue={[50]}
        className="[&_[data-slot=slider-range]]:bg-green-500 [&_[data-slot=slider-thumb]]:border-green-500"
      />
      <Slider
        defaultValue={[25]}
        className="[&_[data-slot=slider-range]]:bg-red-500 [&_[data-slot=slider-thumb]]:border-red-500"
      />
      <Slider
        defaultValue={[60]}
        className="[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-purple-500 [&_[data-slot=slider-range]]:to-pink-500 [&_[data-slot=slider-thumb]]:border-purple-500"
      />
    </div>
  ),
};

// Step values
export const StepValues: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-sm text-muted-foreground">Step: 10</span>
        <Slider defaultValue={[50]} step={10} />
      </div>
      <div className="space-y-2">
        <span className="text-sm text-muted-foreground">Step: 20</span>
        <Slider defaultValue={[40]} step={20} />
      </div>
      <div className="space-y-2">
        <span className="text-sm text-muted-foreground">Step: 25</span>
        <Slider defaultValue={[75]} step={25} />
      </div>
    </div>
  ),
}; 