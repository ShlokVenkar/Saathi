'use client';

import React, { useState } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft,
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  ListChecks, 
  HelpCircle, 
  Volume2, 
  Clock, 
  FileUp, 
  ArrowRight
} from 'lucide-react';
import { aiService, SAMPLE_DOCUMENTS } from '@/services/aiService';
import { DocumentAnalysisResult } from '@/types';

interface DocumentExplainerProps {
  onBack?: () => void;
}

export const DocumentExplainer: React.FC<DocumentExplainerProps> = ({ onBack }) => {
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
    const textToRead = `${tSenior('explainer.whatIsIt')}: ${analysis.documentType}. ${tSenior('explainer.whatDoesItMean')}: ${analysis.summary}. ${tSenior('explainer.whatShouldIDo')}: ${analysis.actionRequired.join('. ')}. ${tSenior('explainer.byWhen')}: ${analysis.importantDates.join('. ')}`;
    readAloud(textToRead, seniorLang);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-28">
      {/* Top Bar with Back Button & Listen */}
      <div className="flex items-center justify-between gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-lg sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>{tSenior('common.back')}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            const text = `${tSenior('explainer.title')}. ${tSenior('explainer.subtitle')}`;
            readAloud(text);
          }}
          className="p-3 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-2xl font-black text-sm flex items-center gap-1.5 active:scale-95 transition-all ml-auto"
        >
          <Volume2 className="w-5 h-5 text-purple-800" />
          <span>{tSenior('common.readAloud')}</span>
        </button>
      </div>

      {/* Screen Header */}
      <header className="bg-white rounded-3xl p-6 shadow-md border-3 border-purple-200 space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {tSenior('explainer.title')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          {tSenior('explainer.subtitle')}
        </p>
      </header>

      {/* Try Sample Documents Selector */}
      <section className="space-y-3">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
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
                className={`p-4 rounded-2xl border-3 text-left transition-all active:scale-98 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-100 text-purple-950 shadow-md font-bold'
                    : 'border-slate-300 bg-white hover:border-purple-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-base font-black block">
                    {tSenior(doc.nameKey)}
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-800 flex items-center gap-1">
                  कागदपत्र निवडा <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Input / Upload Area */}
      <section className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
            <FileUp className="w-6 h-6 text-purple-600" />
            <span>कागदपत्रातील मजकूर</span>
          </h3>
        </div>

        <textarea
          rows={5}
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="इथे कागदपत्रातील मजकूर लिहा किंवा वरील नमुना निवडा..."
          className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:border-purple-600 focus:outline-none font-mono text-sm text-slate-900 leading-relaxed bg-slate-50"
        />

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isLoading || !customText.trim()}
          className="w-full p-5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-3xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-98 border-2 border-purple-500"
        >
          {isLoading ? (
            <>
              <Clock className="w-7 h-7 animate-spin" />
              <span>समजावून सांगत आहे...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-7 h-7 text-amber-300" />
              <span>{tSenior('explainer.analyzeButton')}</span>
            </>
          )}
        </button>
      </section>

      {/* SIMPLIFIED EXPLANATION RESULTS (4 Clear Questions) */}
      {analysis && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-purple-400 space-y-6 animate-scale-up">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-sm font-black uppercase text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                {analysis.documentType}
              </span>
            </div>

            <button
              type="button"
              onClick={handleReadAloudSummary}
              className="p-3 bg-purple-700 text-white rounded-2xl flex items-center gap-2 font-black text-base active:scale-95 transition-all shadow-md"
            >
              <Volume2 className="w-6 h-6" />
              <span>{tSenior('common.readAloud')}</span>
            </button>
          </div>

          {/* 1. हे काय आहे? (What is it?) */}
          <div className="p-5 bg-blue-50 border-3 border-blue-200 rounded-2xl space-y-1">
            <h3 className="font-black text-blue-950 text-xl flex items-center gap-2">
              <span>📋</span> {tSenior('explainer.whatIsIt')}
            </h3>
            <p className="text-lg font-bold text-slate-800">
              {analysis.documentType}
            </p>
          </div>

          {/* 2. याचा अर्थ काय? (What does it mean?) */}
          <div className="p-5 bg-purple-50 border-3 border-purple-200 rounded-2xl space-y-1">
            <h3 className="font-black text-purple-950 text-xl flex items-center gap-2">
              <span>💡</span> {tSenior('explainer.whatDoesItMean')}
            </h3>
            <p className="text-lg font-bold text-purple-950 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* 3. मला काय करायचे आहे? (What should I do?) */}
          <div className="p-5 bg-emerald-50 border-3 border-emerald-300 rounded-2xl space-y-2">
            <h3 className="font-black text-emerald-950 text-xl flex items-center gap-2">
              <span>✅</span> {tSenior('explainer.whatShouldIDo')}
            </h3>
            <ul className="space-y-2">
              {analysis.actionRequired.map((act, idx) => (
                <li key={idx} className="text-lg text-emerald-950 font-bold flex items-start gap-2">
                  <span className="text-emerald-700 font-black">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. कधीपर्यंत करायचे आहे? (By when?) */}
          <div className="p-5 bg-amber-50 border-3 border-amber-300 rounded-2xl space-y-2">
            <h3 className="font-black text-amber-950 text-xl flex items-center gap-2">
              <span>📅</span> {tSenior('explainer.byWhen')}
            </h3>
            <ul className="space-y-2">
              {analysis.importantDates.map((dateItem, idx) => (
                <li key={idx} className="text-lg text-amber-950 font-bold flex items-start gap-2">
                  <span className="text-amber-700 font-black">•</span>
                  <span>{dateItem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings */}
          <div className="p-5 bg-rose-50 border-3 border-rose-300 rounded-2xl space-y-2">
            <h3 className="font-black text-rose-950 text-xl flex items-center gap-2">
              <span>⚠️</span> {tSenior('explainer.warnings')}
            </h3>
            <ul className="space-y-2">
              {analysis.warnings.map((warn, idx) => (
                <li key={idx} className="text-base sm:text-lg text-rose-950 font-bold flex items-start gap-2">
                  <span className="text-rose-700 font-black">•</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};
