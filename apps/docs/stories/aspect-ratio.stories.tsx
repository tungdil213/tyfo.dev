import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@tyfo.dev/ui/primitives/aspect-ratio";
import { Card } from "@tyfo.dev/ui/primitives/card";

const meta: Meta<typeof AspectRatio> = {
  title: "Primitives/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "number",
      description: "The aspect ratio of the container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

// Basic aspect ratio
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="A scenic mountain landscape with snow-capped peaks"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

// Square ratio
export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="A scenic mountain landscape with snow-capped peaks"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

// Portrait ratio
export const Portrait: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={3 / 4}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="A scenic mountain landscape with snow-capped peaks"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

// Video embed
export const VideoEmbed: Story = {
  render: () => (
    <div className="w-[600px]">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

// Map embed
export const MapEmbed: Story = {
  render: () => (
    <div className="w-[600px]">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580e2e94de649%3A0x901b3d155a82e0!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
          title="Google Maps"
          className="w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

// In a card
export const InCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="A scenic mountain landscape with snow-capped peaks"
          className="rounded-t-lg object-cover w-full h-full"
        />
      </AspectRatio>
      <div className="p-4">
        <h3 className="font-semibold">Image Card</h3>
        <p className="text-sm text-muted-foreground">
          A card with an image that maintains its aspect ratio.
        </p>
      </div>
    </Card>
  ),
};

// Multiple ratios comparison
export const RatioComparison: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[900px]">
      {[
        { ratio: 16 / 9, label: "16:9 Widescreen" },
        { ratio: 4 / 3, label: "4:3 Standard" },
        { ratio: 1, label: "1:1 Square" },
        { ratio: 3 / 4, label: "3:4 Portrait" },
        { ratio: 21 / 9, label: "21:9 Ultrawide" },
        { ratio: 2.35, label: "2.35:1 Cinemascope" },
      ].map((item) => (
        <div key={item.label}>
          <AspectRatio ratio={item.ratio}>
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="A scenic mountain landscape with snow-capped peaks"
              className="rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
          <p className="mt-2 text-sm text-center text-muted-foreground">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  ),
};

// With background pattern
export const WithPattern: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <div className="w-full h-full rounded-md bg-gradient-to-r from-blue-500 to-purple-500 p-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-white/10" />
          <h3 className="relative text-2xl font-bold text-white">
            With Background Pattern
          </h3>
        </div>
      </AspectRatio>
    </div>
  ),
}; 