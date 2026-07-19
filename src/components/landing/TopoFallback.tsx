/**
 * Static contour texture for environments without WebGL.
 * A dozen nested, hand-wobbled iso-line paths — two "peaks", index lines heavier.
 */
export function TopoFallback() {
  const minor = "0.8";
  const major = "1.6";
  return (
    <div className="absolute inset-0 text-ink/30" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        role="presentation"
      >
        <g stroke="currentColor">
          <path strokeWidth={major} d="M120 690c130-180 300-240 470-190s260 190 430 180 250-120 300-230" />
          <path strokeWidth={minor} d="M90 640c150-170 320-220 490-170s250 170 420 160 260-100 330-200" />
          <path strokeWidth={minor} d="M160 740c120-190 290-260 450-210s270 210 440 200 240-140 290-260" />
          <path strokeWidth={minor} d="M60 580c170-160 340-200 510-150s240 150 410 140 270-80 360-170" />
          <path strokeWidth={minor} d="M210 800c110-200 280-290 440-240s280 230 450 220 230-160 280-290" />
          <path strokeWidth={major} d="M340 320c90-90 220-120 330-70s160 150 280 150 200-60 260-140" />
          <path strokeWidth={minor} d="M380 370c80-80 200-105 305-60s150 130 265 130 185-50 245-120" />
          <path strokeWidth={minor} d="M300 270c100-100 240-135 355-80s170 170 295 170 215-70 275-160" />
          <path strokeWidth={minor} d="M430 420c70-70 180-90 275-50s140 110 250 110 170-40 230-105" />
          <path strokeWidth={minor} d="M480 470c60-60 160-75 245-40s130 90 235 90 155-30 215-90" />
          <path strokeWidth={minor} d="M260 210c110-110 260-155 380-95s185 195 315 195 235-85 295-185" />
          <path strokeWidth={minor} d="M540 520c50-50 140-60 215-30s120 70 220 70 140-25 200-75" />
        </g>
      </svg>
    </div>
  );
}
