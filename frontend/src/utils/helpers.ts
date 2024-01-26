import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function errorMessage(error: any) {
  return isFetchBaseQueryError(error)
    ? "error" in error
      ? error.error
      : JSON.stringify(error.data)
    : isErrorWithMessage(error)
    ? error.message
    : null;
}
