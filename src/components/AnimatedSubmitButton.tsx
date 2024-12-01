import { useState } from "react";

const AnimatedSubmitButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);

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
    <div className="relative w-40 h-[40px] flex items-end justify-end">
      <button
        onClick={handleClick}
        className={`
          relative overflow-hidden
          h-[40px] rounded-full
        border-slate-50
          hover:border-2 hover:border-slate-950 
          transition-all ease-in-out 
          ${
            isAnimating
              ? "w-[40px] bg-slate-950 duration-500"
              : "w-[120px] bg-slate-50"
          }
          focus:outline-none
        `}>
        <span
          className={`
            absolute inset-0
            flex items-center justify-center
            text-sm font-medium
            transition-all duration-300 ease-in-out
            ${isTextVisible ? "opacity-100 text-slate-950" : "opacity-0"}
          `}>
          Generate code
        </span>

        <span
          className={`
            absolute inset-0
            flex items-center justify-center
            transition-all duration-500 ease-in-out
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
