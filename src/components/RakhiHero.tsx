import heroImage from "@/assets/rakhi-hero.jpg";
import { Button } from "@/components/ui/button";

const RakhiHero = () => {
  return (
    <header className="w-full bg-gradient-to-b from-accent/10 to-background">
      <div className="container py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Happy Raksha Bandhan, My Dear Sister
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A small corner on the internet to celebrate our bond—with memories,
            photos, and words from the heart.
          </p>
          <div className="flex items-center gap-4">
            <a href="#gallery"><Button variant="hero" size="lg">Add Our Photos</Button></a>
            <a href="#letter" className="underline underline-offset-4 hover:opacity-90">Read My Letter</a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="Festive Raksha Bandhan abstract background"
            className="w-full rounded-lg shadow-lg animate-float"
            loading="eager"
          />
        </div>
      </div>
    </header>
  );
};

export default RakhiHero;
