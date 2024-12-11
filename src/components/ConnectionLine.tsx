interface ConnectionLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export default ({ fromX, fromY, toX, toY }: ConnectionLineProps) => {
  return (
    <g>
      <path
        fill="none"
        stroke={"#7c3aed"}
        strokeWidth={2}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={"#7c3aed"}
        strokeWidth={1.5}
      />
    </g>
  );
};
