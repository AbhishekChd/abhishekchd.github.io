import React from "react";
import * as Icon from "react-feather";

interface ThumbnailImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative cursor-pointer rounded-lg overflow-hidden border dark:border-opacity-20 dark:border-gray-500 ${className}`}
        title="Click to view full image"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block scale-[1.04] transition-transform duration-200 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded bg-black/60 text-white/90 group-hover:bg-black/85 group-hover:text-white transition-all pointer-events-none shadow-md">
          <Icon.Maximize2 size={14} />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Close"
          >
            <Icon.X size={28} />
          </button>
          <div
            className="flex flex-col items-center max-w-[95vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain rounded"
            />
            {alt && (
              <p className="mt-3 text-sm text-neutral-300 text-center">
                {alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ThumbnailImage;
