import Link from 'next/link';
import React from 'react';

export default function ContactSupportPage() {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 32px 32px;
        }
        .glass-panel {
            background: rgba(16, 20, 21, 0.4);
            backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .emerald-glow {
            text-shadow: 0 0 10px rgba(78,222,163,0.3);
        }
        `
            }} />
            <div className="bg-[#050505] text-[#e0e3e5] font-['Plus_Jakarta_Sans'] min-h-screen flex flex-col relative overflow-x-hidden antialiased">

                {/* Atmospheric Background */}
                <div className="fixed inset-0 z-[-1] bg-[#050505]">
                    <div className="absolute inset-0 bg-grid-pattern"></div>
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4edea3]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
                </div>

                {/* Top Navigation */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-[#0a0d0e]/80 backdrop-blur-[32px] border-b border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-4">
                        {/* Minimal Logo (Shield Icon) */}
                        <div className="w-8 h-8 rounded-md bg-[#4edea3]/10 flex items-center justify-center border border-[#4edea3]/20">
                            <span className="material-symbols-outlined text-[#4edea3] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                        </div>
                        <span className="font-['Plus_Jakarta_Sans'] text-[18px] md:text-[20px] font-bold text-[#4edea3] tracking-tight">Aura Messenger</span>

                        <Link href="/" className="font-['Plus_Jakarta_Sans'] text-[14px] text-gray-400 hover:text-[#4edea3] transition-colors duration-300 ml-4 opacity-80 hover:opacity-100">
                            Home
                        </Link>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-grow pt-[100px] pb-16 px-5 md:px-10 flex flex-col items-center">

                    {/* Hero Section */}
                    <section className="w-full max-w-4xl text-center mb-16 relative mt-10">
                        <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[56px] leading-[40px] md:leading-[64px] font-bold text-white mb-6">Aura Support Terminal</h1>
                        <p className="font-['Plus_Jakarta_Sans'] text-[18px] leading-[28px] text-gray-400 max-w-2xl mx-auto">
                            Need assistance with your encrypted communications? Contact our support team or learn how Aura Messenger works below.
                        </p>
                    </section>

                    {/* Get in Touch Section */}
                    <section className="w-full max-w-2xl mb-24">
                        <div className="glass-panel rounded-xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#4edea3]/20 group-hover:bg-[#4edea3] transition-colors duration-500"></div>
                            <span className="material-symbols-outlined text-[48px] text-[#4edea3] mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                            <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] md:text-[32px] font-bold text-white mb-4">Get in Touch</h2>
                            <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-gray-400 mb-8 max-w-md">
                                For inquiries, assistance, or critical communications, reach out to us directly.
                            </p>
                            <a
                                href="mailto:berabidhan058@gmail.com"
                                className="text-[#4edea3] font-['Plus_Jakarta_Sans'] text-[18px] md:text-[20px] font-semibold hover:underline decoration-[#4edea3]/50 underline-offset-8 emerald-glow px-8 py-4 rounded-lg border border-[#4edea3]/30 hover:border-[#4edea3]/60 transition-all duration-300 bg-[#4edea3]/5 cursor-pointer"
                            >
                                berabidhan058@gmail.com
                            </a>
                        </div>
                    </section>

                    {/* How Aura Messenger Works Section */}
                    <section className="w-full max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="font-['Plus_Jakarta_Sans'] text-[28px] md:text-[40px] font-bold text-white mb-4">How Aura Messenger Works</h2>
                            <p className="font-['Plus_Jakarta_Sans'] text-[16px] text-gray-400 max-w-2xl mx-auto">
                                A seamless flow for secure, anonymous communication.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Step 1 */}
                            <div className="glass-panel rounded-xl p-6 relative group border border-white/10 hover:border-[#4edea3]/50 transition-colors duration-300">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#050505] border border-[#4edea3] text-[#4edea3] rounded-full flex items-center justify-center font-['Plus_Jakarta_Sans'] text-[20px] font-bold shadow-[0_0_15px_rgba(78,222,163,0.3)] z-10">1</div>
                                <div className="flex flex-col items-center text-center mt-4">
                                    <div className="w-16 h-16 bg-[#4edea3]/10 rounded-full flex items-center justify-center mb-4 text-[#4edea3]">
                                        <span className="material-symbols-outlined text-[32px]">link</span>
                                    </div>
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-white mb-2">Generate Link</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-gray-400 leading-[20px]">Create your unique, encrypted transmission link.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="glass-panel rounded-xl p-6 relative group border border-white/10 hover:border-[#4edea3]/50 transition-colors duration-300">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#050505] border border-[#4edea3] text-[#4edea3] rounded-full flex items-center justify-center font-['Plus_Jakarta_Sans'] text-[20px] font-bold shadow-[0_0_15px_rgba(78,222,163,0.3)] z-10">2</div>
                                <div className="flex flex-col items-center text-center mt-4">
                                    <div className="w-16 h-16 bg-[#4edea3]/10 rounded-full flex items-center justify-center mb-4 text-[#4edea3]">
                                        <span className="material-symbols-outlined text-[32px]">share</span>
                                    </div>
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-white mb-2">Share Network</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-gray-400 leading-[20px]">Distribute your secure link to your intended audience.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="glass-panel rounded-xl p-6 relative group border border-white/10 hover:border-[#4edea3]/50 transition-colors duration-300">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#050505] border border-[#4edea3] text-[#4edea3] rounded-full flex items-center justify-center font-['Plus_Jakarta_Sans'] text-[20px] font-bold shadow-[0_0_15px_rgba(78,222,163,0.3)] z-10">3</div>
                                <div className="flex flex-col items-center text-center mt-4">
                                    <div className="w-16 h-16 bg-[#4edea3]/10 rounded-full flex items-center justify-center mb-4 text-[#4edea3]">
                                        <span className="material-symbols-outlined text-[32px]">mark_email_unread</span>
                                    </div>
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-white mb-2">Receive Feedback</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-gray-400 leading-[20px]">Get encrypted, anonymous messages securely.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="glass-panel rounded-xl p-6 relative group border border-white/10 hover:border-[#4edea3]/50 transition-colors duration-300">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#050505] border border-[#4edea3] text-[#4edea3] rounded-full flex items-center justify-center font-['Plus_Jakarta_Sans'] text-[20px] font-bold shadow-[0_0_15px_rgba(78,222,163,0.3)] z-10">4</div>
                                <div className="flex flex-col items-center text-center mt-4">
                                    <div className="w-16 h-16 bg-[#4edea3]/10 rounded-full flex items-center justify-center mb-4 text-[#4edea3]">
                                        <span className="material-symbols-outlined text-[32px]">dashboard</span>
                                    </div>
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-white mb-2">Manage Transmissions</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-gray-400 leading-[20px]">Organize everything in your secure Command Center.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 py-8 bg-[#020202] border-t border-white/5 relative z-10">
                    <div className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#4edea3] flex items-center gap-2 opacity-50">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                        <span>Aura</span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-gray-500">
                        © 2024 Aura Messenger. Industrial Grade Encryption.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="font-['Plus_Jakarta_Sans'] text-[12px] text-gray-500 hover:text-[#4edea3] transition-colors">Privacy Protocol</Link>
                        <Link href="#" className="font-['Plus_Jakarta_Sans'] text-[12px] text-gray-500 hover:text-[#4edea3] transition-colors">Terms of Transmission</Link>
                        <Link href="#" className="font-['Plus_Jakarta_Sans'] text-[12px] text-gray-500 hover:text-[#4edea3] transition-colors">Global Nodes</Link>
                    </div>
                </footer>

            </div>
        </>
    );
}
