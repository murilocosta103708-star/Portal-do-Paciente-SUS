import React, { useState } from 'react';
import { availableSpecialties, Specialty } from '../types';
import Spinner from './Spinner';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (specialty: Specialty, time: string) => Promise<void>;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const availableTimes: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];


const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSchedule }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>(availableSpecialties[0]);
  const [selectedTime, setSelectedTime] = useState<string>(availableTimes[0]);
  const [isScheduling, setIsScheduling] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsScheduling(true);
    await onSchedule(selectedSpecialty, selectedTime);
    setIsScheduling(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 m-4 max-w-md w-full transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Marcar Nova Consulta</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
              Escolha a especialidade
            </label>
            <select
              id="specialty"
              name="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value as Specialty)}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              disabled={isScheduling}
            >
              {availableSpecialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Escolha o horário de preferência
            </label>
            <select
              id="time"
              name="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              disabled={isScheduling}
            >
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            <p>Após a solicitação, sua consulta será agendada na unidade de saúde mais próxima com disponibilidade para o horário de preferência. Você será notificado sobre os detalhes.</p>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isScheduling}
            className="w-full sm:w-auto py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isScheduling}
            className="w-full sm:w-auto py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors flex items-center justify-center disabled:bg-blue-400"
          >
            {isScheduling ? <Spinner/> : 'Confirmar Solicitação'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;