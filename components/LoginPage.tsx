import React, { useState } from 'react';
import Spinner from './Spinner';

const SUSLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="100" r="100" fill="#0054A6"/>
        <path d="M100 25C110.5 25 120.583 29.5 128.5 37.5C136.5 45.5 141.5 55.8333 141.5 66.5V133.5C141.5 144.167 136.5 154.5 128.5 162.5C120.583 170.5 110.5 175 100 175C89.5 175 79.4167 170.5 71.5 162.5C63.5 154.5 58.5 144.167 58.5 133.5V66.5C58.5 55.8333 63.5 45.5 71.5 37.5C79.4167 29.5 89.5 25 100 25ZM100 41.5C93.0833 41.5 87.0833 44.0833 82 49C77 54 74.5 60.1667 74.5 67.5V132.5C74.5 139.833 77 146 82 151C87.0833 156 93.0833 158.5 100 158.5C106.917 158.5 112.917 156 118 151C123 146 125.5 139.833 125.5 132.5V67.5C125.5 60.1667 123 54 118 49C112.917 44.0833 106.917 41.5 100 41.5Z" fill="white"/>
        <path d="M100 66C108.283 66 115 72.7167 115 81V119C115 127.283 108.283 134 100 134C91.7167 134 85 127.283 85 119V81C85 72.7167 91.7167 66 100 66Z" fill="#00A859"/>
    </svg>
);


interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [susCardNumber, setSusCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const isSusCardValid = /^\d{11}$/.test(susCardNumber);
    const isPasswordValid = /^\d{4}$/.test(password);

    if (!isSusCardValid || !isPasswordValid) {
      setError('senha ou numero errado');
      return;
    }
    
    setIsLoading(true);

    // Simula uma chamada de API para autenticação
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="flex justify-center mb-6">
          <SUSLogo className="w-20 h-20" />
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Portal do Paciente</h1>
          <p className="text-center text-gray-500 mb-8">Acesse seus agendamentos e fila de espera.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="sus-card" className="block text-sm font-medium text-gray-700">
                Número do Cartão SUS
              </label>
              <input
                type="tel"
                id="sus-card"
                value={susCardNumber}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                         setSusCardNumber(value);
                    }
                }}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="11 dígitos do cartão"
                disabled={isLoading}
                aria-required="true"
                maxLength={11}
                pattern="\d{11}"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        setPassword(value);
                    }
                }}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="4 dígitos"
                disabled={isLoading}
                aria-required="true"
                maxLength={4}
                pattern="\d{4}"
              />
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Spinner /> : 'Entrar'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;