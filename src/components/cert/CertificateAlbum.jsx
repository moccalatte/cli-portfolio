import React, { useRef, useState } from "react";

/**
 * CertificateAlbum
 * Props:
 * - certificates: Array<{ url: string, title?: string }>
 */
export default function CertificateAlbum({ certificates = [] }) {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (direction) => {
    let newIdx = activeIdx;
    if (direction === "right" && activeIdx < certificates.length - 1) {
      newIdx = activeIdx + 1;
    } else if (direction === "left" && activeIdx > 0) {
      newIdx = activeIdx - 1;
    }
    setActiveIdx(newIdx);
    if (scrollRef.current) {
      const child = scrollRef.current.children[newIdx];
      if (child) {
        child.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  };

  return (
    <div
      className="certificate-album"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      {certificates.length > 1 && (
        <button
          className="cert-scroll-btn left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          disabled={activeIdx === 0}
          style={{
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: activeIdx === 0 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
            zIndex: 2,
            opacity: activeIdx === 0 ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
          type="button"
        >
          &#60;
        </button>
      )}
      <div
        className="cert-scroll-container"
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          className="cert-pdf-list"
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 24,
            scrollBehavior: "smooth",
            transition: "transform 0.3s",
          }}
        >
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                flex: "0 0 100%",
                display: idx === activeIdx ? "block" : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#222",
                  marginBottom: 8,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <embed
                  src={cert.url}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                  style={{
                    minHeight: 320,
                    background: "#fff",
                    border: "none",
                  }}
                />
              </div>
              {cert.title && (
                <div
                  style={{
                    color: "#b3b3b3",
                    fontSize: 15,
                    marginBottom: 4,
                  }}
                >
                  {cert.title}
                </div>
              )}
              <div
                style={{
                  color: "#888",
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                {idx + 1} / {certificates.length}
              </div>
            </div>
          ))}
        </div>
      </div>
      {certificates.length > 1 && (
        <button
          className="cert-scroll-btn right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          disabled={activeIdx === certificates.length - 1}
          style={{
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: activeIdx === certificates.length - 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 8,
            zIndex: 2,
            opacity: activeIdx === certificates.length - 1 ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
          type="button"
        >
          &#62;
        </button>
      )}
    </div>
  );
}
