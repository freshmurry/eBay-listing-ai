
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[var(--border-color)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-stars text-xl text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">eBay DescriptionAI</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to={createPageUrl("Pricing")}>
                <Button variant="ghost" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold border border-transparent hover:border-slate-200">
                  {t('home.header.pricing')}
                </Button>
              </Link>
              <Link to={createPageUrl("FAQ")}>
                <Button variant="ghost" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  {t('home.header.faq')}
                </Button>
              </Link>
              <Button variant="outline" className="border-[var(--border-color)] border-2 font-semibold" onClick={() => window.location.href = '/auth/login'}>
                {t('home.header.signIn')}
              </Button>
              <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white border-2 border-brand-primary font-semibold" onClick={() => window.location.href = '/auth/signup'}>
                {t('home.header.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 mb-6">
            <i className="bi bi-stars mr-2"></i>
            {t('home.hero.badge')}
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            {t('home.hero.title')}
            <span className="text-brand-primary">{t('home.hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 text-lg border-2 border-brand-primary font-semibold" onClick={() => window.location.href = '/auth/signup'}>
              <i className="bi bi-rocket-takeoff mr-2"></i>
              {t('home.hero.startTrial')}
            </Button>
            <Link to={createPageUrl("Demo")}>
              <Button size="lg" variant="outline" className="border-[var(--border-color)] border-2 px-8 py-4 text-lg font-semibold">
                <i className="bi bi-play-circle mr-2"></i>
                {t('home.hero.watchDemo')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-globe text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>{t('home.features.urlToListing.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  {t('home.features.urlToListing.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-magic text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>{t('home.features.aiCopywriting.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  {t('home.features.aiCopywriting.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-search text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>{t('home.features.seoOptimization.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  {t('home.features.seoOptimization.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-images text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>{t('home.features.imageManagement.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  {t('home.features.imageManagement.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-clock text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>{t('home.features.optimalTiming.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  {t('home.features.optimalTiming.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-code-slash text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>{t('home.features.readyHtml.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  {t('home.features.readyHtml.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-[var(--background-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t('home.pricing.title')}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            {t('home.pricing.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="border-[var(--border-color)] bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{t('home.pricing.free')}</CardTitle>
                <div className="text-3xl font-bold text-[var(--text-primary)]">$0</div>
                <p className="text-sm text-[var(--text-secondary)]">{t('home.pricing.freeDescription')}</p>
              </CardHeader>
            </Card>
            <Card className="border-[var(--border-color)] bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{t('home.pricing.basic')}</CardTitle>
                <div className="text-3xl font-bold text-[var(--text-primary)]">$9</div>
                <p className="text-sm text-[var(--text-secondary)]">{t('home.pricing.basicDescription')}</p>
              </CardHeader>
            </Card>
            <Card className="border-[var(--border-color)] bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{t('home.pricing.standard')}</CardTitle>
                <div className="text-3xl font-bold text-[var(--text-primary)]">$19</div>
                <p className="text-sm text-[var(--text-secondary)]">{t('home.pricing.standardDescription')}</p>
              </CardHeader>
            </Card>
            <Card className="border-brand-primary bg-brand-primary/5 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-brand-primary text-white">{t('home.pricing.mostPopular')}</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{t('home.pricing.premium')}</CardTitle>
                <div className="text-3xl font-bold text-brand-primary">$49</div>
                <p className="text-sm text-[var(--text-secondary)]">{t('home.pricing.premiumDescription')}</p>
              </CardHeader>
            </Card>
          </div>

          <Link to={createPageUrl("Pricing")}>
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-hover text-white border-2 border-brand-primary font-semibold">
              {t('home.pricing.viewAllPlans')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--border-color)] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <i className="bi bi-stars text-white"></i>
                </div>
                <span className="font-bold text-[var(--text-primary)]">eBay DescriptionAI</span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                {t('home.footer.tagline')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">{t('home.footer.product')}</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to={createPageUrl("Features")}>{t('home.footer.features')}</Link></li>
                <li><Link to={createPageUrl("Pricing")}>{t('nav.pricing')}</Link></li>
                <li><Link to={createPageUrl("Demo")}>{t('home.footer.demo')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">{t('home.footer.support')}</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to={createPageUrl("FAQ")}>{t('nav.about')}</Link></li>
                <li><Link to={createPageUrl("Help")}>{t('home.footer.helpCenter')}</Link></li>
                <li><Link to={createPageUrl("Contact")}>{t('home.footer.contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">{t('home.footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to={createPageUrl("Privacy")}>{t('home.footer.privacyPolicy')}</Link></li>
                <li><Link to={createPageUrl("Terms")}>{t('home.footer.termsOfService')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border-color)] mt-8 pt-8 text-center text-sm text-[var(--text-secondary)]">
            {t('home.footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
