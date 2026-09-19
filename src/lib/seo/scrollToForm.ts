/** CTA global: siempre hace scroll a #hero-form (regla de marca). */
export const scrollToForm = () => {
  const form = document.getElementById("hero-form");
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.href = "/#hero-form";
};