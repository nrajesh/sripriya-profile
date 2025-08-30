export function HeroArt() {
  return (
    <div className="relative h-80 hidden md:block">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-foreground" />
    </div>
  );
}