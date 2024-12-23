"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BiErrorCircle } from "react-icons/bi";

interface ErrorDialogProps {
  isOpen: boolean;
  onCloseAction: () => void;
  error: string;
  onRetryAction: () => void;
}

const styles = {
  wrapper: css`
    position: relative;
    background-color: "red";
    z-index: 9999;
  `,
  icon: css`
    color: #ef4444;
    font-size: 2.5rem;
    margin: 0 auto 1rem;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  `,
};

export const ErrorDialog = ({
  isOpen,
  onCloseAction,
  error,
  onRetryAction,
}: ErrorDialogProps) => {
  if (!isOpen) return null;

  return (
    <div css={styles.wrapper}>
      <AlertDialog open={isOpen} onOpenChange={onCloseAction}>
        <AlertDialogContent>
          <div css={styles.content}>
            <BiErrorCircle css={styles.icon} />
            <AlertDialogHeader>
              <AlertDialogTitle>Oops! Something went wrong</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCloseAction}>
                Close
              </AlertDialogCancel>
              {onRetryAction && (
                <AlertDialogAction onClick={onRetryAction}>
                  Try Again
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
