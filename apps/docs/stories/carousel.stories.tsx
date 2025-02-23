import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@tyfo.dev/ui/primitives/carousel"
import { Card } from "@tyfo.dev/ui/primitives/card"
import { AspectRatio } from "@tyfo.dev/ui/primitives/aspect-ratio"
import { Button } from "@tyfo.dev/ui/primitives/button"
import { Badge } from "@tyfo.dev/ui/primitives/badge"
import { Heart, Share2, Star } from "lucide-react"

const meta = {
  title: "Primitives/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the carousel",
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof Carousel>

// Basic carousel
export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => ({
          id: `slide-${i + 1}`,
          color: ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"][i],
        })).map((slide) => (
          <CarouselItem key={slide.id}>
            <div className={`${slide.color} h-40 rounded-lg`} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// Image carousel
export const ImageCarousel: Story = {
  render: () => (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => ({
          id: `image-${i + 1}`,
          src: `https://picsum.photos/seed/${i + 1}/800/400`,
          alt: `Sample image ${i + 1}`,
        })).map((image) => (
          <CarouselItem key={image.id}>
            <AspectRatio ratio={2 / 1}>
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-lg object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// Product carousel
export const ProductCarousel: Story = {
  render: () => (
    <Carousel className="w-full max-w-5xl">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 6 }, (_, i) => ({
          id: `product-${i + 1}`,
          name: `Product ${i + 1}`,
          price: `$${(i + 1) * 10}.00`,
          image: `https://picsum.photos/seed/product${i + 1}/400/400`,
          rating: Math.floor(Math.random() * 2) + 4,
        })).map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-2 md:basis-1/2 lg:basis-1/3 md:pl-4"
          >
            <Card className="overflow-hidden">
              <AspectRatio ratio={1}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover"
                />
              </AspectRatio>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{product.name}</h3>
                  <Badge variant="secondary">{product.price}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: product.rating }, (_, i) => ({
                      id: `${product.id}-star-${i + 1}`,
                    })).map((star) => (
                      <Star
                        key={star.id}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// Vertical carousel
export const VerticalCarousel: Story = {
  render: () => (
    <Carousel orientation="vertical" className="h-[400px] max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => ({
          id: `vertical-${i + 1}`,
          color: ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"][i],
        })).map((slide) => (
          <CarouselItem key={slide.id}>
            <div className={`${slide.color} h-full rounded-lg p-6`}>
              <h3 className="text-lg font-semibold text-white">Slide {slide.id}</h3>
              <p className="text-sm text-white/80">
                This is a vertical carousel slide
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// Multiple items
export const MultipleItems: Story = {
  render: () => (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 10 }, (_, i) => ({
          id: `item-${i + 1}`,
          title: `Item ${i + 1}`,
          color: [
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-red-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-cyan-500",
            "bg-orange-500",
            "bg-teal-500",
          ][i],
        })).map((item) => (
          <CarouselItem
            key={item.id}
            className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:pl-4"
          >
            <div
              className={`${item.color} flex h-32 items-center justify-center rounded-lg`}
            >
              <span className="text-lg font-semibold text-white">
                {item.title}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// Auto-play carousel
export const AutoPlay: Story = {
  render: () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) return

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap())
      })
    }, [api])

    React.useEffect(() => {
      const timer = setInterval(() => {
        if (api) {
          api.scrollNext()
        }
      }, 3000)

      return () => clearInterval(timer)
    }, [api])

    return (
      <div className="w-full max-w-3xl">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 5 }, (_, i) => ({
              id: `auto-${i + 1}`,
              image: `https://picsum.photos/seed/auto${i + 1}/800/400`,
              alt: `Auto-play image ${i + 1}`,
            })).map((slide) => (
              <CarouselItem key={slide.id}>
                <AspectRatio ratio={2 / 1}>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="rounded-lg object-cover"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current + 1} of {count}
        </div>
      </div>
    )
  },
} 