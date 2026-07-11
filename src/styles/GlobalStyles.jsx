import React from "react";

/**
 * Injects the fonts + keyframe animations used across the landing page.
 * Mount once, near the root of the page.
 */
export default function GlobalStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

      .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
      .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-14px) rotate(1deg); }
      }
      @keyframes float-slower {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(10px); }
      }
      @keyframes blob-pulse {
        0%, 100% { transform: scale(1) translate(0,0); opacity: 0.55; }
        50% { transform: scale(1.15) translate(10px,-10px); opacity: 0.75; }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
      .animate-blob { animation: blob-pulse 10s ease-in-out infinite; }
      .animate-fade-up { animation: fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }

      .shimmer-text {
        background: linear-gradient(90deg, #4f46e5 0%, #9333ea 25%, #4f46e5 50%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: shimmer 5s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-float-slow, .animate-float-slower, .animate-blob, .animate-fade-up, .shimmer-text {
          animation: none !important;
        }
      }
    `}</style>
    );
}