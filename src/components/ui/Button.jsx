// src/components/ui/Button.jsx
export const Button = ({ children, onClick, variant = "primary" }) => {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    outline: "border border-white/20 hover:bg-white/10 text-white",
  };

  return (
    <button 
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-display font-bold transition-all duration-300 transform hover:scale-105 ${styles[variant]}`}
    >
      {children}
    </button>
  );
};