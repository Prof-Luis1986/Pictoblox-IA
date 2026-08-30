// Firebase configuration for PictoBlox IA Educativa
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { StudentProgress } from "../types";
import { loadSessionProgress, saveSessionProgress } from './sessionStorage';

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

export const getInitialProgress = (): StudentProgress => {
  return loadSessionProgress();
};

export const saveStudentProgress = async (progress: StudentProgress): Promise<boolean> => {
  saveSessionProgress(progress);

  // La sincronización remota guarda el objeto StudentProgress: identificador
  // anónimo de sesión, nombre, grupo, prácticas/pasos completados, resultados
  // de cuestionarios, notas de experimentos, insignias y comprobantes de
  // entregas confirmadas. No guarda respuestas del Muro, preguntas abiertas,
  // imágenes Base64 ni el archivo PDF. Estos datos remotos no se eliminan al
  // limpiar sessionStorage.
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
      saveSessionProgress(data);
      return data;
    }
  } catch (cloudErr) {
    console.warn("Firestore fetch error, using local data:", cloudErr);
  }
  return local;
};
