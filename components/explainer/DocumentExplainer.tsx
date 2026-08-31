'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  ListChecks, 
  HelpCircle, 
  Volume2, 
  Clock, 
  FileUp, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { aiService, SAMPLE_DOCUMENTS } from '@/services/aiService';
import { DocumentAnalysisResult } from '@/types';

export const DocumentExplainer: React.FC = () => {
  const { seniorLang, tSenior, readAloud } = useSaathi();

  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-rx-1');
  const [customText, setCustomText] = useState<string>(SAMPLE_DOCUMENTS[0].rawText);
  const [docTitle, setDocTitle] = useState<string>(SAMPLE_DOCUMENTS[0].defaultTitle);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysisResult | null>(null);

  const handleSelectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    const doc = SAMPLE_DOCUMENTS.find((d) => d.id === sampleId);
    if (doc) {
      setCustomText(doc.rawText);
      setDocTitle(doc.defaultTitle);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!customText.trim()) return;
    setIsLoading(true);
    try {
      const result = await aiService.analyzeDocument(customText, seniorLang, docTitle);
      setAnalysis(result);
    } catch (err) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadAloudSummary = () => {
    if (!analysis) return;
    const textToRead = `${analysis.documentType}. ${analysis.summary}. ${analysis.actionRequired.join('. ')}`;
    readAloud(textToRead, seniorLang);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Header */}
      <header className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider">
            AI Assistant
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {tSenior('explainer.title')}
        </h1>
        <p className="text-base text-slate-600 font-medium">
          {tSenior('explainer.subtitle')}
        </p>
      </header>

      {/* Try Sample Documents Selector */}
      <section className="space-y-3">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          {tSenior('explainer.sampleSelector')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_DOCUMENTS.map((doc) => {
            const isSelected = selectedSampleId === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleSelectSample(doc.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all active:scale-98 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-md font-bold'
                    : 'border-slate-200 bg-white hover:border-purple-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold block">
                    {tSenior(doc.nameKey)}
                  </span>
                </div>
                <span className="text-xs text-purple-700 font-semibold flex items-center gap-1">
                  Load & Analyze <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Input / Upload Area */}
      <section className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <FileUp className="w-5 h-5 text-purple-600" />
            <span>Document Content</span>
          </h3>
          <span className="text-xs text-slate-500">Supports text, PDF & prescription images</span>
        </div>

        <textarea
          rows={6}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Paste or write document text here..."
          className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:border-purple-600 focus:outline-none font-mono text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50"
        />

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isLoading || !customText.trim()}
          className="w-full p-4 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-2xl font-black text-lg sm:text-xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-98"
        >
          {isLoading ? (
            <>
              <Clock className="w-6 h-6 animate-spin" />
              <span>Analyzing Document in {seniorLang.toUpperCase()}...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-amber-300" />
              <span>{tSenior('explainer.analyzeButton')}</span>
            </>
          )}
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-slate-500 text-center">
          {tSenior('explainer.disclaimer')}
        </p>
      </section>

      {/* SIMPLIFIED AI EXPLANATION RESULTS */}
      {analysis && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-purple-500/50 space-y-6 animate-scale-up">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                {analysis.documentType}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {tSenior('explainer.sectionSummary')}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleReadAloudSummary}
              className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-2xl flex items-center gap-2 font-bold text-sm active:scale-95 transition-all self-start sm:self-auto shrink-0"
            >
              <Volume2 className="w-5 h-5 text-purple-700" />
              <span>{tSenior('common.readAloud')}</span>
            </button>
          </div>

          {/* Core Summary Card */}
          <div className="p-5 bg-purple-50/80 border-2 border-purple-200 rounded-2xl">
            <p className="text-lg sm:text-xl font-bold text-purple-950 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* 4 Structured Information Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Important Points */}
            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 text-blue-900">
                <ListChecks className="w-6 h-6 text-blue-600 shrink-0" />
                {tSenior('explainer.sectionKeyPoints')}
              </h3>
              <ul className="space-y-2">
                {analysis.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-base text-slate-700 font-medium flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Required */}
            <div className="p-5 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 space-y-3">
              <h3 className="font-black text-emerald-950 text-lg flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                {tSenior('explainer.sectionAction')}
              </h3>
              <ul className="space-y-2">
                {analysis.actionRequired.map((act, idx) => (
                  <li key={idx} className="text-base text-emerald-900 font-bold flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Dates */}
            <div className="p-5 bg-amber-50/80 rounded-2xl border-2 border-amber-200 space-y-3">
              <h3 className="font-black text-amber-950 text-lg flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-600 shrink-0" />
                {tSenior('explainer.sectionDates')}
              </h3>
              <ul className="space-y-2">
                {analysis.importantDates.map((dateItem, idx) => (
                  <li key={idx} className="text-base text-amber-900 font-bold flex items-start gap-2">
                    <span className="text-amber-600 font-bold">📅</span>
                    <span>{dateItem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            <div className="p-5 bg-rose-50/80 rounded-2xl border-2 border-rose-200 space-y-3">
              <h3 className="font-black text-rose-950 text-lg flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                {tSenior('explainer.sectionWarnings')}
              </h3>
              <ul className="space-y-2">
                {analysis.warnings.map((warn, idx) => (
                  <li key={idx} className="text-base text-rose-900 font-bold flex items-start gap-2">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
