// StationListModal.tsx
import React, { useState } from 'react';
import { MetroStation } from '@/types/metrostation';

interface StationListModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: MetroStation[];
}

const StationListModal: React.FC<StationListModalProps> = ({ isOpen, onClose, stations }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  React.useEffect(() => {
    if (isOpen) setIsExpanded(false);
  }, [isOpen, stations]);

  if (!isOpen || stations.length === 0) return null;

  const totalStations = stations.length;

  const DownArrow = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="#4A5568" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  const UpArrow = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="#4A5568" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        padding: '18px 22px',
        zIndex: 1000,
        width: isExpanded ? '300px' : 'fit-content',
        maxHeight: '70vh',
        overflowY: isExpanded ? 'auto' : 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        fontFamily: 'system-ui, sans-serif',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isExpanded ? '1px solid #E2E8F0' : 'none', paddingBottom: '8px', marginBottom: '12px' }}>
        <h2 style={{ margin: 0, fontSize: '1.05em', fontWeight: 600, color: '#1A202C' }}>
          Your Route ({totalStations} Stations)
        </h2>
        <span>{isExpanded ? <UpArrow /> : <DownArrow />}</span>
      </div>

      {/* Content */}
      {isExpanded ? (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 10px',
      justifyContent: 'center',
      marginBottom: '10px',
    }}
  >
    {stations.map((station, idx) => (
      <span
        key={station.id}
        style={{
          fontSize: '0.9em',
          fontWeight: 500,
          color: '#2D3748',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {station.name}
        {idx < totalStations - 1 && (
          <span style={{ margin: '0 6px', color: '#A0AEC0' }}>→</span>
        )}
      </span>
    ))}
  </div>
) : (
  <p style={{ margin: 0, fontSize: '0.95em', fontWeight: 500, color: '#2D3748' }}>
    {stations[0].name} → {stations[totalStations - 1].name}
  </p>
)}

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          marginTop: '14px',
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 600,
          fontSize: '0.9em',
          color: '#fff',
          background: '#3182CE',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#2B6CB0')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#3182CE')}
      >
        Close
      </button>
    </div>
  );
};

export default StationListModal;
