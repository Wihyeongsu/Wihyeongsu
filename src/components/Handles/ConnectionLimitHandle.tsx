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
    />
  );
};

export default ConnectionLimitHandle;
