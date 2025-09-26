

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import { User } from "@/api/entities";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger } from
"@/components/ui/sidebar";

const navigationItems = [
{
  title: "Dashboard",
  url: createPageUrl("Dashboard"),
  icon: "bi-grid-1x2"
},
{
  title: "My Listings",
  url: createPageUrl("MyListings"),
  icon: "bi-file-earmark-text"
}];


export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    User.me().then(setUser).catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await User.logout();
    window.location.href = "/";
  };

  const getUserInitials = (name) => {
    if (!name) return "?";
    return name.
    split(' ').
    map((word) => word.charAt(0)).
    join('').
    substring(0, 2).
    toUpperCase();
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --brand-primary: #FF5A5F;
          --brand-primary-hover: #f0555a;
          --text-primary: #222222;
          --text-secondary: #717171;
          --border-color: #EBEBEB;
          --background-light: #F7F7F7;
        }
        .bg-brand-primary { background-color: var(--brand-primary); }
        .hover\\:bg-brand-primary-hover:hover { background-color: var(--brand-primary-hover); }
        .text-brand-primary { color: var(--brand-primary); }
        .border-brand-primary { border-color: var(--brand-primary); }
      `}</style>
      <div className="min-h-screen flex w-full bg-white">
        <Sidebar className="border-r border-[var(--border-color)] bg-white">
          <SidebarHeader className="border-b border-[var(--border-color)] p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                  <i className="bi bi-stars text-xl text-white"></i>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-[var(--text-primary)] text-lg">eBay Listing Description AI</h2>
                <p className="text-xs text-[var(--text-secondary)] font-medium">Listing Generator</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3 py-3">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) =>
                  <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                      asChild
                      className={`group relative overflow-hidden transition-all duration-300 rounded-xl ${
                      location.pathname === item.url ?
                      'bg-brand-primary text-white shadow-lg' :
                      'hover:bg-[var(--background-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
                      }>

                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <i className={`bi ${item.icon} text-lg`}></i>
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3 py-3">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="bg-[var(--background-light)] p-4 rounded-xl border border-[var(--border-color)]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Active Projects</span>
                      <span className="text-lg font-bold text-[var(--text-primary)]">3</span>
                    </div>
                  </div>
                  <div className="bg-[var(--background-light)] p-4 rounded-xl border border-[var(--border-color)]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Completed</span>
                      <span className="text-lg font-bold text-brand-primary">12</span>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-[var(--border-color)] p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-3 bg-[var(--background-light)] rounded-xl cursor-pointer hover:bg-slate-200 transition-colors">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{getUserInitials(user?.full_name)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--text-primary)] text-sm truncate">{user?.full_name || "Guest"}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={createPageUrl("AccountSettings")}>
                    <i className="bi bi-gear w-4 h-4 mr-2"></i>
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <i className="bi bi-question-circle w-4 h-4 mr-2"></i>
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right w-4 h-4 mr-2"></i>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-[var(--background-light)]">
          <header className="bg-white backdrop-blur-sm border-b border-[var(--border-color)] px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold text-brand-primary">
                eBay DescriptionAI
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>);

}
