import { ServiceLocation, ServiceCategory } from '@/types';
import { MOCK_SERVICES } from '@/data/mockData';

export interface UserCoordinates {
  latitude: number;
  longitude: number;
  locationName: string;
  isCustom: boolean;
}

const DEFAULT_COORDS: UserCoordinates = {
  latitude: 18.5074,
  longitude: 73.8077,
  locationName: 'Kothrud, Pune, Maharashtra',
  isCustom: false
};

const STORAGE_KEY = 'saathi_user_location_v1';

class LocationService {
  private currentCoords: UserCoordinates = DEFAULT_COORDS;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.currentCoords = JSON.parse(stored);
        } catch {
          this.currentCoords = DEFAULT_COORDS;
        }
      }
    }
  }

  public getCoordinates(): UserCoordinates {
    return { ...this.currentCoords };
  }

  public async requestBrowserLocation(): Promise<UserCoordinates> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return this.currentCoords;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords: UserCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            locationName: `GPS (${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)})`,
            isCustom: true
          };
          this.currentCoords = newCoords;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newCoords));
          resolve(newCoords);
        },
        () => {
          // Graceful fallback to default
          resolve(this.currentCoords);
        },
        { timeout: 8000 }
      );
    });
  }

  /**
   * Haversine formula to compute distance in KM
   */
  public calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  }

  public getServices(category?: ServiceCategory | 'all', searchQuery?: string): ServiceLocation[] {
    let services = [...MOCK_SERVICES];

    // Compute live distance from current coords
    services = services.map((s) => ({
      ...s,
      distanceKm: this.calculateDistanceKm(
        this.currentCoords.latitude,
        this.currentCoords.longitude,
        s.latitude,
        s.longitude
      )
    }));

    // Filter by category
    if (category && category !== 'all') {
      services = services.filter((s) => s.category === category);
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      services = services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Sort by proximity
    return services.sort((a, b) => a.distanceKm - b.distanceKm);
  }
}

export const locationService = new LocationService();
