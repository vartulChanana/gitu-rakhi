import * as React from "react";

const StaticGallery: React.FC = () => {
  // Import all images from src/assets/photos at build time
  const imageModules = (import.meta as any).glob(
    "@/assets/photos/*.{png,jpg,jpeg,webp,gif}",
    { eager: true, as: "url" }
  ) as Record<string, string>;

  const images = React.useMemo(() => {
    const entries = Object.entries(imageModules);
    // Sort by filename to control order
    entries.sort((a, b) => a[0].localeCompare(b[0]));
    return entries.map(([path, url]) => ({
      url,
      name: path.split("/").pop() || "Photo",
    }));
  }, [imageModules]);

  return (
    <section id="gallery" className="container py-14 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Our Little Gallery</h2>
        <p className="text-muted-foreground">
          These photos are part of the website itself, so everyone you share this link with can see them.
        </p>
      </div>

      {images.length === 0 ? (
        <div className="max-w-xl mx-auto text-center rounded-lg border p-8 bg-card">
          <p className="text-foreground/80">
            No photos yet. Send your favorite pictures here and I’ll add them to the site so they’re visible when published.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img) => {
            const alt = `Raksha Bandhan memory – ${img.name.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "")}`;
            return (
              <figure key={img.url} className="group overflow-hidden rounded-lg border bg-card">
                <img
                  src={img.url}
                  alt={alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default StaticGallery;
