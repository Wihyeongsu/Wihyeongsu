// DnDContext.tsx
import { createContext, useContext, useState } from "react";

// DnD 상태를 정의하는 타입
type DragState = {
  type: string | null;
  position: { x: number; y: number } | null;
  isDragging: boolean;
};

// Context의 값 타입을 정의
type DragContextValue = [
  DragState,
  {
    setType: (type: string | null) => void;
    setPosition: (position: { x: number; y: number } | null) => void;
    setDragging: (isDragging: boolean) => void;
    resetDragState: () => void;
  },
];

// Context의 초기값 설정
const initialDragState: DragState = {
  type: null,
  position: null,
  isDragging: false,
};

// Context 생성 시 타입 지정
const DnDContext = createContext<DragContextValue>([
  initialDragState,
  {
    setType: () => {},
    setPosition: () => {},
    setDragging: () => {},
    resetDragState: () => {},
  },
]);

type DnDProviderProps = {
  children: React.ReactNode;
};

export const DnDProvider = ({ children }: DnDProviderProps) => {
  const [dragState, setDragState] = useState<DragState>(initialDragState);

  // 상태 업데이트 함수들을 객체로 묶어서 관리
  const dragStateUpdaters = {
    setType: (type: string | null) =>
      setDragState((prev) => ({ ...prev, type })),

    setPosition: (position: { x: number; y: number } | null) =>
      setDragState((prev) => ({ ...prev, position })),

    setDragging: (isDragging: boolean) =>
      setDragState((prev) => ({ ...prev, isDragging })),

    resetDragState: () => setDragState(initialDragState),
  };

  return (
    <DnDContext.Provider value={[dragState, dragStateUpdaters]}>
      {children}
    </DnDContext.Provider>
  );
};

// 커스텀 훅에도 타입 정보 추가
export const useDnD = (): DragContextValue => {
  const context = useContext(DnDContext);

  if (!context) {
    throw new Error("useDnD must be used within a DnDProvider");
  }

  return context;
};

export default DnDContext;
