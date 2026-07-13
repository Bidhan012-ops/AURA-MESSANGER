import React from 'react';

export default function Dashboard() {
  return (
    <div className="w-full h-full bg-background dark:bg-background text-foreground">
      {/* Dashboard content extracted from Stitch */}

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-[64px] dark:bg-surface/30 border-b bg-surface/10 border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <div className="flex justify-between items-center px-container-padding-desktop py-4 w-full max-w-screen-2xl mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-4">
            {/* Minimal Logo (Shield Icon) */}
            <div className="w-8 h-8 rounded-md bg-[#4edea3]/10 flex items-center justify-center border border-[#4edea3]/20">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-[18px] md:text-[20px] font-bold text-[#4edea3] tracking-tight">Aura Messenger</span>
          </div>
          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex gap-gutter items-center">
            <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#">Features</a>
            <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#">How It Works</a>
            <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#">Security</a>
            <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#">FAQ</a>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block glass-button font-label-md text-label-md px-6 py-2 rounded-DEFAULT active:scale-95 transition-transform">Get Started</button>
            <div className="flex gap-2 text-primary dark:text-primary">
              <span className="material-symbols-outlined hover:text-primary transition-colors duration-300 cursor-pointer active:scale-95" data-icon="lock">lock</span>
              <span className="material-symbols-outlined md:hidden hover:text-primary transition-colors duration-300 cursor-pointer active:scale-95" data-icon="menu">menu</span>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center px-container-padding-mobile md:px-container-padding-desktop text-center relative overflow-hidden">
          {/* Subtle background accent */}
          <div className="z-10 max-w-4xl flex flex-col items-center gap-stack-lg">
            <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface">
              Elevate Connection through <br /><span className="text-primary opacity-90">Architected Honesty</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Industrial-grade secure messaging designed for clarity and absolute privacy. No tracking, no noise. Just seamless communication.
            </p>
            <button className="mt-4 glass-button font-label-md text-label-md px-8 py-4 rounded-DEFAULT flex items-center gap-2">
              Start Secure Session
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>
        {/* How It Works (Bento Grid Style) */}
        <section className="py-stack-lg px-container-padding-mobile md:px-container-padding-desktop max-w-screen-2xl mx-auto">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-lg text-center">Protocol Operation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-unit">
            {/* Card 1 */}
            <div className="glass-panel rounded-lg p-stack-md flex flex-col gap-4 relative overflow-hidden group hover:border-primary/30 transition-colors bg-surface/10 border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
              <div className="w-10 h-10 rounded-full bg-surface-container/50 flex items-center justify-center border border-primary/20 backdrop-blur-md">
                <span className="material-symbols-outlined text-primary/80">link</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-2">1. Generate Link</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Create an ephemeral, zero-knowledge link instantly. No accounts required.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="glass-panel rounded-lg p-stack-md flex flex-col gap-4 relative overflow-hidden group hover:border-primary/30 transition-colors bg-surface/10 border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
              <div className="w-10 h-10 rounded-full bg-surface-container/50 flex items-center justify-center border border-primary/20 backdrop-blur-md">
                <span className="material-symbols-outlined text-primary/80">share</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-2">2. Share Anywhere</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Distribute your secure anchor across any platform or network without risk.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="glass-panel rounded-lg p-stack-md flex flex-col gap-4 relative overflow-hidden group hover:border-primary/30 transition-colors bg-surface/10 border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
              <div className="w-10 h-10 rounded-full bg-surface-container/50 flex items-center justify-center border border-primary/20 backdrop-blur-md">
                <span className="material-symbols-outlined text-primary/80">inbox</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-2">3. Receive &amp; Manage</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Review incoming encrypted messages in a sandboxed environment.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Feature & Control Section (Asymmetric Grid) */}
        <section className="py-stack-lg px-container-padding-mobile md:px-container-padding-desktop max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-unit">
            {/* Intelligent Suggestions (Wider) */}
            <div className="md:col-span-7 glass-panel rounded-lg p-stack-lg flex flex-col justify-between bg-surface/10 border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="mb-stack-md">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Intelligent Suggestions</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Context-aware drafting powered by local-only AI models.</p>
              </div>
              {/* Mock UI Panel */}
              <div className="border rounded-DEFAULT p-4 mt-auto bg-surface/10 backdrop-blur-[64px] border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary/80 text-[16px]">person</span>
                    </div>
                    <div className="bg-surface/50 backdrop-blur-md p-3 rounded-r-lg rounded-bl-lg border border-white/5 text-sm shadow-inner">
                      Can we review the Q3 architecture docs tomorrow?
                    </div>
                  </div>
                  {/* AI Suggestions Area */}
                  <div className="pl-11 flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-surface/40 backdrop-blur-md border border-primary/20 rounded-full text-xs text-primary/80 cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors flex items-center gap-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <span className="material-symbols-outlined text-[12px]">auto_awesome</span> Sure, what time works?
                    </span>
                    <span className="px-3 py-1 bg-surface/40 backdrop-blur-md border border-primary/20 rounded-full text-xs text-primary/80 cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors flex items-center gap-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <span className="material-symbols-outlined text-[12px]">auto_awesome</span> I&apos;ll need more time to prepare.
                    </span>
                  </div>
                  {/* Input Box */}
                  <div className="input-trough rounded-DEFAULT p-2 flex items-center mt-4">
                    <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full p-2 placeholder-on-surface-variant/50" placeholder="Draft message..." type="text" />
                    <button className="w-8 h-8 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-DEFAULT text-primary/80 hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Absolute Privacy Controls (Narrower) */}
            <div className="md:col-span-5 glass-panel rounded-lg p-stack-lg flex flex-col bg-surface/10 border-primary/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="mb-auto">
                <div className="w-10 h-10 rounded-full bg-error-container/10 border border-error/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-error/80">shield_lock</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Absolute Control</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Gatekeep your attention. You define who connects.</p>
              </div>
              {/* Toggle UI */}
              <div className="mt-stack-lg p-4 rounded-DEFAULT border flex items-center justify-between bg-surface/10 backdrop-blur-[64px] border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">Accepting Messages</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Status: Active</span>
                </div>
                {/* Custom CSS Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input checked className="sr-only peer" type="checkbox" />
                  <div className="w-14 h-7 bg-surface-container-high/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary/20 peer-checked:border peer-checked:border-primary/50 shadow-[0_0_10px_rgba(16,185,129,0.1)] peer-checked:shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-stack-lg bg-surface/30 backdrop-blur-xl dark:bg-surface/30 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-container-padding-desktop gap-gutter w-full max-w-screen-2xl mx-auto">
          {/* Brand Logo */}
          <div className="text-headline-sm font-headline-sm text-primary opacity-80">
            Aura Messenger
          </div>
          {/* Copyright */}
          <div className="font-label-sm text-label-sm font-body-md text-body-md text-outline dark:text-outline order-3 md:order-2 text-center">
            © 2024 Aura Messenger. Encrypted &amp; Anonymous.
          </div>
          {/* Links */}
          <div className="flex gap-4 order-2 md:order-3 flex-wrap justify-center">
            <a className="font-label-sm text-label-sm text-outline dark:text-outline hover:text-primary-fixed-dim transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-outline dark:text-outline hover:text-primary-fixed-dim transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-outline dark:text-outline hover:text-primary-fixed-dim transition-colors" href="#">Security Whitepaper</a>
            <a className="font-label-sm text-label-sm text-outline dark:text-outline hover:text-primary-fixed-dim transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
