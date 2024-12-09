export default ({ fromX, fromY, toX, toY }) => {
  return (
    <g>
      <path
        fill="none"
        stroke={"#06b6d4"}
        strokeWidth={2}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={"#06b6d4"}
        strokeWidth={1.5}
      />
    </g>
  );
};
