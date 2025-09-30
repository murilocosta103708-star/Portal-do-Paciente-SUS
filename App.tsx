import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import AppointmentCard from './components/AppointmentCard';
import WaitingListItemComponent from './components/WaitingListItem';
import ScheduleModal from './components/ScheduleModal';
import Spinner from './components/Spinner';
import LoginPage from './components/LoginPage';
import AppointmentDetailModal from './components/AppointmentDetailModal';
import { Appointment, WaitingListItem, View, Specialty } from './types';
import { getAppointments, getWaitingList, scheduleAppointment as apiScheduleAppointment, cancelAppointment as apiCancelAppointment } from './services/mockData';

type NotificationType = 'success' | 'error';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState<View>(View.Appointments);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [waitingList, setWaitingList] = useState<WaitingListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<{message: string, type: NotificationType} | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [appointmentsData, waitingListData] = await Promise.all([
                getAppointments(),
                getWaitingList()
            ]);
            setAppointments(appointmentsData);
            setWaitingList(waitingListData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setNotification({ message: "Erro ao carregar os dados. Tente novamente mais tarde.", type: 'error'});
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [fetchData, isAuthenticated]);

    const handleScheduleAppointment = async (specialty: Specialty, time: string) => {
        try {
            await apiScheduleAppointment(specialty, time);
            setNotification({ message: `Solicitação para ${specialty} enviada com sucesso!`, type: 'success' });
            setTimeout(() => setNotification(null), 4000);
            setIsModalOpen(false);
            fetchData(); // Refresh data after scheduling
        } catch (error) {
            console.error("Failed to schedule appointment:", error);
            setNotification({ message: "Erro ao agendar consulta.", type: 'error'});
            setTimeout(() => setNotification(null), 4000);
        }
    };
    
    const handleCancelAppointment = async (appointmentId: string) => {
        try {
            await apiCancelAppointment(appointmentId);
            setNotification({ message: 'Consulta cancelada com sucesso!', type: 'success' });
            setTimeout(() => setNotification(null), 4000);
            setSelectedAppointment(null);
            await fetchData();
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
            setNotification({ message: 'Erro ao cancelar consulta.', type: 'error'});
            setTimeout(() => setNotification(null), 4000);
            setSelectedAppointment(null);
        }
    };

    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);
    const handleOpenDetailModal = (appointment: Appointment) => setSelectedAppointment(appointment);
    const handleCloseDetailModal = () => setSelectedAppointment(null);

    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <Spinner size="lg" />
                </div>
            );
        }

        if (view === View.Appointments) {
            return appointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map(app => <AppointmentCard key={app.id} appointment={app} onDetailsClick={handleOpenDetailModal} />)}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700">Nenhuma consulta agendada.</h3>
                    <p className="text-gray-500 mt-2">Clique em "Marcar Consulta" para solicitar um novo agendamento.</p>
                </div>
            );
        }

        if (view === View.WaitingList) {
            return waitingList.length > 0 ? (
                <div className="space-y-6">
                    {waitingList.map(item => <WaitingListItemComponent key={item.id} item={item} />)}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700">Você não está em nenhuma fila de espera.</h3>
                    <p className="text-gray-500 mt-2">Suas solicitações de consulta pendentes aparecerão aqui.</p>
                </div>
            );
        }
    };
    
    const notificationStyles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700'
    };
    const SuccessIcon = () => (<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);
    const ErrorIcon = () => (<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header onLogout={handleLogout} />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                    <div className="flex bg-gray-200 rounded-lg p-1 space-x-1 w-full sm:w-auto">
                        <button 
                            onClick={() => setView(View.Appointments)}
                            className={`w-1/2 sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition-colors ${view === View.Appointments ? 'bg-white text-blue-700 shadow' : 'text-gray-600'}`}
                        >
                            Agendamentos
                        </button>
                        <button 
                            onClick={() => setView(View.WaitingList)}
                            className={`w-1/2 sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition-colors ${view === View.WaitingList ? 'bg-white text-blue-700 shadow' : 'text-gray-600'}`}
                        >
                            Fila de Espera
                        </button>
                    </div>
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 flex items-center justify-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Marcar Consulta</span>
                    </button>
                </div>
                {notification && (
                    <div className={`fixed top-20 left-4 right-4 sm:left-auto sm:right-8 sm:w-auto max-w-md border px-4 py-3 rounded-lg shadow-lg text-center sm:text-left z-50 flex items-center space-x-2 ${notificationStyles[notification.type]}`} role="alert">
                        {notification.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
                        <span className="font-medium">{notification.message}</span>
                    </div>
                )}
                {renderContent()}
            </main>
            <ScheduleModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSchedule={handleScheduleAppointment}
            />
            <AppointmentDetailModal
                isOpen={!!selectedAppointment}
                onClose={handleCloseDetailModal}
                onCancel={handleCancelAppointment}
                appointment={selectedAppointment}
            />
        </div>
    );
};

export default App;