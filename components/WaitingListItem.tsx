
import React from 'react';
import { WaitingListItem } from '../types';

interface WaitingListItemProps {
    item: WaitingListItem;
}

const WaitingListItemComponent: React.FC<WaitingListItemProps> = ({ item }) => {
    const progressPercentage = ((item.totalInQueue - item.position) / item.totalInQueue) * 100;
    
    const formattedRequestDate = new Date(item.requestDate + 'T00:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
     const formattedEstimatedDate = new Date(item.estimatedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-yellow-500">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.specialty}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">Solicitado em: {formattedRequestDate}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center my-4 sm:my-6 sm:grid-cols-3">
                <div>
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">{item.position}ª</p>
                    <p className="text-xs sm:text-sm text-gray-600">Sua Posição</p>
                </div>
                <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-700">{item.totalInQueue}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Total na Fila</p>
                </div>
                 <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                    <p className="text-base sm:text-lg font-semibold text-green-700">{formattedEstimatedDate}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Previsão</p>
                </div>
            </div>

            <div className="mt-4 sm:mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Progresso na fila</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                        className="bg-green-600 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default WaitingListItemComponent;
