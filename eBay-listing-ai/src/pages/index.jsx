import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Wizard from "./Wizard";

import MyListings from "./MyListings";

import Home from "./Home";

import Pricing from "./Pricing";

import FAQ from "./FAQ";

import ResetPassword from "./ResetPassword";

import AccountSettings from "./AccountSettings";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Wizard: Wizard,
    
    MyListings: MyListings,
    
    Home: Home,
    
    Pricing: Pricing,
    
    FAQ: FAQ,
    
    ResetPassword: ResetPassword,
    
    AccountSettings: AccountSettings,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Wizard" element={<Wizard />} />
                
                <Route path="/MyListings" element={<MyListings />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/FAQ" element={<FAQ />} />
                
                <Route path="/ResetPassword" element={<ResetPassword />} />
                
                <Route path="/AccountSettings" element={<AccountSettings />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}