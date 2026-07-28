import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface MapPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

export function MapPicker({ onLocationSelect, initialLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation || { lat: -6.2088, lng: 106.8456 } // Jakarta default
  );

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Simulate location selection (in real app, this would be actual map coordinates)
    const mockLat = -6.2088 + (y - rect.height / 2) / 1000;
    const mockLng = 106.8456 + (x - rect.width / 2) / 1000;
    
    const location = {
      lat: mockLat,
      lng: mockLng,
      address: `Jl. Contoh No. ${Math.floor(Math.random() * 100)}, Jakarta`
    };
    
    setSelectedLocation({ lat: mockLat, lng: mockLng });
    onLocationSelect(location);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm text-foreground">Lokasi Jalan Rusak</label>
      <div
        ref={mapRef}
        onClick={handleMapClick}
        className="w-full h-64 bg-muted rounded-lg border-2 border-border relative overflow-hidden cursor-crosshair"
        style={{
          backgroundImage: `
            linear-gradient(rgba(102, 252, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 252, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
            <p className="text-sm">Klik pada peta untuk memilih lokasi</p>
            <p className="text-xs mt-1">Simulasi Peta - Jakarta Area</p>
          </div>
        </div>
        
        {/* Selected Location Marker */}
        <div
          className="absolute w-8 h-8 -ml-4 -mt-8 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          <MapPin className="w-8 h-8 text-destructive fill-destructive/20" />
        </div>

        {/* Mock Streets */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-secondary/20"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary/30"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-secondary/20"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-secondary/20"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-secondary/30"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-secondary/20"></div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Koordinat: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
      </p>
    </div>
  );
}
