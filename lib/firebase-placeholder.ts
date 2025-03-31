// This is a placeholder file that will be used if Firebase isn't properly configured
// It provides mock implementations of Firebase services

import type { User } from "firebase/auth"

// Mock Auth
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    callback(null)
    return () => {}
  },
  signInWithPopup: async () => ({ user: null }),
  signOut: async () => {},
}

// Mock Firestore
const mockFirestore = {
  collection: () => ({
    add: async () => ({ id: "mock-id" }),
    doc: () => ({
      get: async () => ({
        exists: false,
        data: () => ({}),
      }),
      set: async () => {},
      update: async () => {},
      delete: async () => {},
    }),
  }),
  doc: () => ({
    get: async () => ({
      exists: false,
      data: () => ({}),
    }),
    set: async () => {},
    update: async () => {},
    delete: async () => {},
  }),
}

// Mock Storage
const mockStorage = {
  ref: () => ({
    put: async () => ({
      ref: {
        getDownloadURL: async () => "https://placeholder.com/image.jpg",
      },
    }),
    getDownloadURL: async () => "https://placeholder.com/image.jpg",
  }),
}

export const auth = mockAuth
export const db = mockFirestore
export const storage = mockStorage

