import { Appointment, WaitingListItem, Specialty } from '../types';

let mockAppointments: Appointment[] = [
  {
    id: '1',
    specialty: 'Cardiologia',
    doctor: 'Dr. João da Silva',
    date: '2024-08-15',
    time: '10:30',
    location: 'Rua das Flores, 123 - Sala 2',
    clinic: 'UBS Centro',
  },
  {
    id: '2',
    specialty: 'Dermatologia',
    doctor: 'Dra. Maria Oliveira',
    date: '2024-09-02',
    time: '14:00',
    location: 'Av. Principal, 456 - Consultório 5',
    clinic: 'Hospital Municipal',
  },
];

let mockWaitingList: WaitingListItem[] = [
  {
    id: 'wl1',
    specialty: 'Ortopedia',
    position: 12,
    totalInQueue: 87,
    requestDate: '2024-05-20',
    estimatedDate: '2024-11-10',
  },
  {
    id: 'wl2',
    specialty: 'Clínica Médica',
    position: 5,
    totalInQueue: 23,
    requestDate: '2024-07-10',
    estimatedDate: '2024-08-05',
  },
];

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 800));
}

export const getAppointments = (): Promise<Appointment[]> => {
    return simulateDelay([...mockAppointments]);
};

export const getWaitingList = (): Promise<WaitingListItem[]> => {
    return simulateDelay([...mockWaitingList]);
};

export const scheduleAppointment = (specialty: Specialty, time: string): Promise<Appointment> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const today = new Date();
            const futureDate = new Date(today.setDate(today.getDate() + 30 + Math.floor(Math.random() * 30)));
            const newAppointment: Appointment = {
                id: `app${Date.now()}`,
                specialty,
                doctor: 'A ser definido',
                date: futureDate.toISOString().split('T')[0],
                time: time,
                location: 'Local a ser confirmado',
                clinic: 'Unidade de Saúde a definir',
            };
            mockAppointments.push(newAppointment);
            mockAppointments.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            resolve(newAppointment);
        }, 1200);
    });
};

export const cancelAppointment = (appointmentId: string): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mockAppointments.findIndex(app => app.id === appointmentId);
            if (index > -1) {
                mockAppointments.splice(index, 1);
                resolve({ success: true });
            } else {
                reject({ success: false, message: "Appointment not found" });
            }
        }, 800);
    });
};