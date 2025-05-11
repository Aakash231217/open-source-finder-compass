import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Open Hub
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            to="/saved" 
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved Projects</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
