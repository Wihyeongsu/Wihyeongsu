type BaseIconProps = {
  href: string;
  src: string;
  alt: string;
};

export const BaseIcon = ({ href, src, alt }: BaseIconProps) => {
  return (
    <a
      className=" transition-colors rounded-xl px-1 py-1 
      hover:bg-violet-300 hover:bg-opacity-90"
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      <img src={src} alt={alt} className="mid-w-8 min-h-8" />
    </a>
  );
};
