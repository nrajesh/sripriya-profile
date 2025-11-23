export function HeroArt() {
  return (
    <div className="relative w-full pt-[100%] hidden md:block overflow-hidden">
      {/* The parent div now uses pt-[100%] to maintain a square aspect ratio, scaling with its width. */}
      {/* overflow-hidden is added to ensure nothing spills out if sizes are slightly off. */}
      <div className="absolute top-[0%] right-[0%] w-[80%] h-[80%] bg-primary" />
      <div className="absolute bottom-[0%] left-[0%] w-[60%] h-[60%] bg-secondary" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border-4 border-foreground" />
    </div>
  );
}