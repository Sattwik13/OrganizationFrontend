/**
 * OrganizationsTable Component
 * 
 * A comprehensive data table component for displaying organization information
 * using AG Grid. Features custom cell renderers, search functionality, and
 * responsive design with dark theme styling.
 */

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

// Register AG Grid modules for full functionality
ModuleRegistry.registerModules([AllCommunityModule]);

// const myTheme = themeQuartz.withPart(colorSchemeDark);
 
/**
 * Organization data structure interface
 * Defines the shape of organization objects used in the table
 */
interface Organization {
  id: string;                    // Unique identifier for the organization
  company_name: string;          // Name of the company/organization
  industry: string;              // Industry sector the company belongs to
  size: number;                  // Company size (number of employees)
  status: string;                // Current status (e.g., "Active", "Inactive")
  first_engagement: string;      // Date of first engagement (ISO date string)
  last_engagement: string;       // Date of last engagement (ISO date string)
  final_engagement_summary: string; // Summary of the final engagement
  icon_color: string;            // Hex color code for company icon/avatar
}

/**
 * Props interface for OrganizationsTable component
 */
interface OrganizationsTableProps {
  data: Organization[];          // Array of organization data to display
  onNewCompany: () => void;      // Callback function for new company button click
}

/**
 * Custom cell renderer for company name column
 * Displays company name with a colored circular avatar showing the first letter
 * 
 * @param props - AG Grid cell renderer parameters
 * @returns JSX element for company name cell
 */
const CompanyNameCellRenderer = (props: ICellRendererParams) => {
  return (
    <div className="flex items-center gap-3 h-full">
      {/* Circular avatar with company's first letter */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold"
        style={{ backgroundColor: props.data.icon_color || '#666'  }}
      >
        {props.value.charAt(0).toUpperCase()}
      </div>
      {/* Company name text */}
      <span className="text-white">{props.value}</span>
    </div>
  );
};

/**
 * Custom cell renderer for status column
 * Displays status as a styled badge with green accent colors
 * 
 * @param props - AG Grid cell renderer parameters
 * @returns JSX element for status cell
 */
const StatusCellRenderer = (props: ICellRendererParams) => {
  return (
    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
      {props.value}
    </span>
  );
};

/**
 * Custom cell renderer for actions column
 * Displays a three-dot menu button for row actions
 * 
 * @returns JSX element for actions cell
 */
const ActionsCellRenderer = () => {
  return (
    <Button className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-[#1A1A1A]">
      <MoreHorizontal size={16} />
    </Button>
  );
};


/**
 * Main OrganizationsTable component
 * 
 * Renders a comprehensive data table for organization data with custom styling,
 * search functionality, and interactive features.
 * 
 * @param data - Array of organization objects to display
 * @param onNewCompany - Callback function for new company button click
 * @returns JSX element for the organizations table
 */
export function OrganizationsTable({ data, onNewCompany }: OrganizationsTableProps) {
  /**
   * Column definitions for AG Grid
   * Defines the structure, styling, and behavior of each table column
   * Memoized to prevent unnecessary re-renders
   */
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: 'company_name',
        headerName: 'Company Name',
        flex: 1.5,                    // Relative width (1.5x base width)
        minWidth: 200,                // Minimum width in pixels
        cellRenderer: CompanyNameCellRenderer, // Custom renderer with avatar
      },
      {
        field: 'industry',
        headerName: 'Industry',
        flex: 1,                      // Base width
        minWidth: 120,
      },
      {
        field: 'size',
        headerName: 'Size',
        flex: 0.8,                    // Slightly smaller than base width
        minWidth: 100,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 0.8,
        minWidth: 100,
        cellRenderer: StatusCellRenderer, // Custom renderer with badge styling
      },
      {
        field: 'first_engagement',
        headerName: 'First Engagement',
        flex: 1,
        minWidth: 140,
        // Custom formatter to display dates in MM/DD/YYYY format
        valueFormatter: (params) => {
          if (!params.value) return '';
          const date = new Date(params.value);
          return date.toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
          });
        },
      },
      {
        field: 'last_engagement',
        headerName: 'Last Engagement',
        flex: 1,
        minWidth: 140,
        // Custom formatter to display dates in MM/DD/YYYY format
        valueFormatter: (params) => {
          if (!params.value) return '';
          const date = new Date(params.value);
          return date.toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
          });
        },
      },
      {
        field: 'final_engagement_summary',
        headerName: 'Final Engagement Summary',
        flex: 2,                      // Twice the base width for longer text
        minWidth: 250,
      },
      {
        field: 'actions',
        headerName: '➕',              // Empty header for actions column
        width: 60,                    // Fixed width for actions column
        cellRenderer: ActionsCellRenderer, // Custom renderer with menu button
        sortable: false,              // Disable sorting for actions
        filter: false,                // Disable filtering for actions
        resizable: false,             // Disable resizing for actions
        suppressHeaderMenuButton: true, // Hide header menu for actions
      },
    ],
    [] // Empty dependency array - column definitions don't change
  );

  /**
   * Default column configuration
   * Applied to all columns unless overridden in columnDefs
   * Memoized to prevent unnecessary re-renders
   */
  const defaultColDef = useMemo(
    () => ({
      sortable: true,     // Enable sorting by default
      filter: true,       // Enable filtering by default
      resizable: true,    // Enable column resizing by default
    }),
    [] // Empty dependency array - default config doesn't change
  );

  return (
    <div className="flex flex-col h-full">
      {/* Table header with search and new company button */}
      <div className="bg-[#131313] px-6 py-4 flex items-center justify-between">
        {/* Search input with icon */}
        <div className="relative flex-1 max-w-md">
          <InputText
            type="text"
            placeholder="Search..."
            className="w-2/3 bg-[#0A0A0A] ounded-md px-4 py-2 pl-10 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3A3A3A]"
          />
          {/* Search icon */}
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* New Company button */}
        <Button
          onClick={onNewCompany}
          className="ml-4 bg-[#6366F1] hover:bg-[#5558E3] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          New Company
        </Button>
      </div>

      {/* AG Grid table container */}
      <div className="flex-1 ag-theme-alpine-dark">
        <AgGridReact
          rowData={data}                    // Data to display in the table
          columnDefs={columnDefs}           // Column definitions
          defaultColDef={defaultColDef}     // Default column configuration
          rowHeight={52}                    // Height of each table row
          headerHeight={44}                 // Height of table header
          domLayout="normal"                // Use normal DOM layout (not virtual scrolling)
          suppressCellFocus={true}          // Disable cell focus highlighting
          suppressRowHoverHighlight={false} // Enable row hover highlighting
        />
      </div>
    </div>
  );
}
