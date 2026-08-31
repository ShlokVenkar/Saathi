import { GestureMapping, RequestType } from '@/types';

export const GESTURE_MAPPINGS: GestureMapping[] = [
  {
    id: 'gesture-hungry',
    nameKey: 'requests.HUNGRY',
    requestType: 'HUNGRY',
    descriptionKey: 'hardware.simulateHungry',
    flexPattern: [true, true, false, false], // Index + Middle
    iconName: 'Utensils'
  },
  {
    id: 'gesture-thirsty',
    nameKey: 'requests.THIRSTY',
    requestType: 'THIRSTY',
    descriptionKey: 'hardware.simulateThirsty',
    flexPattern: [true, false, false, false], // Index only
    iconName: 'CupSoda'
  },
  {
    id: 'gesture-medicine',
    nameKey: 'requests.MEDICINE',
    requestType: 'MEDICINE',
    descriptionKey: 'hardware.simulateMedicine',
    flexPattern: [true, false, false, true], // Index + Thumb Pinch
    iconName: 'Pill'
  },
  {
    id: 'gesture-family',
    nameKey: 'requests.FAMILY',
    requestType: 'FAMILY',
    descriptionKey: 'hardware.simulateFamily',
    flexPattern: [false, false, false, true], // Thumb/Palm hold
    iconName: 'Users'
  },
  {
    id: 'gesture-toilet',
    nameKey: 'requests.TOILET',
    requestType: 'TOILET',
    descriptionKey: 'requests.TOILET_desc',
    flexPattern: [false, true, true, false], // Middle + Ring
    iconName: 'Footprints'
  },
  {
    id: 'gesture-sos',
    nameKey: 'requests.EMERGENCY',
    requestType: 'EMERGENCY',
    descriptionKey: 'hardware.simulateSos',
    flexPattern: [true, true, true, true], // Full Fist / All bent
    iconName: 'AlertTriangle'
  }
];

/**
 * Match 4-sensor boolean pattern to gesture mapping
 */
export function matchGesture(pattern: [boolean, boolean, boolean, boolean]): GestureMapping | null {
  for (const g of GESTURE_MAPPINGS) {
    if (
      g.flexPattern[0] === pattern[0] &&
      g.flexPattern[1] === pattern[1] &&
      g.flexPattern[2] === pattern[2] &&
      g.flexPattern[3] === pattern[3]
    ) {
      return g;
    }
  }
  return null;
}
