export default function Grain() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 opacity-[0.07]" 
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml, %3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E")`
      }}
    />
  );
}
