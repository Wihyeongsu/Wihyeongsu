const BaseNode = ({
  children,
  selected,
}: {
  children: React.ReactNode;
  selected: boolean;
}) => {
  return (
    <div
      className={`bg-slate-50 p-4 rounded-xl border hover:shadow-md
    transition-all
    ${
      selected ? "border-violet-500 shadow-lg" : "border-slate-200 shadow-sm"
    }`}>
      {children}
    </div>
  );
};

export default BaseNode;
