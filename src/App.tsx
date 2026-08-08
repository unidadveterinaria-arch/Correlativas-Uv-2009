import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, TabType, StudentProgress, SubjectState } from './types';
import { SUBJECTS, evaluateAllSubjects } from './data/subjects';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { AccordionYearList } from './components/AccordionYearList';
import { DependencyTreeGraph } from './components/DependencyTreeGraph';
import { SimulatorMode } from './components/SimulatorMode';
import { AcademicStatsView } from './components/AcademicStatsView';
import { AcademicCalendar } from './components/AcademicCalendar';
import { AcademicReportModal } from './components/AcademicReportModal';
import { Footer } from './components/Footer';
import { Sparkles, BookOpen, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'fcv_unr_correlativas_progress_v1';

export default function App() {
  // Main student progress state
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Error loading progress from localStorage:', err);
    }
    return {};
  });

  // Mode: 'cursar' vs 'rendir'
  const [viewMode, setViewMode] = useState<ViewMode>('cursar');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('lista');

  // Filtering & Search
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedSubjectCode, setHighlightedSubjectCode] = useState<string | undefined>(undefined);

  // Modal Report state
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Hidden file input for import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persist progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Error saving progress to localStorage:', err);
    }
  }, [progress]);

  // Evaluated subjects map
  const evaluations = evaluateAllSubjects(progress, viewMode);

  // Calculate counts for header/dashboard
  let approvedCount = 0;
  let regularizedCount = 0;
  let readyToCourseCount = 0;
  let readyToExamCount = 0;

  const evalCursar = evaluateAllSubjects(progress, 'cursar');
  const evalRendir = evaluateAllSubjects(progress, 'rendir');

  for (const [code, ev] of evaluations.entries()) {
    if (ev.state === 'aprobada') approvedCount++;
    else if (ev.state === 'regular') regularizedCount++;

    if (evalCursar.get(code)?.isEnabled && ev.state !== 'aprobada') {
      readyToCourseCount++;
    }
    if (evalRendir.get(code)?.isEnabled && ev.state !== 'aprobada') {
      readyToExamCount++;
    }
  }

  // State update handler
  const handleStateChange = (code: string, newState: SubjectState) => {
    setProgress((prev) => ({
      ...prev,
      [code]: newState,
    }));
  };

  // Reset progress handler
  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar todo el avance registrado? esta acción no se puede deshacer.')) {
      setProgress({});
    }
  };

  // Export progress as JSON file
  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `correlativas_fcv_unr_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import trigger
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Handle uploaded JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed === 'object' && parsed !== null) {
          setProgress(parsed);
          alert('¡Copia de seguridad cargada con éxito!');
        } else {
          alert('El archivo seleccionado no tiene un formato válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  // Quick Action Handler
  const handleQuickAction = (action: 'approveYear1' | 'approveAllRegular') => {
    if (action === 'approveYear1') {
      const year1Codes = SUBJECTS.filter((s) => s.year === 1).map((s) => s.code);
      setProgress((prev) => {
        const next = { ...prev };
        year1Codes.forEach((code) => {
          next[code] = 'aprobada';
        });
        return next;
      });
    } else if (action === 'approveAllRegular') {
      setProgress((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((code) => {
          if (next[code] === 'regular') {
            next[code] = 'aprobada';
          }
        });
        return next;
      });
    }
  };

  // Jump to specific subject
  const handleSelectSubject = (code: string) => {
    setActiveTab('lista');
    setHighlightedSubjectCode(code);
    setTimeout(() => {
      const el = document.getElementById(`subject-${code}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f8faf4] text-[#191c19] flex flex-col font-sans overflow-x-hidden">
      
      {/* Hidden File Input for Backup Restoration */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Main Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        approvedCount={approvedCount}
        totalCount={SUBJECTS.length}
        regularizedCount={regularizedCount}
        readyToCourseCount={readyToCourseCount}
        readyToExamCount={readyToExamCount}
        onReset={handleReset}
        onExport={handleExport}
        onImportClick={handleImportClick}
        onPrint={() => setShowReportModal(true)}
        isSimulating={false}
      />

      {/* Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab 1: Subject List View */}
        {activeTab === 'lista' && (
          <div className="space-y-6">
            <DashboardStats
              progress={progress}
              viewMode={viewMode}
              readyToCourseCount={readyToCourseCount}
              readyToExamCount={readyToExamCount}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onQuickAction={handleQuickAction}
            />

            <AccordionYearList
              evaluations={evaluations}
              viewMode={viewMode}
              onStateChange={handleStateChange}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              highlightedSubjectCode={highlightedSubjectCode}
              onSelectSubject={handleSelectSubject}
            />
          </div>
        )}

        {/* Tab 2: Visual Dependency Tree Graph */}
        {activeTab === 'arbol' && (
          <DependencyTreeGraph
            evaluations={evaluations}
            viewMode={viewMode}
            onSelectSubject={handleSelectSubject}
          />
        )}

        {/* Tab 3: Simulator Mode */}
        {activeTab === 'simulador' && (
          <SimulatorMode
            realProgress={progress}
            viewMode={viewMode}
            onApplySimulation={(simProgress) => {
              setProgress(simProgress);
              setActiveTab('lista');
              alert('¡Simulación aplicada con éxito a tu avance real!');
            }}
          />
        )}

        {/* Tab 4: Detailed Academic Statistics */}
        {activeTab === 'estadisticas' && (
          <AcademicStatsView
            progress={progress}
            viewMode={viewMode}
          />
        )}

        {/* Tab 5: Official 2026 Academic Calendar */}
        {activeTab === 'calendario' && (
          <AcademicCalendar
            evaluations={evaluations}
            progress={progress}
            onSubjectSelect={handleSelectSubject}
          />
        )}

      </main>

      {/* Report & Print Modal */}
      {showReportModal && (
        <AcademicReportModal
          progress={progress}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
