
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <div className="pick-gradient rounded-lg p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">
              <span className="text-gray-900">Pick</span>
              <span className="pick-gradient-text"> for Me</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button
              variant={location.pathname === '/home' ? 'default' : 'ghost'}
              onClick={() => navigate('/home')}
              className={location.pathname === '/home' ? 'pick-gradient text-white' : ''}
            >
              <Home className="w-4 h-4 mr-2" />
              홈
            </Button>
            
            <Button
              variant={location.pathname === '/profile' ? 'default' : 'ghost'}
              onClick={() => navigate('/profile')}
              className={location.pathname === '/profile' ? 'pick-gradient text-white' : ''}
            >
              <User className="w-4 h-4 mr-2" />
              프로필
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
