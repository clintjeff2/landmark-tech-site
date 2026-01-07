import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface LogEntry {
  id?: string;
  adminId: string;
  adminEmail: string;
  action: string; // "create", "update", "delete", "login", "logout"
  collection: string; // "classes", "pricing", "testimonials", etc.
  documentId?: string;
  documentTitle?: string; // Human-readable name of what was changed
  changesBefore?: Record<string, any>;
  changesAfter?: Record<string, any>;
  status: "success" | "error"; // success or error
  errorMessage?: string;
  timestamp: Timestamp | Date;
  ip?: string; // Optional: client IP
  userAgent?: string; // Optional: browser info
}

/**
 * Log an admin action to Firestore
 * @param logData - The log entry data
 */
export async function logAdminAction(logData: LogEntry): Promise<string> {
  try {
    const logsRef = collection(db, "logs");

    // Remove undefined fields to prevent Firestore errors
    const cleanedData: any = {
      adminId: logData.adminId,
      adminEmail: logData.adminEmail,
      action: logData.action,
      collection: logData.collection,
      status: logData.status,
      timestamp: serverTimestamp(),
    };

    // Only add optional fields if they have values
    if (logData.documentId) cleanedData.documentId = logData.documentId;
    if (logData.documentTitle)
      cleanedData.documentTitle = logData.documentTitle;
    if (logData.changesBefore)
      cleanedData.changesBefore = logData.changesBefore;
    if (logData.changesAfter) cleanedData.changesAfter = logData.changesAfter;
    if (logData.errorMessage) cleanedData.errorMessage = logData.errorMessage;
    if (logData.ip) cleanedData.ip = logData.ip;
    if (logData.userAgent) cleanedData.userAgent = logData.userAgent;

    const docRef = await addDoc(logsRef, cleanedData);
    return docRef.id;
  } catch (error) {
    console.error("Failed to log action:", error);
    // Don't throw - logging failure shouldn't break the main operation
    return "";
  }
}

/**
 * Log a successful CRUD operation
 */
export async function logCRUDAction(
  adminId: string,
  adminEmail: string,
  action: "create" | "update" | "delete",
  collection: string,
  documentId: string,
  documentTitle: string,
  changesBefore?: Record<string, any>,
  changesAfter?: Record<string, any>
): Promise<void> {
  await logAdminAction({
    adminId,
    adminEmail,
    action,
    collection,
    documentId,
    documentTitle,
    changesBefore,
    changesAfter,
    status: "success",
    timestamp: new Date(),
  });
}

/**
 * Log a failed operation
 */
export async function logErrorAction(
  adminId: string,
  adminEmail: string,
  action: string,
  collection: string,
  errorMessage: string,
  documentId?: string
): Promise<void> {
  await logAdminAction({
    adminId,
    adminEmail,
    action,
    collection,
    documentId,
    status: "error",
    errorMessage,
    timestamp: new Date(),
  });
}

/**
 * Log user authentication events
 */
export async function logAuthEvent(
  adminId: string,
  adminEmail: string,
  action: "login" | "logout",
  success: boolean,
  errorMessage?: string
): Promise<void> {
  await logAdminAction({
    adminId,
    adminEmail,
    action,
    collection: "auth",
    status: success ? "success" : "error",
    errorMessage,
    timestamp: new Date(),
  });
}

/**
 * Format an action name for display
 */
export function formatActionName(action: string): string {
  const actionMap: Record<string, string> = {
    create: "Created",
    update: "Updated",
    delete: "Deleted",
    login: "Logged In",
    logout: "Logged Out",
    import: "Imported",
    export: "Exported",
  };
  return actionMap[action] || action.charAt(0).toUpperCase() + action.slice(1);
}

/**
 * Format collection name for display
 */
export function formatCollectionName(collection: string): string {
  const collectionMap: Record<string, string> = {
    classes: "Classes",
    pricing: "Pricing",
    testimonials: "Testimonials",
    curriculum: "Curriculum",
    faq_categories: "FAQ Categories",
    faq_items: "FAQ Items",
    metrics: "Metrics",
    contact: "Contact",
    configuration: "Configuration",
    auth: "Authentication",
  };
  return collectionMap[collection] || collection;
}
