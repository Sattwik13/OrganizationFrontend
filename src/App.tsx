/**
 * Main App Component
 * 
 * This is the root component of the application that manages the overall layout
 * and data flow. It loads organization data from a CSV file and renders the
 * main application interface with sidebar, header, and data table.
 */

import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OrganizationsTable } from './components/OrganizationsTable';
import Papa from 'papaparse';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

/**
 * Organization data structure interface
 * Defines the shape of organization objects used throughout the application
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
 * Main App Component
 * 
 * Manages the application state and renders the main layout structure.
 * Loads organization data from CSV file on component mount.
 */
function App() {
  // State for storing organization data
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  // Loading state to show loading indicator while data is being fetched
  const [loading, setLoading] = useState(true);

  /**
   * Effect hook to load organization data from CSV file
   * Runs once when component mounts (empty dependency array)
   */
  useEffect(() => {
    // Fetch the CSV file from the public directory
    fetch('/organizations.csv')
      .then((res) => res.text()) // Convert response to text
      .then((text) => {
        // Parse CSV text using Papa Parse library
        const result = Papa.parse(text, { 
          header: true,        // First row contains headers
          skipEmptyLines: true // Skip empty lines in CSV
        });
        
        // Transform CSV data into Organization objects
        const rows = (result.data as any[]).map((row, idx) => ({
          id: String(idx + 1),                    // Generate sequential ID
          company_name: row.company_name,         // Map company name
          industry: row.industry,                 // Map industry
          size: Number(row.size),                 // Convert size to number
          status: row.status,                     // Map status
          first_engagement: row.first_engagement, // Map first engagement date
          last_engagement: row.last_engagement,   // Map last engagement date
          final_engagement_summary: row.final_engagement_summary, // Map summary
          icon_color: row.icon_color,             // Map icon color
        }));
        
        // Update state with parsed data
        setOrganizations(rows);
      })
      .finally(() => setLoading(false)); // Always set loading to false
  }, []); // Empty dependency array - runs only on mount

  /**
   * Handler for new company button click
   * Currently logs to console - can be extended for actual functionality
   */
  const handleNewCompany = () => {
    console.log('New Company clicked');
    // TODO: Implement new company creation functionality
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0A0A]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  /**
   * Main application layout
   * Uses flexbox for responsive layout with sidebar and main content area
   */
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left sidebar navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header with navigation and user controls */}
        <Header onNewCompany={handleNewCompany} />
        
        {/* Main content area containing the organizations table */}
        <div className="flex-1 overflow-hidden">
          <OrganizationsTable data={organizations} onNewCompany={handleNewCompany} />
        </div>
      </div>
    </div>
  );
}

export default App;
