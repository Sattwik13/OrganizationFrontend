/**
 * Header Component
 * 
 * Top navigation bar component that displays application controls,
 * breadcrumb navigation, and user interface elements. Features a
 * dark theme with hover effects and responsive design.
 */

import { Button } from 'primereact/button';
import { Undo2, Redo2, Folder ,PanelRight, ChevronRight  } from 'lucide-react';

/**
 * Props interface for Header component
 */
interface HeaderProps {
  onNewCompany: () => void;  // Callback function for new company action (currently unused in header)
}

/**
 * Header component
 * 
 * Renders the top navigation bar with application controls and user interface.
 * Includes grid view toggle, undo/redo buttons, breadcrumb navigation,
 * user avatar, and settings button.
 * 
 * @param onNewCompany - Callback function for new company action
 * @returns JSX element for the header
 */
export function Header({ onNewCompany }: HeaderProps) {
  return (
    <div className="bg-[#131313]  px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left section: Controls and breadcrumb */}
        <div className="flex items-center gap-4">
          {/* Action buttons group */}
          <div className="flex items-center gap-1">
                        
            {/* Undo button */}
            <Button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Undo2 size={16}/>
            </Button>
            
            {/* Redo button */}
            <Button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Redo2 size={16} />
            </Button>
          </div>

          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-sm">
            <Folder size={18} className="text-gray-400" />
            <span className="text-gray-400 "><ChevronRight size={16} /></span>
            <span className="text-white">Organizations</span>
          </div>
        </div>

        {/* Right section: User controls */}
        <div className="flex items-center gap-3">
          {/* User avatar */}
          <Button className="w-8 h-8 rounded-full overflow-hidden border border-[#2A2A2A]">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
              alt="User"
              className="w-full h-full object-cover"
            />
          </Button>
          
          {/* Settings/options button */}
          <Button className="w-8 h-8 flex items-center justify-center border border-[#1A1A1A] rounded hover:bg-[#1A1A1A] transition-colors">
            <PanelRight size={17}/>
          </Button>
        </div>
      </div>
    </div>
  );
}
