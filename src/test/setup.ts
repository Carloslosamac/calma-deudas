import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom no implementa scrollIntoView (lo usa scrollToForm / ScrollToTop).
window.HTMLElement.prototype.scrollIntoView = () => {};
window.scrollTo = () => {};

// IntersectionObserver: framer-motion `whileInView` lo necesita.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error - test shim
window.IntersectionObserver = IO;
