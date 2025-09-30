import React from 'react';
import { Appointment } from '../types';

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


interface AppointmentCardProps {
    appointment: Appointment;
    onDetailsClick: (appointment: Appointment) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onDetailsClick }) => {
    const formattedDate = new Date(appointment.date + 'T00:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800">{appointment.specialty}</h3>
                    <span className="px-3 py-1 text-xs sm:text-sm font-semibold text-green-800 bg-green-200 rounded-full">Confirmado</span>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-gray-700">
                    <div className="flex items-center">
                        <UserIcon/>
                        <span>{appointment.doctor}</span>
                    </div>
                    <div className="flex items-center">
                        <CalendarIcon />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon />
                        <span>{appointment.time}</span>
                    </div>
                    <div className="border-t my-4 sm:my-5"></div>
                    <div className="flex items-start">
                         <LocationIcon />
                        <div>
                            <p className="font-semibold">{appointment.clinic}</p>
                            <p className="text-sm text-gray-600">{appointment.location}</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="bg-gray-50 px-4 sm:px-6 py-3">
                <button
                    onClick={() => onDetailsClick(appointment)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Ver detalhes ou cancelar
                </button>
            </div>
        </div>
    );
};

export default AppointmentCard;
