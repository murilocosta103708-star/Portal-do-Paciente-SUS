import React, { useState } from 'react';
import { Appointment } from '../types';
import Spinner from './Spinner';

// Re-using icons from AppointmentCard for consistency
const CalendarIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const ClockIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LocationIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const UserIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>);

interface AppointmentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: (appointmentId: string) => Promise<void>;
    appointment: Appointment | null;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({ isOpen, onClose, onCancel, appointment }) => {
    const [isCancelling, setIsCancelling] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    if (!isOpen || !appointment) return null;

    const handleCancel = async () => {
        setIsCancelling(true);
        await onCancel(appointment.id);
        // Reset state on successful cancellation, parent will close modal
        setIsCancelling(false);
        setShowConfirm(false);
    };

    const handleClose = () => {
        // Reset confirmation state when closing
        if(isCancelling) return;
        setShowConfirm(false);
        onClose();
    };

    const formattedDate = new Date(appointment.date + 'T00:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300" onClick={handleClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 m-4 max-w-lg w-full transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Detalhes da Consulta</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {!showConfirm ? (
                    <>
                        <div className="space-y-5 text-gray-700">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-blue-800">{appointment.specialty}</h3>
                                <span className="text-xs sm:text-sm font-semibold text-green-800">Confirmado</span>
                            </div>
                            <div className="flex items-center">
                                <UserIcon />
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
                            <div className="border-t my-4"></div>
                            <div className="flex items-start">
                                <LocationIcon />
                                <div>
                                    <p className="font-semibold">{appointment.clinic}</p>
                                    <p className="text-sm text-gray-600">{appointment.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                            <button
                                onClick={handleClose}
                                className="w-full sm:w-auto py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Fechar
                            </button>
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="w-full sm:w-auto py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Cancelar Consulta
                            </button>
                        </div>
                    </>
                ) : (
                     <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Confirmar Cancelamento</h3>
                        <p className="text-gray-600 mb-6">
                            Você tem certeza que deseja cancelar a consulta de <span className="font-semibold">{appointment.specialty}</span> no dia {new Date(appointment.date + 'T00:00:00').toLocaleDateString('pt-BR', {day: '2-digit', month: 'long'})}?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                disabled={isCancelling}
                                className="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50"
                            >
                                Voltar
                            </button>
                             <button
                                onClick={handleCancel}
                                disabled={isCancelling}
                                className="w-32 py-2 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 flex items-center justify-center disabled:bg-red-400"
                            >
                                {isCancelling ? <Spinner /> : 'Sim, cancelar'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentDetailModal;
