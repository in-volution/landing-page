import { useId } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

/**
 * The Involution isotype, traced from assets/involution-icon.png so it can be
 * animated slab by slab instead of fading in a flat PNG.
 * Native size is 90 x 443 (viewBox units).
 */
const TOP_SLAB = "M 0 68.6 L 90 0 L 90 162 L 0 230.6 Z";
const BOTTOM_SLAB = "M 0 251.6 L 90 183 L 90 374 L 0 442.6 Z";
const ACCENT = "M 31 280.3 L 59 306.3 L 59 398.3 L 31 419.3 Z";

export const MARK_ASPECT = 90 / 443;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Props = {
  /** Rendered height in px; width follows the logo aspect ratio. */
  height: number;
  /** Frame at which the two slabs start sliding together. */
  assembleAt: number;
  /** Frame at which the blue accent wipes up inside the lower slab. */
  accentAt: number;
  /**
   * Stretches every internal beat of the assembly. 1 is the original snappy
   * timing; higher values let the mark build slowly, which is what the hero
   * loop wants.
   */
  pace?: number;
  /** Slab colour — white on the dark hero background. */
  color?: string;
  accentColor?: string;
};

export const InvolutionMark: React.FC<Props> = ({
  height,
  assembleAt,
  accentAt,
  pace = 1,
  color = "#ffffff",
  accentColor = "#3b58f5",
}) => {
  const frame = useCurrentFrame();
  const clipId = useId();

  /** Internal beat offsets, all scaled by `pace`. */
  const step = (frames: number) => Math.round(frames * pace);

  return (
    <svg
      viewBox="0 0 90 443"
      style={{ height, width: height * MARK_ASPECT, overflow: "visible" }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            x={0}
            width={90}
            y={interpolate(frame, [accentAt, accentAt + step(18)], [443, 260], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            })}
            height={443}
          />
        </clipPath>
      </defs>

      <path
        d={TOP_SLAB}
        fill={color}
        style={{
          opacity: interpolate(
            frame,
            [assembleAt, assembleAt + step(10)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          translate: interpolate(
            frame,
            [assembleAt, assembleAt + step(22)],
            ["46px -60px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            },
          ),
        }}
      />

      <path
        d={BOTTOM_SLAB}
        fill={color}
        style={{
          opacity: interpolate(
            frame,
            [assembleAt + step(4), assembleAt + step(14)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          translate: interpolate(
            frame,
            [assembleAt + step(4), assembleAt + step(26)],
            ["-46px 60px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            },
          ),
        }}
      />

      <path d={ACCENT} fill={accentColor} clipPath={`url(#${clipId})`} />
    </svg>
  );
};
