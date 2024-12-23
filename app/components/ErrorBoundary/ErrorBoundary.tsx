"use client";
import React from "react";
import { ErrorDialog } from "../ErrorDialog/ErrorDialog";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDialog
          isOpen={true}
          onCloseAction={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
          error={this.state.error?.message || "An unexpected error occurred"}
          onRetryAction={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}
