import { useState } from 'react';

// Static gallery: simple grid-only layout, no particles.

const Gallery = () => {
  const [techPhotos] = useState<string[]>([
    '/tech_image1.jpg',
    '/cowrie.png',
  ]);
  const [nonTechPhotos] = useState<string[]>([
    '/non_tech_image1.jpg',
    '/non_tech_image2.jpg',
    '/non_tech_image3.jpg',
    '/non_tech_image4.jpg',
    '/non_tech_image5.jpg', 
    '/non_tech_image6.jpg'// replace with karate and other non-technical photos as you add them
  ]);

  // Ensure assets from public/ resolve correctly in dev and on live sites hosted under a subpath
  const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

  const Grid = ({ photos }: { photos: string[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {photos.map((p, i) => (
        <img
          key={i}
          src={p}
          alt={`gallery-${i}`}
          className="w-full h-auto object-contain rounded-xl glass border bg-gray-100 dark:bg-gray-900/20"
        />
      ))}
    </div>
  );

  return (
    <section id="gallery" className="relative min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Gallery</h2>
          <p className="text-lg text-gray-700 dark:text-muted-foreground">Moments & milestones</p>
        </div>

        {/* Technical Photos */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">Technical Photos</h3>
          <Grid photos={techPhotos.map(withBase)} />
        </div>

        {/* Non-Technical Photos */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">Non-Technical Photos</h3>
          <Grid photos={nonTechPhotos.map(withBase)} />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
