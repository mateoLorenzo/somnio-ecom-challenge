"use client";

import { useEffect } from "react";
import { ErrorDialog } from "./components/ErrorDialog/ErrorDialog";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorDialog
      isOpen={true}
      error={error.message || "An unexpected error occurred"}
      onCloseAction={() => {
        reset();
        window.location.reload();
      }}
      onRetryAction={() => {
        reset();
        window.location.reload();
      }}
    />
  );
}
