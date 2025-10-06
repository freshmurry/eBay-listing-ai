import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

const publicNavItems = [
  { name: "Features", href: "/Features" },
  { name: "Pricing", href: "/Pricing" },
  { name: "About", href: "/About" },
];

const authNavItems = [
  { name: "Dashboard", href: "/Dashboard" },
  { name: "Create Description", href: "/Wizard" },
  { name: "My Descriptions", href: "/MyListings" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  // Check if user is logged in and listen for profile updates
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      // Store user in localStorage for profile image updates
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    };
    
    const handleProfileUpdate = () => {
      const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (userData) {
        setUser(userData);
      }
    };
    
    checkAuth();
    
    // Listen for profile updates
    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleSignOut = async () => {
    await base44.auth.logout();
    setUser(null);
    window.location.href = "/";
  };

  const isAuthenticated = !!user;
  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <Link to={isAuthenticated ? createPageUrl("Dashboard") : "/"} className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">eBay DescriptionAI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_image} alt={user?.name || user?.full_name || 'User'} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                        {user?.name ? user.name[0]?.toUpperCase() : 
                         user?.full_name ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase() :
                         user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_image} alt={user?.name || user?.full_name || 'User'} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                        {user?.name ? user.name[0]?.toUpperCase() : 
                         user?.full_name ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase() :
                         user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.full_name || user?.name || "Demo User"}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email || "demo@example.com"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("Dashboard")}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("AccountSettings")}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/Login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/Signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="h-9 w-9 p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="border-t px-2 pb-3 pt-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t pt-4">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profile_image} alt={user?.name || user?.full_name || 'User'} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {user?.name ? user.name[0]?.toUpperCase() : 
                         user?.full_name ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase() :
                         user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.full_name || user?.name || "Demo User"}</p>
                      <p className="text-sm text-gray-500">{user?.email || "demo@example.com"}</p>
                    </div>
                  </div>
                  <Link
                    to={createPageUrl("AccountSettings")}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/Login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/Signup"
                    className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}