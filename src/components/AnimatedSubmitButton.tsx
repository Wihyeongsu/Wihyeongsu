import { useEffect, useRef, useState } from "react";

const AnimatedSubmitButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [length, setLength] = useState(40);

  // 실제 DOM 요소를 참조하기 위한 ref
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (buttonContainerRef.current) {
        const height = buttonContainerRef.current.clientHeight;
        console.log("Container height measured:", height); // 디버깅을 위한 로그
        setLength(height);
      }
    };

    // 초기 측정
    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (buttonContainerRef.current) {
      resizeObserver.observe(buttonContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    // 이미 애니메이션 중이라면 추가 클릭을 무시합니다
    if (isAnimating) return;

    setIsAnimating(true);

    // 텍스트 페이드아웃을 버튼 축소 시작과 함께 진행합니다
    setIsTextVisible(false);

    // 아이콘은 버튼이 완전히 축소된 후에 표시합니다
    setTimeout(() => {
      setIsImageVisible(true);
    }, 300); // 버튼 축소 애니메이션의 절반 시점에 아이콘을 표시합니다
  };

  return (
    <div
      ref={buttonContainerRef}
      className="w-full h-full flex items-center justify-end">
      <button
        onClick={handleClick}
        style={{
          height: `${length}px`,
          width: isAnimating ? `${length}px` : `${length * 3}px`,
        }}
        className={`
          relative overflow-hidden
          rounded-full
        border-slate-50
          hover:border-2 hover:border-slate-950 
          transition-all duration-0 hover:duration-500 ease-in-out 
          ${isAnimating ? "bg-slate-950" : "bg-slate-50"}
          focus:outline-none
        `}>
        <span
          className={`
            absolute inset-0
            flex items-center justify-center
            text-sm font-medium
            transition-all duration-300 ease-in-out
            ${isTextVisible ? "opacity-100 text-slate-950" : "opacity-0"}
            ${
              length < 45
                ? "text-sm"
                : length < 50
                ? "text-md"
                : length < 55
                ? "text-lg"
                : "text-xl"
            }
          `}>
          Generate code
        </span>

        <span
          className={`
            absolute inset-0
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${isImageVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
          `}>
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default AnimatedSubmitButton;
