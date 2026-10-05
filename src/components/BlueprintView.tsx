import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Layers, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { AppMode, CustomerPage, CrmTab } from '../types';

interface BlueprintViewProps {
  onNavigateWebsite: (page: CustomerPage) => void;
  onNavigateCrm: (tab: CrmTab) => void;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({
  onNavigateWebsite,
  onNavigateCrm,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* PAGE 1 REPLICA + INTERACTIVE LAUNCHER */}
      <div className="bg-[#13293D] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border-b-8 border-emerald-500">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1C3A54] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-300">
            CHAIR SERVICE BUSINESS — WEBSITE &amp; SERVICE MANAGEMENT
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            SERVICE-FIRST WEBSITE &amp; SERVICE MANAGEMENT
          </h1>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">
            What we have built for you — Interactive Live Spec
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-1 text-slate-200 text-sm sm:text-base">
            Focused on bulk chair repairing, old chair cleaning, refurbishment and repeat service business. Click any deliverable below to test it live!
          </div>
        </div>
      </div>

      {/* WHAT YOU GET: CUSTOMER WEBSITE VS TEAM SYSTEM */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-emerald-600 pb-3">
          <div className="w-2 h-8 bg-emerald-600 rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            What You Get (Click Any Feature to Launch It Live)
          </h2>
        </div>

        {/* Customer Facing 6 Cards */}
        <div>
          <div className="bg-[#F2F9F6] p-4 rounded-xl mb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">
              What Customers See on the Website
            </h3>
            <p className="text-xs text-slate-500">A website that brings in the right bulk enquiries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Homepage that leads with repair & cleaning', page: 'home' as CustomerPage },
              { title: 'Quote request with chair photos and quantity', page: 'quote' as CustomerPage },
              { title: 'Chair repair & old chair cleaning pages', page: 'repair' as CustomerPage },
              { title: 'Maintenance contract (AMC) page', page: 'amc' as CustomerPage },
              { title: 'Our completed work with before/after photos', page: 'work' as CustomerPage },
              { title: 'WhatsApp, call and callback buttons', page: 'home' as CustomerPage },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => onNavigateWebsite(item.page)}
                className="text-left bg-[#F2F9F6] hover:bg-emerald-100/70 border-t-4 border-emerald-600 p-5 rounded-xl shadow-sm transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-slate-900 text-sm pr-3">{item.title}</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-700 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Team Facing 6 Cards */}
        <div>
          <div className="bg-[#F2F9F6] p-4 rounded-xl mb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">
              What Your Team Can Do
            </h3>
            <p className="text-xs text-slate-500">Everything needed to turn enquiries into completed jobs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Track every enquiry and follow-up', tab: 'enquiries' as CrmTab },
              { title: 'Record site inspections', tab: 'inspections' as CrmTab },
              { title: 'Send professional quotations', tab: 'quotations' as CrmTab },
              { title: 'Schedule jobs and assign technicians', tab: 'jobs' as CrmTab },
              { title: 'Capture before/after photos', tab: 'photos' as CrmTab },
              { title: 'Track invoices and payments', tab: 'invoices' as CrmTab },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => onNavigateCrm(item.tab)}
                className="text-left bg-[#F2F9F6] hover:bg-slate-200/70 border-t-4 border-[#13293D] p-5 rounded-xl shadow-sm transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-slate-900 text-sm pr-3">{item.title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#13293D] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP LAUNCH PLAN FROM PAGE 2 */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-8 bg-emerald-600 rounded-full" />
          <h2 className="text-2xl font-extrabold text-slate-900">Step-by-Step Launch Plan</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '1 Get more enquiries',
              tag: 'Launch First',
              tagColor: 'text-amber-600',
              borderColor: 'border-emerald-600',
              desc: 'Service-first homepage, repair/cleaning pages, WhatsApp & photo quote form live.',
            },
            {
              step: '2 Run jobs smoothly',
              tag: 'High Value',
              tagColor: 'text-amber-500',
              borderColor: 'border-emerald-600',
              desc: 'Site inspection logging, formal PDF quotations, and controlled batch scheduling.',
            },
            {
              step: '3 Win repeat business',
              tag: 'Scale',
              tagColor: 'text-emerald-700',
              borderColor: 'border-emerald-600',
              desc: 'Before/after photo proof vault, invoice tracking & 6-month AMC follow-up reminders.',
            },
            {
              step: '4 Extra automation',
              tag: 'Optional',
              tagColor: 'text-slate-500',
              borderColor: 'border-[#13293D]',
              desc: 'Automated WhatsApp notifications, barcode asset scanning & executive analytics.',
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className={`bg-[#F2F9F6] border-t-4 ${p.borderColor} p-5 rounded-xl flex flex-col justify-between`}
            >
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1.5">{p.step}</h4>
                <p className="text-xs text-slate-600 mb-4">{p.desc}</p>
              </div>
              <span className={`text-xs font-extrabold uppercase ${p.tagColor}`}>{p.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 15-POINT FIRST RELEASE CHECKLIST */}
      <div className="bg-[#F2F9F6] border-t-4 border-emerald-600 rounded-2xl p-6 sm:p-8">
        <h3 className="text-2xl font-extrabold text-slate-900 mb-6">
          What the First Release Includes (All 15 Modules Active)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm font-semibold text-slate-800">
          {[
            { label: 'Homepage focused on service', action: () => onNavigateWebsite('home') },
            { label: 'Chair repair page', action: () => onNavigateWebsite('repair') },
            { label: 'Old chair cleaning page', action: () => onNavigateWebsite('cleaning') },
            { label: 'Bulk/corporate service page', action: () => onNavigateWebsite('amc') },
            { label: 'Products supplied page', action: () => onNavigateWebsite('products') },
            { label: 'Completed work and clients page', action: () => onNavigateWebsite('work') },
            { label: 'Quote form with chair quantity and photos', action: () => onNavigateWebsite('quote') },
            { label: 'WhatsApp, call and callback buttons', action: () => onNavigateWebsite('home') },
            { label: 'Enquiry tracking and follow-up', action: () => onNavigateCrm('enquiries') },
            { label: 'Site inspection record', action: () => onNavigateCrm('inspections') },
            { label: 'Professional quotation document', action: () => onNavigateCrm('quotations') },
            { label: 'Job scheduling and status', action: () => onNavigateCrm('jobs') },
            { label: 'Before/after photos', action: () => onNavigateCrm('photos') },
            { label: 'Basic invoice and payment status', action: () => onNavigateCrm('invoices') },
            { label: 'Basic business reports', action: () => onNavigateCrm('reports') },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="flex items-center gap-2.5 text-left p-2.5 rounded-xl hover:bg-white transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
