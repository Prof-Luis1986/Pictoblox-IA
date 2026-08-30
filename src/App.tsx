/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CoursePage } from './pages/CoursePage';
import { PracticePage } from './pages/PracticePage';
import { GlossaryPage } from './pages/GlossaryPage';
import { SearchModal } from './components/SearchModal';
import { ColorTableModal } from './components/ColorTableModal';
import { ProgressSaveModal } from './components/ProgressSaveModal';
import { StudentProgress } from './types';
import { loadStudentProgress, saveStudentProgress } from './services/firebase';

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#/');
  const [progress, setProgress] = useState<StudentProgress>({
    studentId: 'default-student',
    studentName: 'Estudiante',
    completedPractices: {},
    badgesEarned: [],
    syncedToFirebase: false
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isColorTableOpen, setIsColorTableOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // Initialize and listen to URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load initial student progress (from localStorage and Firestore)
  useEffect(() => {
    const initProgress = async () => {
      const saved = await loadStudentProgress();
      setProgress(saved);
    };
    initProgress();
  }, []);

  // Save progress changes locally and allow explicit or background sync
  const handleUpdateProgress = useCallback(async (updated: Partial<StudentProgress>) => {
    setProgress(prev => {
      const nextProgress: StudentProgress = {
        ...prev,
        ...updated,
        lastActiveDate: new Date().toISOString()
      };
      // Save locally immediately to avoid UI lag and update storage
      try {
        localStorage.setItem('pictoblox_ia_student_progress_v2', JSON.stringify(nextProgress));
      } catch (e) {
        console.warn('Local storage write warning:', e);
      }
      return nextProgress;
    });
  }, []);

  // Navigate helper
  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  // Route Dispatcher
  const renderRoute = () => {
    const hash = currentHash;

    if (hash === '#/' || hash === '' || hash === '#') {
      return (
        <HomePage
          progress={progress}
          onOpenColorTable={() => setIsColorTableOpen(true)}
        />
      );
    }

    if (hash.startsWith('#/curso/')) {
      const courseId = hash.replace('#/curso/', '');
      return <CoursePage courseId={courseId} progress={progress} />;
    }

    if (hash.startsWith('#/practica/')) {
      const practiceId = hash.replace('#/practica/', '');
      return (
        <PracticePage
          practiceId={practiceId}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onOpenProgressModal={() => setIsProgressModalOpen(true)}
        />
      );
    }

    if (hash === '#/glosario') {
      return <GlossaryPage />;
    }

    // Default Fallback
    return (
      <HomePage
        progress={progress}
        onOpenColorTable={() => setIsColorTableOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col cyber-grid-bg text-slate-200 selection:bg-emerald-400 selection:text-slate-950 font-sans antialiased relative">
      {/* Top App Bar Header */}
      <Header
        progress={progress}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenColorTable={() => setIsColorTableOpen(true)}
        onOpenProgressModal={() => setIsProgressModalOpen(true)}
        currentPath={currentHash}
      />

      {/* Main Container View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {renderRoute()}
      </main>

      {/* Footer */}
      <Footer onOpenColorTable={() => setIsColorTableOpen(true)} />

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPractice={pId => navigateTo(`#/practica/${pId}`)}
      />

      <ColorTableModal
        isOpen={isColorTableOpen}
        onClose={() => setIsColorTableOpen(false)}
      />

      <ProgressSaveModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progress={progress}
        onProgressUpdated={newProg => setProgress(newProg)}
      />
    </div>
  );
}
