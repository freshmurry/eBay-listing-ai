import './App.css'
import { useEffect } from 'react'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { initializeDemoData } from "@/utils/demoData"
import { SubscriptionProvider } from "@/components/SubscriptionManager"

function App() {
  useEffect(() => {
    // Initialize demo data on app load
    initializeDemoData();
  }, []);

  return (
    <SubscriptionProvider>
      <Pages />
      <Toaster />
    </SubscriptionProvider>
  )
}

export default App 