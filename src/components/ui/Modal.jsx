import { useEffect, useRef, useState } from "react";

export default function Modal({ open, onClose, title = "", children, fullScreen = false, dark = false }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  const [render, setRender] = useState(open);
  const [visible, setVisible] = useState(false);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (open) {
      setRender(true);
      // next frame -> visible to trigger transitions
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const t = setTimeout(() => setRender(false), 200); // match duration
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) onClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Manage focus when becoming visible
  useEffect(() => {
    if (visible) {
      const prev = document.activeElement;
      panelRef.current?.focus?.();
      return () => {
        prev && prev.focus && prev.focus();
      };
    }
  }, [visible]);

  if (!render) return null;

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose?.();
  }

  if (fullScreen) {
    return (
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!open}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          className={`w-full h-full overflow-y-auto transform transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className={`fixed inset-0 z-[9999] ${dark ? 'bg-black/80' : 'bg-black/60'} backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden={!open}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`w-full max-w-3xl md:max-w-4xl rounded-2xl ${dark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} shadow-2xl border outline-none transform transition-all duration-300 ${visible ? "opacity-100 translate-y-0 sm:scale-100" : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"} max-h-[85vh] overflow-y-auto`}
      >
        {/* Header */}
        {title && (
          <div className={`sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b ${dark ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur`}>
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${dark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'} focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400`}
              aria-label="Close dialog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        )}
        {/* Body */}
        <div className={title ? "px-8 py-6" : ""}>{children}</div>
      </div>
    </div>
  );
}
