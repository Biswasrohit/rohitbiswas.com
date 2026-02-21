const AnimatedBackground = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Main gradient orb — centered high */}
      <div
        className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full animate-orb-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(129,140,248,0.12) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Core bright center */}
      <div
        className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(129,140,248,0.2) 60%, transparent 80%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Secondary satellite orb — purple */}
      <div
        className="absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-full"
        style={{
          top: '22%',
          right: '18%',
          background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'floatSlow 18s ease-in-out infinite reverse',
        }}
      />

      {/* Tertiary accent orb — warm */}
      <div
        className="absolute w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full"
        style={{
          bottom: '30%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatSlow 22s ease-in-out infinite',
        }}
      />

      {/* Dot grid pattern for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Noise grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
