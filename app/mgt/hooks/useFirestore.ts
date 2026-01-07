"use client";

import { useState, useCallback } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  Query,
  QueryConstraint,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/mgt/lib/firebase";

interface UseFirestoreOptions {
  collectionName: string;
}

interface FirestoreState {
  data: any[] | null;
  loading: boolean;
  error: string | null;
}

export function useFirestore({ collectionName }: UseFirestoreOptions) {
  const [state, setState] = useState<FirestoreState>({
    data: null,
    loading: false,
    error: null,
  });

  // Get all documents from collection
  const getAll = useCallback(
    async (constraints?: QueryConstraint[]) => {
      try {
        setState({ data: null, loading: true, error: null });
        const collectionRef = collection(db, collectionName);
        let q: Query = collectionRef;

        if (constraints && constraints.length > 0) {
          q = query(collectionRef, ...constraints);
        }

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setState({ data: documents, loading: false, error: null });
        return documents;
      } catch (error: any) {
        const errorMessage = error?.message || "Failed to fetch documents";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [collectionName]
  );

  // Get single document
  const getById = useCallback(
    async (id: string) => {
      try {
        setState({ data: null, loading: true, error: null });
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Document not found");
        }

        const data = { id: docSnap.id, ...docSnap.data() };
        setState({ data: [data], loading: false, error: null });
        return data;
      } catch (error: any) {
        const errorMessage = error?.message || "Failed to fetch document";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [collectionName]
  );

  // Create document
  const create = useCallback(
    async (data: any) => {
      try {
        setState({ data: null, loading: true, error: null });

        // Add timestamps
        const documentData = {
          ...data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, documentData);

        const newDocument = {
          id: docRef.id,
          ...documentData,
        };

        setState({ data: [newDocument], loading: false, error: null });
        return newDocument;
      } catch (error: any) {
        const errorMessage = error?.message || "Failed to create document";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [collectionName]
  );

  // Update document
  const update = useCallback(
    async (id: string, data: any) => {
      try {
        setState({ data: null, loading: true, error: null });

        const docRef = doc(db, collectionName, id);
        const updateData = {
          ...data,
          updatedAt: Timestamp.now(),
        };

        await updateDoc(docRef, updateData);

        const updatedDocument = {
          id,
          ...updateData,
        };

        setState({ data: [updatedDocument], loading: false, error: null });
        return updatedDocument;
      } catch (error: any) {
        const errorMessage = error?.message || "Failed to update document";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [collectionName]
  );

  // Delete document
  const remove = useCallback(
    async (id: string) => {
      try {
        setState({ data: null, loading: true, error: null });
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        setState({ data: null, loading: false, error: null });
      } catch (error: any) {
        const errorMessage = error?.message || "Failed to delete document";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [collectionName]
  );

  // Batch update multiple documents
  const batchUpdate = useCallback(
    async (updates: Array<{ id: string; data: any }>) => {
      try {
        setState({ data: null, loading: true, error: null });

        const batch = writeBatch(db);

        updates.forEach(({ id, data }) => {
          const docRef = doc(db, collectionName, id);
          batch.update(docRef, {
            ...data,
            updatedAt: Timestamp.now(),
          });
        });

        await batch.commit();
        setState({ data: null, loading: false, error: null });
      } catch (error: any) {
        const errorMessage = error?.message || "Failed to batch update";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [collectionName]
  );

  return {
    ...state,
    getAll,
    getById,
    create,
    update,
    remove,
    batchUpdate,
  };
}
