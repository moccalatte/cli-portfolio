import React, { useRef, useState } from "react";

/**
 * ProjectAlbum
 * Props:
 * - images: Array<{ src: string, alt?: string, caption?: string }>
 */
export default function ProjectAlbum({ images = [] }) {
  const scrollRef = useRef(null);
  const [zoomed, setZoomed] = useState(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "right" ? clientWidth * 0.8 : -clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="project-album"
      style={{ display: "flex", alignItems: "center", width: "100%" }}
    >
      {images.length > 1 && (
        <button
          className="album-scroll-btn left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          style={{
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
            zIndex: 2,
          }}
          type="button"
        >
          &#60;
        </button>
      )}
      <div
        className="album-scroll-container"
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          className="album-images"
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 16,
            scrollBehavior: "smooth",
            padding: "8px 0",
          }}
        >
          {images.map((img, idx) => (
            <figure
              key={idx}
              style={{
                minWidth: 180,
                maxWidth: 240,
                flex: "0 0 33.3333%",
                margin: 0,
                cursor: "zoom-in",
                position: "relative",
              }}
              onClick={() => setZoomed(idx)}
              tabIndex={0}
              aria-label={`Zoom image ${img.alt || img.caption || idx + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setZoomed(idx);
              }}
            >
              <img
                src={img.src}
                alt={img.alt || ""}
                loading="lazy"
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                  background: "#222",
                  display: "block",
                }}
              />
              {img.caption && (
                <figcaption
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "#b3b3b3",
                    marginTop: 4,
                  }}
                >
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <button
          className="album-scroll-btn right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          style={{
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 8,
            zIndex: 2,
          }}
          type="button"
        >
          &#62;
        </button>
      )}
      {zoomed !== null && (
        <div
          className="album-zoom-modal"
          tabIndex={-1}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            animation: "fadeIn 0.2s",
          }}
          onClick={() => setZoomed(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setZoomed(null);
          }}
        >
          <img
            src={images[zoomed].src}
            alt={images[zoomed].alt || ""}
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              borderRadius: 12,
              boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
              background: "#222",
              border: "2px solid #fff",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {images[zoomed].caption && (
            <div
              style={{
                color: "#fff",
                marginTop: 16,
                fontSize: 16,
                textAlign: "center",
                textShadow: "0 2px 8px #000",
              }}
            >
              {images[zoomed].caption}
            </div>
          )}
          <button
            onClick={() => setZoomed(null)}
            style={{
              marginTop: 24,
              background: "#fff",
              color: "#222",
              border: "none",
              borderRadius: 6,
              padding: "8px 20px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            type="button"
          >
            Close
          </button>
        </div>
      )}
      <style>{`
        .album-images::-webkit-scrollbar {
          height: 8px;
        }
        .album-images::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        .album-zoom-modal:focus {
          outline: none;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  );
}
