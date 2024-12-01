import React from "react";
import {
  Handle,
  HandleType,
  Position,
  useHandleConnections,
} from "@xyflow/react";

type props = {
  type: HandleType;
  position: Position;
  connectionCount: number;
};

const ConnectionLimitHandle = (props: props) => {
  const connections = useHandleConnections({
    type: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={connections.length < props.connectionCount}
    />
  );
};

export default ConnectionLimitHandle;
