import Layout from "./Layout.jsx";
import Dashboard from "./Dashboard";
import Wizard from "./Wizard";
import MyListings from "./MyListings";
import Home from "./Home";
import LandingPage from "./LandingPage";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import ResetPassword from "./ResetPassword";
import AccountSettings from "./AccountSettings";
import Login from "./Login";
import Signup from "./Signup";
import Features from "./Features";
import About from "./About";
import Documentation from "./Documentation";
import Contact from "./Contact";
import Blog from "./Blog";
import Privacy from "./Privacy";
import Terms from "./Terms";
import TenStrategiesIncreaseSales from "./blog/TenStrategiesIncreaseSales";
import UltimateGuideEbaySEO from "./blog/UltimateGuideEbaySEO";
import AIRevolutionizingEcommerce from "./blog/AIRevolutionizingEcommerce";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    LandingPage: LandingPage,
    Dashboard: Dashboard,
    Wizard: Wizard,
    MyListings: MyListings,
    Home: Home,
    Pricing: Pricing,
    FAQ: FAQ,
    ResetPassword: ResetPassword,
    AccountSettings: AccountSettings,
    Login: Login,
    Signup: Signup,
    Features: Features,
    About: About,
    Documentation: Documentation,
    Contact: Contact,
    Blog: Blog,
    Privacy: Privacy,
    Terms: Terms,
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
        <>
            <Routes>            
                <Route path="/" element={<LandingPage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
                <Route path="/Wizard" element={<Layout currentPageName="Wizard"><Wizard /></Layout>} />
                <Route path="/MyListings" element={<Layout currentPageName="MyListings"><MyListings /></Layout>} />
                <Route path="/Home" element={<Layout currentPageName="Home"><Home /></Layout>} />
                <Route path="/Pricing" element={<Pricing />} />
                <Route path="/FAQ" element={<Layout currentPageName="FAQ"><FAQ /></Layout>} />
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route path="/AccountSettings" element={<Layout currentPageName="AccountSettings"><AccountSettings /></Layout>} />
                <Route path="/Features" element={<Features />} />
                <Route path="/About" element={<About />} />
                <Route path="/Documentation" element={<Documentation />} />
                <Route path="/Docs" element={<Documentation />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/Guides" element={<Blog />} />
                <Route path="/Privacy" element={<Privacy />} />
                <Route path="/Terms" element={<Terms />} />
                <Route path="/Cookies" element={<Privacy />} />
                <Route path="/GDPR" element={<Privacy />} />
                <Route path="/blog/ten-strategies-increase-sales" element={<TenStrategiesIncreaseSales />} />
                <Route path="/blog/ultimate-guide-ebay-seo-optimization" element={<UltimateGuideEbaySEO />} />
                <Route path="/blog/ai-revolutionizing-ecommerce-content-creation" element={<AIRevolutionizingEcommerce />} />
            </Routes>
        </>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}