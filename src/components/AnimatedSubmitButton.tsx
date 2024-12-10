import useAnthropicResponseStore from "@/store/anthropicResponseStore";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";

// 애니메이션 상태를 관리하는 상수
const ANIMATION_TIMING = {
  BUTTON_SHRINK: 300, // 버튼 축소 애니메이션 시간
  BUTTON_EXPAND: 300, // 버튼 확장 애니메이션 시간
  TRANSITION: 1000, // API 호출 전 전환 시간
} as const;

// 애니메이션 딜레이를 위한 유틸리티 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const AnimatedSubmitButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [length, setLength] = useState(40);

  const anthropicInstance = useAnthropicResponseStore();
  const reactFlowInstance = useReactFlow();

  // 실제 DOM 요소를 참조하기 위한 ref
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const { api_key } = useAnthropicResponseStore();

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

  const handleClick = async () => {
    // 이미 애니메이션 중이라면 추가 클릭 방지
    if (isAnimating) return;

    setIsAnimating(true);

    // 첫 번째 애니메이션 단계: 텍스트 페이드아웃과 버튼 축소
    setIsTextVisible(false);
    await delay(ANIMATION_TIMING.BUTTON_SHRINK);

    // 두 번째 애니메이션 단계: 로딩 아이콘 표시
    setIsImageVisible(true);

    // 자연스러운 전환을 위한 딜레이
    await delay(ANIMATION_TIMING.TRANSITION);

    anthropicInstance.fetchResponse(reactFlowInstance);

    // 성공 애니메이션 시작
    await delay(ANIMATION_TIMING.BUTTON_EXPAND);
    onSuccess();

    // 모든 처리가 끝난 후 애니메이션 상태 초기화
    setIsAnimating(false);
  };

  return (
    <div
      ref={buttonContainerRef}
      className="w-full h-full flex items-center justify-end">
      <button
        disabled={!api_key}
        onClick={handleClick}
        style={{
          height: `${length}px`,
          width: isAnimating ? `${length}px` : `${length * 3}px`,
        }}
        className={`
          relative overflow-hidden
          rounded-full
        border-slate-50
          transition-all duration-500 ease-in-out 
          ${api_key ? "hover:border-2 hover:border-slate-950" : ""} 
          ${isAnimating ? "bg-slate-950" : "bg-slate-50"}
          focus:outline-none
        `}>
        <span
          className={`
            absolute inset-0
            flex items-center justify-center
            font-medium
            transition-all duration-300 ease-in-out
            ${api_key ? "text-slate-950" : "text-slate-50"}
            ${isTextVisible ? "opacity-100" : "opacity-0"}
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
