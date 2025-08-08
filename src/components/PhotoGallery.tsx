import * as React from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/rakhi-hero.jpg";
import { useToast } from "@/hooks/use-toast";
import { getPhoto, setPhoto } from "@/lib/storage";

const PhotoTile: React.FC<{
  index: number;
  previewUrl: string | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}> = ({ index, previewUrl, onUpload, onRemove }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={`Uploaded photo ${index + 1}`}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <img
          src={heroImage}
          alt="Festive placeholder image"
          className="w-full h-56 object-cover opacity-80"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onUpload(file);
            }
          }}
        />
        <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
        {previewUrl && (
          <Button variant="outline" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

const PhotoGallery: React.FC = () => {
  const { toast } = useToast();
  const [previews, setPreviews] = React.useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // Revoke object URLs on cleanup/change to prevent memory leaks
  const revokeAll = React.useCallback((urls: (string | null)[]) => {
    urls.forEach((u) => u && URL.revokeObjectURL(u));
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const urls = await Promise.all(
        [0, 1, 2, 3].map(async (i) => {
          const blob = await getPhoto(i);
          return blob ? URL.createObjectURL(blob) : null;
        })
      );
      if (isMounted) setPreviews(urls);
    })();
    return () => {
      isMounted = false;
      revokeAll(previews);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (i: number, file: File) => {
    const url = URL.createObjectURL(file);
    setPreviews((prev) => {
      // revoke previous URL before replacing
      if (prev[i]) URL.revokeObjectURL(prev[i]!);
      const next = [...prev];
      next[i] = url;
      return next;
    });
    await setPhoto(i, file);
    toast({
      title: "Photo saved",
      description: "This photo is now saved to your device (only visible to you).",
    });
  };

  const handleRemove = async (i: number) => {
    setPreviews((prev) => {
      if (prev[i]) URL.revokeObjectURL(prev[i]!);
      const next = [...prev];
      next[i] = null;
      return next;
    });
    await setPhoto(i, null);
    toast({ title: "Photo removed", description: "You can add another anytime." });
  };

  return (
    <section id="gallery" className="container py-14 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Our Little Gallery</h2>
        <p className="text-muted-foreground">
          Add a few photos that make us smile—moments that feel like home.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Your photos are saved locally on this device using your browser. They won’t be uploaded
          or shared anywhere.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {previews.map((previewUrl, i) => (
          <PhotoTile
            key={i}
            index={i}
            previewUrl={previewUrl}
            onUpload={(file) => handleUpload(i, file)}
            onRemove={() => handleRemove(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
