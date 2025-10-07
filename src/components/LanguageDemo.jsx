import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { languages } from '@/i18n';

export default function LanguageDemo() {
  const { t, i18n } = useTranslation();
  
  const demoLanguages = [
    'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi'
  ];
  
  const demoText = {
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    features: t('home.features.languages.title'),
    description: t('home.features.languages.description')
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🌐</span>
          Language Demo - {languages.find(l => l.code === i18n.language)?.nativeName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {demoLanguages.map(langCode => {
            const lang = languages.find(l => l.code === langCode);
            return (
              <Badge 
                key={langCode}
                variant={i18n.language === langCode ? "default" : "outline"}
                className="cursor-pointer justify-center"
                onClick={() => i18n.changeLanguage(langCode)}
              >
                {lang?.nativeName}
              </Badge>
            );
          })}
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold">{demoText.title}</h3>
          <p className="text-sm text-gray-600">{demoText.subtitle}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{demoText.features}</Badge>
            <span className="text-xs text-gray-500">{demoText.description}</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 border-t pt-2">
          Current Language: {i18n.language} | 
          Supported Languages: {languages.length} | 
          Direction: {i18n.dir()}
        </div>
      </CardContent>
    </Card>
  );
}