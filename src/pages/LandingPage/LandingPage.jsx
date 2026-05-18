import React from "react";
import { Link } from "react-router";
import hero1 from "../../assets/hero1.png";

function LandingPage() {
  return (
    <div className="w-full bg-[#F7F5F2]">
      {/* Immersive Hero Section with Illustration as background cover */}
      <div 
        className="w-full min-h-[85vh] lg:min-h-[90vh] flex items-center relative overflow-hidden bg-cover md:bg-[length:auto_95%] lg:bg-[length:auto_100%] bg-no-repeat bg-[position:center_right_-16rem] md:bg-right pt-28 pb-16"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        {/* Soft gradient overlay for readability on small devices where image and text overlap */}
        <div className="absolute inset-0 bg-[#F7F5F2]/90 md:bg-transparent -z-0" />
        
        <div className="max-w-6xl mx-auto w-full px-6 pt-16 pb-12 relative z-10">
          {/* Left-aligned Content Wrapper */}
          <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col items-start text-left">
            {/* Category Tag */}
            <span className="text-xs font-bold tracking-widest text-[#0EB689] uppercase mb-4">
              Finanzbildung für alle
            </span>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight leading-tight mb-6">
              Master money.<br />Empower yourself.
            </h1>
            
            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Lerne, investiere und plane deine Zukunft – alles an einem Ort. Einfach, verständlich und auf deine Ziele abgestimmt.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-[#0EB689] hover:bg-[#0c9d76] text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                Jetzt loslegen <span className="text-base">→</span>
              </Link>
            </div>

            {/* Core Value Props with individual clean white feature boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full pt-10 border-t border-gray-200/40">
              {/* Value 1 */}
              <div className="flex flex-col items-start bg-white/40 backdrop-blur-[2px] border border-gray-100/50 rounded-2xl p-4 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-[#0EB689]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Lernen</h3>
                <p className="text-xs text-gray-400 leading-normal">Wissen, das dich weiterbringt</p>
              </div>

              {/* Value 2 */}
              <div className="flex flex-col items-start bg-white/40 backdrop-blur-[2px] border border-gray-100/50 rounded-2xl p-4 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-[#0EB689]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Investieren</h3>
                <p className="text-xs text-gray-400 leading-normal">Clever investieren, Schritt für Schritt</p>
              </div>

              {/* Value 3 */}
              <div className="flex flex-col items-start bg-white/40 backdrop-blur-[2px] border border-gray-100/50 rounded-2xl p-4 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-[#0EB689]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Ziele erreichen</h3>
                <p className="text-xs text-gray-400 leading-normal">Deine Zukunft aktiv gestalten</p>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Trust & Proof Banner */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trust Factor 1 */}
          <div className="flex items-center gap-4 px-4">
            <div className="w-10 h-10 rounded-full bg-[#F0FAF6] flex items-center justify-center text-[#0EB689] flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-800">Sicher & vertrauenswürdig</h4>
              <p className="text-xs text-gray-400">Deine Daten sind vollständig geschützt</p>
            </div>
          </div>

          {/* Trust Factor 2 */}
          <div className="flex items-center gap-4 px-4 md:border-x md:border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#F0FAF6] flex items-center justify-center text-[#0EB689] flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-800">10.000+ Nutzer</h4>
              <p className="text-xs text-gray-400">Vertrauen uns bereits auf ihrem Weg</p>
            </div>
          </div>

          {/* Trust Factor 3 */}
          <div className="flex items-center gap-4 px-4">
            <div className="w-10 h-10 rounded-full bg-[#F0FAF6] flex items-center justify-center text-[#0EB689] flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.243.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-800">4,9 / 5 Sterne</h4>
              <p className="text-xs text-gray-400">Von unseren Nutzern hervorragend bewertet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
