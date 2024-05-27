"use client";
import { Button } from "@/components/ui/button";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full flex text-center items-center justify-center h-screen">
      <div>
        <h2 className="font-black text-5xl text-primary">Error... :(</h2>
        <p className="mt-2 max-w-prose font-medium">{error.message}</p>
        <Button
          className="mx-auto block mt-4"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
