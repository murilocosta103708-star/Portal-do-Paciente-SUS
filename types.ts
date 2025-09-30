
export interface Appointment {
  id: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  clinic: string;
}

export interface WaitingListItem {
  id: string;
  specialty: string;
  position: number;
  totalInQueue: number;
  estimatedDate: string;
  requestDate: string;
}

export enum View {
  Appointments = 'APPOINTMENTS',
  WaitingList = 'WAITING_LIST',
}

export type Specialty = 'Clínica Médica' | 'Cardiologia' | 'Ortopedia' | 'Dermatologia' | 'Pediatria';

export const availableSpecialties: Specialty[] = ['Clínica Médica', 'Cardiologia', 'Ortopedia', 'Dermatologia', 'Pediatria'];
