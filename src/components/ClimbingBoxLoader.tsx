type ClimbingBoxLoaderProps = {
  size?: number; // 기본 크기를 픽셀 단위로 받습니다 (선택적 prop)
};

const ClimbingBoxLoader = ({ size = 32 }: ClimbingBoxLoaderProps) => {
  // 기본 크기를 기준으로 다른 요소들의 크기를 계산합니다
  const baseSize = size; // 기본 크기 (예: 32px)
  const containerSize = baseSize * 1.6; // 컨테이너 크기
  const boxSize = baseSize * 0.3; // 움직이는 박스의 크기
  const borderWidth = baseSize * 0.075; // 테두리 두께
  const hillSize = baseSize * 2.1; // 언덕/계단 요소의 크기
  const hillOffset = baseSize * 0.5; // 언덕의 위치 오프셋

  return (
    <div className="bg-slate-50">
      {/* 로더 컨테이너 */}
      <div
        className="absolute top-1/2 left-1/2 bg-slate-50"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          marginTop: `-${containerSize / 2}px`,
          marginLeft: `-${containerSize / 2}px`,
        }}>
        {/* 움직이는 박스 */}
        <div
          style={{
            width: `${boxSize}px`,
            height: `${boxSize}px`,
            borderWidth: `${borderWidth}px`,
            bottom: `-${borderWidth / 2}px`,
          }}
          className="absolute left-0 border-whitesmoke rounded-[15%] box-border
            animate-[climb_2.5s_cubic-bezier(0.79,0,0.47,0.97)_infinite]"
        />

        {/* 언덕/계단 요소 */}
        <div
          style={{
            width: `${hillSize}px`,
            height: `${hillSize}px`,
            top: `${hillOffset}px`,
            left: `${hillOffset}px`,
            borderLeftWidth: `${borderWidth}px`,
          }}
          className="absolute border-l-whitesmoke rotate-45
            after:content-[''] after:absolute after:left-0 after:bg-slate-50">
          <div
            style={{
              width: `${hillSize}px`,
              height: `${hillSize}px`,
            }}
            className="absolute"
          />
        </div>
      </div>

      {/* 키프레임 애니메이션을 동적 크기에 맞게 조정 */}
      <style>{`
        @keyframes climb {
          0% { transform: translate(0, -${boxSize}px) rotate(-45deg); }
          5% { transform: translate(0, -${boxSize}px) rotate(-50deg); }
          20% { transform: translate(${boxSize}px, -${
        boxSize * 2
      }px) rotate(47deg); }
          25% { transform: translate(${boxSize}px, -${
        boxSize * 2
      }px) rotate(45deg); }
          30% { transform: translate(${boxSize}px, -${
        boxSize * 2
      }px) rotate(40deg); }
          45% { transform: translate(${boxSize * 2}px, -${
        boxSize * 3
      }px) rotate(137deg); }
          50% { transform: translate(${boxSize * 2}px, -${
        boxSize * 3
      }px) rotate(135deg); }
          55% { transform: translate(${boxSize * 2}px, -${
        boxSize * 3
      }px) rotate(130deg); }
          70% { transform: translate(${boxSize * 3}px, -${
        boxSize * 4
      }px) rotate(217deg); }
          75% { transform: translate(${boxSize * 3}px, -${
        boxSize * 4
      }px) rotate(220deg); }
          100% { transform: translate(0, -${boxSize}px) rotate(-225deg); }
        }
      `}</style>
    </div>
  );
};

export default ClimbingBoxLoader;
