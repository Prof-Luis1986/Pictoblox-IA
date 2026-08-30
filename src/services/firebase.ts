// Firebase synchronization for anonymous, tab-scoped student sessions.
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { browserSessionPersistence, getAuth, setPersistence, signInAnonymously, signOut, User } from 'firebase/auth';
import { StudentProgress } from '../types';
import { loadSessionProgress, saveSessionProgress } from './sessionStorage';

const firebaseConfig = {
  apiKey: 'AIzaSyDeEguIbg7bkWAp0OD8zutMBQDCtXM2wEo',
  authDomain: 'pictoblox-ia.firebaseapp.com',
  projectId: 'pictoblox-ia',
  storageBucket: 'pictoblox-ia.firebasestorage.app',
  messagingSenderId: '691250467122',
  appId: '1:691250467122:web:3085f58174a5fbd943c72b'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let authenticationPromise: Promise<User> | null = null;

const getSessionUser = async (): Promise<User> => {
  if (auth.currentUser) return auth.currentUser;
  if (!authenticationPromise) {
    authenticationPromise = setPersistence(auth, browserSessionPersistence)
      .then(() => signInAnonymously(auth))
      .then(credential => credential.user)
      .finally(() => { authenticationPromise = null; });
  }
  return authenticationPromise;
};

export const getInitialProgress = (): StudentProgress => loadSessionProgress();

export const endFirebaseSession = async (): Promise<void> => {
  authenticationPromise = null;
  if (auth.currentUser) await signOut(auth);
};

export const saveStudentProgress = async (progress: StudentProgress): Promise<boolean> => {
  saveSessionProgress(progress);
  try {
    const user = await getSessionUser();
    await setDoc(doc(db, 'student_progress', user.uid), {
      ...progress,
      ownerUid: user.uid,
      syncedToFirebase: true
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('No se pudo sincronizar el progreso; permanece guardado en esta sesión.', error);
    return false;
  }
};

export const loadStudentProgress = async (): Promise<StudentProgress> => {
  const local = loadSessionProgress();
  try {
    const user = await getSessionUser();
    const snapshot = await getDoc(doc(db, 'student_progress', user.uid));
    if (!snapshot.exists()) return local;
    const { ownerUid: _ownerUid, ...stored } = snapshot.data() as StudentProgress & { ownerUid: string };
    const progress = { ...stored, syncedToFirebase: true } as StudentProgress;
    saveSessionProgress(progress);
    return progress;
  } catch (error) {
    console.warn('No se pudo recuperar el progreso remoto; se usarán los datos de esta sesión.', error);
    return local;
  }
};
