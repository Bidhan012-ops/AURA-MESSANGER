"use client";
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function AccountPage() {
    const { data: session } = useSession();
    const router = useRouter()
    
    if (!session || !session.user) return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] bg-[#050505] text-[#e0e3e5]">
            <p className="font-['Plus_Jakarta_Sans'] text-gray-400">Please login to view this page.</p>
            <Link href="/" className="px-6 py-2 bg-[#4edea3] text-[#002113] rounded-lg font-['Plus_Jakarta_Sans'] font-semibold hover:bg-[#4edea3]/90 transition-colors">
                Back to Home
            </Link>
        </div>
    );

    const { username, email } = session.user as User;
    const handleonclick = () => {
        signOut();
        router.push("/");
    }
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body {
            background-color: #050505;
            color: #e0e3e5;
            font-family: 'Plus Jakarta Sans', sans-serif;
            overflow-x: hidden;
        }
        
        .glass-panel {
            background-color: rgba(16, 20, 21, 0.4);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-trough {
            background-color: rgba(36, 42, 44, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary {
            background-color: rgba(255, 255, 255, 0.05);
            color: #e0e3e5;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .btn-danger {
            background-color: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
            transition: all 0.3s ease;
        }

        .btn-danger:hover {
            background-color: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.4);
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
        }
        `
            }} />
            <div className="bg-[#050505] text-[#e0e3e5] antialiased min-h-screen flex flex-col md:flex-row font-['Plus_Jakarta_Sans'] selection:bg-[#4edea3]/20 selection:text-white relative">

                {/* Decorative background overlay */}
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(78,222,163,0.05)_0%,transparent_50%)] pointer-events-none"></div>

                {/* Desktop Sidebar */}
                <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/5 z-50">
                    <div className="p-6 flex items-center gap-3 border-b border-white/5">
                        <div className="w-10 h-10 rounded-lg bg-[#4edea3]/10 flex items-center justify-center border border-[#4edea3]/20">
                            <span className="material-symbols-outlined text-[#4edea3]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
                        </div>
                        <div>
                            <h1 className="font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-bold text-white tracking-tight">Aura Messenger</h1>
                            <p className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-500 uppercase tracking-widest">Pro Node</p>
                        </div>
                    </div>
                    <nav className="flex-1 p-4 flex flex-col gap-2">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent">
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                            <span className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Dashboard</span>
                        </Link>
                        <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#4edea3]/10 text-[#4edea3] transition-colors border border-[#4edea3]/20">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                            <span className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Account</span>
                        </Link>
                    </nav>
                    <div className="p-6 mt-auto">
                        <button onClick={handleonclick} className="w-full btn-secondary font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content Canvas */}
                <main className="flex-1 md:ml-64 relative z-10 pt-4 md:pt-0 overflow-y-auto h-screen scroll-smooth pb-24 md:pb-0">
                    <div className="max-w-4xl mx-auto px-5 md:px-10 pt-8 pb-24 md:py-[80px]">
                        {/* Page Header */}
                        <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
                            <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-bold text-white mb-2 tracking-tight">Security Profile</h1>
                            <p className="font-['Plus_Jakarta_Sans'] text-[18px] leading-[28px] font-normal text-gray-400 max-w-2xl">Manage your encrypted identity protocols and authentication nodes.</p>
                        </div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                            {/* Main Account Settings Card */}
                            <div className="md:col-span-8 glass-panel rounded-xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-[#4edea3]">fingerprint</span>
                                </div>
                                <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] leading-[32px] font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#4edea3]">badge</span>
                                    Identity Matrix
                                </h2>

                                <div className="space-y-6 relative z-10">
                                    {/* Username Field */}
                                    <div className="space-y-2">
                                        <label className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-gray-400 block uppercase text-xs">USERNAME</label>
                                        <div className="flex items-center input-trough rounded-lg p-3">
                                            <span className="material-symbols-outlined text-gray-400 mr-3">alternate_email</span>
                                            <input
                                                className="bg-transparent border-none outline-none text-white font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal w-full focus:ring-0"
                                                readOnly
                                                type="text"
                                                value={username || ""}
                                            />
                                            <span className="ml-auto text-[#4edea3] font-['Plus_Jakarta_Sans'] text-[10px] leading-[16px] font-medium uppercase border border-[#4edea3]/30 px-2 py-1 rounded bg-[#4edea3]/10">Verified</span>
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-gray-400 block uppercase text-xs">EMAIL</label>
                                        <div className="flex items-center input-trough rounded-lg p-3">
                                            <span className="material-symbols-outlined text-gray-400 mr-3">mail</span>
                                            <input
                                                className="bg-transparent border-none outline-none text-white font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal w-full focus:ring-0"
                                                readOnly
                                                type="email"
                                                value={email || ""}
                                            />
                                        </div>
                                    </div>

                                    {/* Status Indicators */}
                                    <div className="pt-4 border-t border-white/5 flex gap-4">
                                        <div className="flex items-center gap-2 bg-[#4edea3]/10 rounded-full px-3 py-1 border border-[#4edea3]/20">
                                            <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]"></span>
                                            <span className="font-['Plus_Jakarta_Sans'] text-[10px] leading-[16px] font-medium text-[#4edea3] uppercase tracking-wider">Node Active</span>
                                        </div>
                                        <div className="flex items-center gap-2 glass-panel rounded-full px-3 py-1">
                                            <span className="material-symbols-outlined text-gray-400 text-sm">verified_user</span>
                                            <span className="font-['Plus_Jakarta_Sans'] text-[10px] leading-[16px] font-medium text-gray-400 uppercase tracking-wider">E2E Secured</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Actions Column */}
                            <div className="md:col-span-4 flex flex-col gap-6">

                                {/* Security Score Widget */}
                                <div className="glass-panel rounded-xl p-6 flex-1 flex flex-col justify-center items-center text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                    <div className="w-24 h-24 rounded-full border-4 border-[#1a1c1e] relative flex items-center justify-center mb-4">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle className="transition-all duration-1000" cx="48" cy="48" fill="none" r="44" stroke="#4edea3" strokeDasharray="276" strokeDashoffset="27" strokeWidth="4"></circle>
                                        </svg>
                                        <span className="font-['Plus_Jakarta_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] text-white font-bold">90<span className="text-sm text-gray-400">%</span></span>
                                    </div>
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-white mb-1">Security Rating</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium text-gray-400">Optimal Configuration</p>
                                </div>

                                {/* Danger Zone */}
                                <div className="glass-panel rounded-xl p-6 border-red-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-red-500 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">warning</span>
                                        Session Control
                                    </h3>
                                    <button onClick={() => signOut()} className="w-full py-3 rounded-lg btn-danger font-['Plus_Jakarta_Sans'] text-[14px] leading-[20px] tracking-[0.05em] font-bold flex items-center justify-center gap-2 group">
                                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
                                        Logout
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                {/* Bottom Navigation (Mobile Only) */}
                <nav className="md:hidden glass-panel fixed bottom-0 left-0 w-full h-16 flex justify-around items-center z-50 border-t border-white/10 shadow-none pb-safe">
                    <Link href="/dashboard" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#4edea3] active:scale-90 transition-transform p-2">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium mt-1">Dashboard</span>
                    </Link>
                    <Link href="/account" className="flex flex-col items-center justify-center text-[#4edea3] active:scale-90 transition-transform p-2">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px] font-medium mt-1">Account</span>
                    </Link>
                </nav>
            </div>
        </>
    );
}
