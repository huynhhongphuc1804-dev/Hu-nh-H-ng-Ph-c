import React, { useState, useEffect } from 'react';
import { Medicine, MedicationSchedule, FamilyMember, UserProfile } from './types';
import { MEDICINES_DATABASE } from './data/medicines';
import {
  getStoredUser,
  saveStoredUser,
  getStoredSchedules,
  saveStoredSchedules,
  getStoredFamily,
  saveStoredFamily,
  getStoredHistory,
  addSearchHistory,
  clearSearchHistory,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { AuthModal } from './components/AuthModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { ImageSearchModal } from './components/ImageSearchModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { DrugDetailModal } from './components/DrugDetailModal';
import { DrugInteractionChecker } from './components/DrugInteractionChecker';
import { HomeView } from './components/HomeView';
import { GoldenHourView } from './components/GoldenHourView';
import { HealthTreeView } from './components/HealthTreeView';
import { SettingsProfileView } from './components/SettingsProfileView';

export default function App() {
  // App state
  const [showSplash, setShowSplash] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  // Active Main Navigation Tab
  const [activeTab, setActiveTab] = useState<'home' | 'golden_hour' | 'health_tree' | 'profile'>('home');

  // Persistence state
  const [user, setUser] = useState<UserProfile>(getStoredUser);
  const [schedules, setSchedules] = useState<MedicationSchedule[]>(getStoredSchedules);
  const [family, setFamily] = useState<FamilyMember[]>(getStoredFamily);
  const [searchHistory, setSearchHistory] = useState<string[]>(getStoredHistory);

  // Sync state changes to storage
  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    saveStoredUser(updatedUser);
  };

  const handleUpdateSchedules = (updatedSchedules: MedicationSchedule[]) => {
    setSchedules(updatedSchedules);
    saveStoredSchedules(updatedSchedules);
  };

  const handleUpdateFamily = (updatedFamily: FamilyMember[]) => {
    setFamily(updatedFamily);
    saveStoredFamily(updatedFamily);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleSelectMedicine = (med: Medicine) => {
    setSelectedMedicine(med);
    addSearchHistory(med.name);
    setSearchHistory(getStoredHistory());
  };

  const handleAddToScheduleFromDetail = (med: Medicine) => {
    setSelectedMedicine(null);
    setActiveTab('golden_hour');
  };

  const handleCheckInteractionFromDetail = (med: Medicine) => {
    setShowInteractionModal(true);
  };

  // Font size class based on accessibility settings
  const fontSizeClass =
    user.fontSize === 'extra-large'
      ? 'text-lg'
      : user.fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white ${fontSizeClass}`}>
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onEnter={() => setShowSplash(false)} />
      )}

      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenBarcode={() => setShowBarcodeModal(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomeView
            onOpenBarcode={() => setShowBarcodeModal(true)}
            onOpenImageSearch={() => setShowImageModal(true)}
            onOpenVoice={() => setShowVoiceModal(true)}
            onOpenInteraction={() => setShowInteractionModal(true)}
            onSelectMedicine={handleSelectMedicine}
            onNavigateTab={setActiveTab}
            schedules={schedules}
            family={family}
            searchHistory={searchHistory}
            onSelectHistoryTerm={term => {
              const matched = MEDICINES_DATABASE.find(m => m.name.toLowerCase() === term.toLowerCase());
              if (matched) setSelectedMedicine(matched);
            }}
          />
        )}

        {activeTab === 'golden_hour' && (
          <GoldenHourView
            schedules={schedules}
            onUpdateSchedules={handleUpdateSchedules}
            onOpenMedicineDetail={handleSelectMedicine}
          />
        )}

        {activeTab === 'health_tree' && (
          <HealthTreeView
            familyMembers={family}
            familyCode={user.familyCode}
            onUpdateFamily={handleUpdateFamily}
          />
        )}

        {activeTab === 'profile' && (
          <SettingsProfileView
            user={user}
            schedules={schedules}
            family={family}
            onUpdateUser={handleUpdateUser}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenBarcode={() => setShowBarcodeModal(true)}
        activeSchedulesCount={schedules.length}
      />

      {/* Modals & Dialogs */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={user}
        onSaveUser={handleUpdateUser}
      />

      <BarcodeScannerModal
        isOpen={showBarcodeModal}
        onClose={() => setShowBarcodeModal(false)}
        onSelectMedicine={handleSelectMedicine}
      />

      <ImageSearchModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSelectMedicine={handleSelectMedicine}
      />

      <VoiceAssistantModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onSelectMedicine={handleSelectMedicine}
        voiceSpeed={user.voiceSpeed}
      />

      <DrugDetailModal
        medicine={selectedMedicine}
        onClose={() => setSelectedMedicine(null)}
        onAddToSchedule={handleAddToScheduleFromDetail}
        onCheckInteraction={handleCheckInteractionFromDetail}
        voiceSpeed={user.voiceSpeed}
      />

      <DrugInteractionChecker
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        initialMedicine={selectedMedicine}
      />
    </div>
  );
}
