const BaseNode = ({ children, selected }) => {
  return (
    <div
      className={`bg-slate-50 p-4 rounded-xl border hover:shadow-md
    transition-all
    ${
      selected
        ? "border-slate-700 shadow-lg scale-105"
        : "border-slate-200 shadow-sm"
    }`}>
      {children}
    </div>
  );
};

export default BaseNode;
