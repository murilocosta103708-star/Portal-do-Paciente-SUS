
import React, { useState, useEffect, useRef } from 'react';

const SUSLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="100" r="100" fill="#0054A6"/>
        <path d="M100 25C110.5 25 120.583 29.5 128.5 37.5C136.5 45.5 141.5 55.8333 141.5 66.5V133.5C141.5 144.167 136.5 154.5 128.5 162.5C120.583 170.5 110.5 175 100 175C89.5 175 79.4167 170.5 71.5 162.5C63.5 154.5 58.5 144.167 58.5 133.5V66.5C58.5 55.8333 63.5 45.5 71.5 37.5C79.4167 29.5 89.5 25 100 25ZM100 41.5C93.0833 41.5 87.0833 44.0833 82 49C77 54 74.5 60.1667 74.5 67.5V132.5C74.5 139.833 77 146 82 151C87.0833 156 93.0833 158.5 100 158.5C106.917 158.5 112.917 156 118 151C123 146 125.5 139.833 125.5 132.5V67.5C125.5 60.1667 123 54 118 49C112.917 44.0833 106.917 41.5 100 41.5Z" fill="white"/>
        <path d="M100 66C108.283 66 115 72.7167 115 81V119C115 127.283 108.283 134 100 134C91.7167 134 85 127.283 85 119V81C85 72.7167 91.7167 66 100 66Z" fill="#00A859"/>
    </svg>
);

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-3 md:space-x-4">
            <SUSLogo className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              <span className="hidden sm:inline">Portal do Paciente </span>
              <span className="text-blue-700">SUS</span>
            </h1>
          </div>
          <div className="relative" ref={profileMenuRef}>
            <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-haspopup="true"
                aria-expanded={isProfileMenuOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium hidden md:inline">Maria S.</span>
            </button>
            {isProfileMenuOpen && (
                 <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Meu Perfil</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Configurações</a>
                        <div className="border-t border-gray-100"></div>
                        <button
                            onClick={onLogout}
                            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
