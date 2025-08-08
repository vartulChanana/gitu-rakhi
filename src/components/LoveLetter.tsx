import * as React from "react";

const LoveLetter = () => {
  const [text, setText] = React.useState<string>(
    "Dear Sister, on this Raksha Bandhan, I want to tell you how grateful I am for the light you bring into my life. You’ve been my first friend, my fiercest cheerleader, and the quiet courage behind my best days. No matter where life takes us, the thread that ties us is stronger than distance and louder than time. I promise to stand by you—through every joy and every storm—with love that’s patient, proud, and forever yours. Thank you for your laughter, your wisdom, and your heart of gold. I love you more than words can carry today, tomorrow, and always. Happy Rakhi Gitu <3"
  );

  return (
    <section id="letter" className="container py-14 md:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-display text-3xl md:text-4xl">
          A Letter From My Heart
        </h2>
        <p className="text-lg leading-relaxed text-foreground/90">
          {text}
        </p>
      </div>
    </section>
  );
};

export default LoveLetter;
