import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ShieldCheck, Zap, Printer } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* 1:1 Attention Ratio - No Nav/Footer */}
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        
        {/* Hero Section - The Problem/Solution Hook */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
            TikTok Shop PDF <span className="text-blue-600">→</span> 4x6 Thermal
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stop fighting with A4 labels. Transform your TikTok Shop PDFs into perfect 4x6 thermal labels in one click. Free, secure, and instant.
          </p>
        </section>

        {/* Radical Focus - The "Digital Toll Booth" Drop Zone */}
        <section>
          <Card className="border-2 border-dashed border-slate-300 bg-white hover:border-blue-500 transition-colors cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="p-4 bg-blue-50 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="w-12 h-12 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-slate-700">Drop your TikTok PDF here</p>
                <p className="text-sm text-slate-500">or click to browse files</p>
              </div>
              <Button size="lg" className="mt-4 px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200">
                Transform My Label
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Trust Signals & Bento-lite Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            <h3 className="font-bold text-lg">Privacy First</h3>
            <p className="text-sm text-slate-600">Processing happens entirely in your browser. Your labels never touch our servers.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <Zap className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">Instant Crop</h3>
            <p className="text-sm text-slate-600">Automatically detects, crops, and rotates for 4x6 thermal printers. No manual tools needed.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <Printer className="w-8 h-8 text-blue-500" />
            <h3 className="font-bold text-lg">Batch Support</h3>
            <p className="text-sm text-slate-600">Drop multiple PDFs at once. Get a single zip or individual 4x6 files in seconds.</p>
          </div>
        </section>

        {/* Directional Cue: Ad Match/Trust */}
        <footer className="pt-10 text-center border-t border-slate-200">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Built for the 2026 USPS Label Mandate
          </p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
