import { useCallback } from "react";
import { auth } from "@/app/mgt/lib/firebase";
import { logCRUDAction, logErrorAction } from "@/app/mgt/lib/logger";

/**
 * Hook to provide logging functionality for CRUD operations
 */
export function useLogger() {
  const user = auth.currentUser;
  const adminId = user?.uid || "unknown";
  const adminEmail = user?.email || "unknown";

  const logCreate = useCallback(
    async (
      collection: string,
      documentId: string,
      documentTitle: string,
      data: Record<string, any>
    ) => {
      try {
        await logCRUDAction(
          adminId,
          adminEmail,
          "create",
          collection,
          documentId,
          documentTitle,
          undefined,
          data
        );
      } catch (error) {
        console.error("Failed to log create action:", error);
      }
    },
    [adminId, adminEmail]
  );

  const logUpdate = useCallback(
    async (
      collection: string,
      documentId: string,
      documentTitle: string,
      before: Record<string, any>,
      after: Record<string, any>
    ) => {
      try {
        await logCRUDAction(
          adminId,
          adminEmail,
          "update",
          collection,
          documentId,
          documentTitle,
          before,
          after
        );
      } catch (error) {
        console.error("Failed to log update action:", error);
      }
    },
    [adminId, adminEmail]
  );

  const logDelete = useCallback(
    async (collection: string, documentId: string, documentTitle: string) => {
      try {
        await logCRUDAction(
          adminId,
          adminEmail,
          "delete",
          collection,
          documentId,
          documentTitle
        );
      } catch (error) {
        console.error("Failed to log delete action:", error);
      }
    },
    [adminId, adminEmail]
  );

  const logError = useCallback(
    async (
      collection: string,
      action: string,
      errorMessage: string,
      documentId?: string
    ) => {
      try {
        await logErrorAction(
          adminId,
          adminEmail,
          action,
          collection,
          errorMessage,
          documentId
        );
      } catch (error) {
        console.error("Failed to log error action:", error);
      }
    },
    [adminId, adminEmail]
  );

  return {
    logCreate,
    logUpdate,
    logDelete,
    logError,
  };
}
