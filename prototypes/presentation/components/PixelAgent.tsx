/**
 * Pixel-art robot icon used across L4 slides.
 * 7x7 grid with ears, eyes, body, and legs.
 */
export default function PixelAgent({
  color = "#c49a7c",
  size = 28,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 7 7"
      fill={color}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Ears */}
      <rect x="1" y="0" width="1" height="1" />
      <rect x="5" y="0" width="1" height="1" />
      {/* Head */}
      <rect x="1" y="1" width="5" height="1" />
      {/* Eye row — body */}
      <rect x="1" y="2" width="1" height="1" />
      <rect x="3" y="2" width="1" height="1" />
      <rect x="5" y="2" width="1" height="1" />
      {/* Eyes (white) */}
      <rect x="2" y="2" width="1" height="1" fill="white" fillOpacity="0.9" />
      <rect x="4" y="2" width="1" height="1" fill="white" fillOpacity="0.9" />
      {/* Body */}
      <rect x="1" y="3" width="5" height="2" />
      {/* Legs */}
      <rect x="1" y="5" width="2" height="2" />
      <rect x="4" y="5" width="2" height="2" />
    </svg>
  );
}
