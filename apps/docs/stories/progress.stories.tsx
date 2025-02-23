import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@tyfo.dev/ui/primitives/progress";
import { Button } from "@tyfo.dev/ui/primitives/button";
import { useState, useEffect } from "react";
import { CheckCircle2, Download, Upload } from "lucide-react";

const meta: Meta<typeof Progress> = {
  title: "Primitives/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
      description: "The progress value (0-100)",
      min: 0,
      max: 100,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// Basic progress bar
export const Default: Story = {
  render: () => <Progress value={60} />,
};

// Animated progress
export const Animated: Story = {
  render: function AnimatedProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 500);

      return () => clearInterval(timer);
    }, []);

    return <Progress value={progress} />;
  },
};

// Download progress
export const DownloadProgress: Story = {
  render: function DownloadProgress() {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const startDownload = () => {
      setProgress(0);
      setIsComplete(false);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            return 100;
          }
          return prevProgress + 5;
        });
      }, 200);
    };

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Downloading file...</p>
            <p className="text-sm text-muted-foreground">
              {isComplete ? "Complete" : `${Math.round(progress)}%`}
            </p>
          </div>
          {isComplete ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <Download className="h-4 w-4 animate-pulse" />
          )}
        </div>
        <Progress value={progress} />
        <Button
          onClick={startDownload}
          disabled={!isComplete && progress > 0}
          className="w-full"
        >
          {progress > 0 && !isComplete
            ? "Downloading..."
            : isComplete
            ? "Download Again"
            : "Start Download"}
        </Button>
      </div>
    );
  },
};

// Upload progress with multiple files
export const MultipleUploads: Story = {
  render: function MultipleUploads() {
    const files = [
      { name: "image-01.jpg", size: "2.4 MB" },
      { name: "document.pdf", size: "1.8 MB" },
      { name: "video.mp4", size: "12.8 MB" },
    ];

    const [progresses, setProgresses] = useState(files.map(() => 0));

    useEffect(() => {
      const intervals = files.map((_, index) => {
        return setInterval(() => {
          setProgresses((prev) => {
            const newProgresses = [...prev];
            if (newProgresses[index] < 100) {
              newProgresses[index] += Math.random() * 10;
              if (newProgresses[index] > 100) newProgresses[index] = 100;
            }
            return newProgresses;
          });
        }, 500 + index * 100);
      });

      return () => intervals.forEach(clearInterval);
    }, []);

    return (
      <div className="w-[300px] space-y-5">
        {files.map((file, index) => (
          <div key={file.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{file.size}</p>
              </div>
              <Upload className="h-4 w-4" />
            </div>
            <Progress value={progresses[index]} />
          </div>
        ))}
      </div>
    );
  },
};

// Custom styled progress
export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress
        value={80}
        className="h-3 bg-blue-100"
        data-slot="progress-indicator"
        style={{ "--progress-foreground": "hsl(221, 83%, 53%)" } as React.CSSProperties}
      />
      <Progress
        value={60}
        className="h-3 bg-green-100"
        data-slot="progress-indicator"
        style={{ "--progress-foreground": "hsl(142, 76%, 36%)" } as React.CSSProperties}
      />
      <Progress
        value={40}
        className="h-3 bg-red-100"
        data-slot="progress-indicator"
        style={{ "--progress-foreground": "hsl(346, 84%, 61%)" } as React.CSSProperties}
      />
      <Progress
        value={20}
        className="h-3 bg-purple-100"
        data-slot="progress-indicator"
        style={{ "--progress-foreground": "hsl(262, 83%, 58%)" } as React.CSSProperties}
      />
    </div>
  ),
};

// Progress with steps
export const ProgressWithSteps: Story = {
  render: function ProgressWithSteps() {
    const steps = ["Account", "Profile", "Review", "Complete"];
    const [currentStep, setCurrentStep] = useState(0);

    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
      <div className="w-[300px] space-y-4">
        <Progress value={progress} />
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`text-sm ${
                index <= currentStep
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
}; 