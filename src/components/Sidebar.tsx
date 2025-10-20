/**
 * Sidebar Component
 * 
 * Left navigation sidebar component that provides main application navigation
 * and menu items. Features a dark theme with hover effects, search functionality,
 * and organized menu sections for different application areas.
 */

import { Building2, PanelLeft  , Briefcase, Users, Box, Puzzle, Play, BarChart3, UserCircle2, ChevronsUpDown } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

/**
 * Menu item interface for sidebar navigation
 */
interface MenuItem {
  icon: React.ReactNode;  // Icon component to display
  label: string;          // Text label for the menu item
  active?: boolean;       // Whether this menu item is currently active
}

/**
 * Sidebar component
 * 
 * Renders the left navigation sidebar with application logo, search functionality,
 * and organized menu sections for different application areas.
 * 
 * @returns JSX element for the sidebar
 */
export function Sidebar() {
  /**
   * Records menu items - main application sections
   * Each item has an icon, label, and optional active state
   */
  const recordsMenu: MenuItem[] = [
    { icon: <Building2 className="text-blue-400" size={16} />, label: 'Companies', active: true },
    { icon: <Briefcase className="text-green-500" size={16} />, label: 'Deals' },
    { icon: <Building2 className="text-sky-500" size={16} />, label: 'Organizations' },
    { icon: <Users className="text-orange-700" size={16} />, label: 'People' },
    { icon: <Box className="text-indigo-400" size={16} />, label: 'Objects' },
    { icon: <Puzzle className="text-yellow-400" size={16} />, label: 'Integrations' },
    { icon: <Play className="text-orange-400" size={16} />, label: 'Playground' },
  ];

  /**
   * Lists menu items - secondary application sections
   * Currently contains only the Customers section
   */
  const listsMenu: MenuItem[] = [
    { icon: <UserCircle2 size={16} />, label: 'Customers' },
  ];

  return (
    <div className="w-52 bg-[#0A0A0A] border-r border-[#1F1F1F] h-screen flex flex-col">
      {/* Header section with logo and brand name */}
      <div className="p-4 flex items-center gap-2 ">
        {/* Application logo */}
        <div className="w-8 h-8 bg-yellow-500 rounded-3xl flex items-center justify-center">
          <span className="text-black font-bold text-sm">P</span>
        </div>
        {/* Brand name */}
        <span className="text-white font-semibold">Planos</span>
        <Button>
        <ChevronsUpDown size={15}/>
        </Button>
        {/* Dropdown arrow button */}
        <Button className="ml-auto text-gray-400 hover:text-white">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
             <PanelLeft stroke='white' width={18}  size={17}/>
          </svg>
        </Button>
      </div>

      {/* Search section */}
      <div className="p-3">
        <div className="relative">
          <InputText
            type="text"
            placeholder="Search..."
            className="w-full bg-[#0A0A0A] rounded-md px-3 py-1.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3A3A3A]"
          />
          {/* Search icon */}
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> */}

          </svg>
        </div>
      </div>

      {/* Tasks section */}
      <div className="px-3 py-2 flex items-center gap-2 text-blue-400 text-sm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="2" width="12" height="3" rx="1"/>
          <rect x="2" y="7" width="12" height="3" rx="1"/>
          <rect x="2" y="12" width="12" height="3" rx="1"/>
        </svg>
        <span>Tasks</span>
      </div>

      {/* Scrollable menu sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Records menu section */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">Records</span>
            <Button className="text-gray-500 hover:text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Button>
          </div>
          <div className="space-y-0.5">
            {recordsMenu.map((item) => (
              <Button
                key={item.label}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                  item.active
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#151515]'
                }`}
              >
                <span className={item.active ? 'text-blue-400' : ''}>{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Lists menu section */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">Lists</span>
            <Button className="text-gray-500 hover:text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Button>
          </div>
          <div className="space-y-0.5">
            {listsMenu.map((item) => (
              <Button
                key={item.label}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-[#151515] transition-colors"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
