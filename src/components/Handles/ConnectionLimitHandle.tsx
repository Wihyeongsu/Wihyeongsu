import {
  Handle,
  HandleType,
  Position,
  useHandleConnections,
} from "@xyflow/react";

const ConnectionLimitHandle = ({
  type,
  position,
  connectionCount,
}: {
  type: HandleType;
  position: Position;
  connectionCount: number;
}) => {
  const connections = useHandleConnections({
    type: type,
  });

  return (
    <Handle
      type={type}
      position={position}
      isConnectable={connections.length < connectionCount}
      className="w-1 h-3/4 !bg-violet-200 border border-violet-100 rounded-full"
    />
  );
};

export default ConnectionLimitHandle;
