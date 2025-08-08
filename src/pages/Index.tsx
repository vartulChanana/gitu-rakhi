import RakhiHero from "@/components/RakhiHero";
import StaticGallery from "@/components/StaticGallery";
import LoveLetter from "@/components/LoveLetter";

const Index = () => {
  return (
    <main>
      <RakhiHero />
      <StaticGallery />
      <LoveLetter />
      <footer className="container py-10 text-center text-sm text-muted-foreground">
        Made with love • Raksha Bandhan
      </footer>
    </main>
  );
};

export default Index;
