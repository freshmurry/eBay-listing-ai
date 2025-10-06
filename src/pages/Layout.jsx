import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
