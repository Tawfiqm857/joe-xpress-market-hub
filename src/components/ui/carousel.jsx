import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

function Carousel({ children, options, className }) {
  const [viewportRef, embla] = useEmblaCarousel(options);

  React.useEffect(() => {
    if (embla) {
      // Additional carousel logic can go here
    }
  }, [embla]);

  return (
    <div className={`embla ${className}`}>
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">{children}</div>
      </div>
    </div>
  );
}

export { Carousel };
