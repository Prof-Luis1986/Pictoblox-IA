// Firebase configuration for PictoBlox IA Educativa
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { StudentProgress } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyDeEguIbg7bkWAp0OD8zutMBQDCtXM2wEo",
  authDomain: "pictoblox-ia.firebaseapp.com",
  projectId: "pictoblox-ia",
  storageBucket: "pictoblox-ia.firebasestorage.app",
  messagingSenderId: "691250467122",
  appId: "1:691250467122:web:3085f58174a5fbd943c72b"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const LOCAL_STORAGE_KEY = "pictoblox_ia_student_progress_v2";

export const getInitialProgress = (): StudentProgress => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read local progress:", e);
  }
  return {
    studentId: `student_${Math.random().toString(36).substring(2, 9)}`,
    studentName: "Estudiante",
    completedPractices: {},
    badgesEarned: [],
    syncedToFirebase: false
  };
};

export const saveStudentProgress = async (progress: StudentProgress): Promise<boolean> => {
  // Always update localStorage first for instantaneous offline persistence
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed saving to localStorage", e);
  }

  // Attempt to sync to Firestore
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth).catch(() => null);
    }
    const studentDocRef = doc(db, "student_progress", progress.studentId);
    await setDoc(studentDocRef, progress, { merge: true });
    return true;
  } catch (cloudErr) {
    // Gracefully handle offline or permission errors without interrupting student workflow
    console.warn("Firestore sync not available or offline, progress stored locally:", cloudErr);
    return false;
  }
};

export const loadStudentProgress = async (): Promise<StudentProgress> => {
  const local = getInitialProgress();
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth).catch(() => null);
    }
    const studentDocRef = doc(db, "student_progress", local.studentId);
    const snap = await getDoc(studentDocRef);
    if (snap.exists()) {
      const data = snap.data() as StudentProgress;
      data.syncedToFirebase = true;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (cloudErr) {
    console.warn("Firestore fetch error, using local data:", cloudErr);
  }
  return local;
};
