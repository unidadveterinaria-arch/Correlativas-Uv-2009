import React from 'react';
import { TabType, ViewMode } from '../types';
import { UnidadVeterinariaLogoHorizontal } from './UnidadVeterinariaLogo';
import { Calendar as CalendarIcon } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // Dejamos las demás propiedades opcionales para que App.tsx no tire error al guardar
  viewMode?: ViewMode;
  setViewMode?: (mode: ViewMode) => void;
  approvedCount?: number;
  totalCount?: number;
  regularizedCount?: number;
  readyToCourseCount?: number;
  readyToExamCount?: number;
  onReset?: () => void;
  onExport?: () => void;
  onImportClick?: () => void;
  onPrint?: () => void;
  isSimulating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="bg-white py-4 shadow-sm z-40 relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Botón de Calendario */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setActiveTab(activeTab === 'calendario' ? 'lista' : 'calendario')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
              activeTab === 'calendario' 
                ? 'bg-[#003217] text-white border-[#003217]' 
                : 'bg-white text-[#003217] border-[#003217]/20 hover:bg-[#f8faf4]'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>{activeTab === 'calendario' ? 'Volver a Materias' : 'Ver Calendario Académico'}</span>
          </button>
        </div>

        {/* Logo Central */}
        <div className="flex justify-center mt-2 mb-4">
          <UnidadVeterinariaLogoHorizontal className="h-20 sm:h-28 w-auto" />
        </div>

      </div>
    </header>
  );
};
