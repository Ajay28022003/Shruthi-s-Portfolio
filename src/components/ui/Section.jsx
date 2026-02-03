// src/components/ui/Section.jsx
export const Section = ({ children, className = "", align = "left" }) => {
  // align prop controls if text is left, center, or right
  const alignmentClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section className={`h-screen w-full flex flex-col justify-center px-10 md:px-20 pointer-events-auto ${alignmentClass[align]} ${className}`}>
      {/* "pointer-events-auto" is crucial so users can click buttons in this section */}
      <div className="max-w-4xl w-full">
        {children}
      </div>
    </section>
  );
};