const ClimbingBoxLoader = () => {
  return (
    <div className="bg-slate-50">
      {/* Loader container - scaled down by about 40% from original size */}
      <div className="absolute top-1/2 left-1/2 -mt-[1.6em] -ml-[1.6em] w-[3.2em] h-[3.2em] bg-slate-50">
        {/* Climbing box - proportionally scaled down */}
        <div
          className="absolute left-0 bottom-[-0.06em] w-[0.6em] h-[0.6em] border-[0.15em] border-whitesmoke rounded-[15%] box-border
          animate-[climb_2.5s_cubic-bezier(0.79,0,0.47,0.97)_infinite]"
        />

        {/* Hill/Stairs element - proportionally scaled down */}
        <div
          className="absolute w-[4.2em] h-[4.2em] top-[1em] left-[1em] border-l-[0.15em] border-l-whitesmoke rotate-45
          after:content-[''] after:absolute after:w-[4.2em] after:h-[4.2em] after:left-0 after:bg-slate-50"
        />
      </div>

      {/* Updated keyframes animation with scaled down values */}
      <style>{`
        @keyframes climb {
          0% {
            transform: translate(0, -0.6em) rotate(-45deg);
          }
          5% {
            transform: translate(0, -0.6em) rotate(-50deg);
          }
          20% {
            transform: translate(0.6em, -1.2em) rotate(47deg);
          }
          25% {
            transform: translate(0.6em, -1.2em) rotate(45deg);
          }
          30% {
            transform: translate(0.6em, -1.2em) rotate(40deg);
          }
          45% {
            transform: translate(1.2em, -1.8em) rotate(137deg);
          }
          50% {
            transform: translate(1.2em, -1.8em) rotate(135deg);
          }
          55% {
            transform: translate(1.2em, -1.8em) rotate(130deg);
          }
          70% {
            transform: translate(1.8em, -2.4em) rotate(217deg);
          }
          75% {
            transform: translate(1.8em, -2.4em) rotate(220deg);
          }
          100% {
            transform: translate(0, -0.6em) rotate(-225deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ClimbingBoxLoader;
