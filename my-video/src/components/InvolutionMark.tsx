import { useId } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { colors } from "../theme";

/**
 * The Involution isotype from the Despliegue brand system, rebuilt so it can be
 * deployed arm by arm instead of fading in a flat asset.
 *
 * Geometry is copied verbatim from
 * assets/brand/despliegue/involution-isotype-color.svg, so the animated mark and
 * the static logo files are the same shape.
 */
const OUTER = "M8 56V8h48v10H18v38H8Z";
const INNER = "M23 49V23h26v10H33v16H23Z";

/** Each bracket unfolds from its own corner, outward along both arms. */
const OUTER_CORNER = { x: 8, y: 8, span: 48, thickness: 10 };
const INNER_CORNER = { x: 23, y: 23, span: 26, thickness: 10 };

/** The accent square, which lands last inside the inner bracket. */
const ACCENT = { x: 38, y: 38, size: 12, radius: 2 };

export const MARK_ASPECT = 1;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Props = {
  /** Rendered height in px; the mark is square. */
  height: number;
  /** Frame at which the outer bracket starts unfolding. */
  assembleAt: number;
  /** Frame at which the blue accent square lands. */
  accentAt: number;
  /**
   * Stretches every internal beat of the assembly. 1 is the original snappy
   * timing; higher values let the mark build slowly, which is what the hero
   * loop wants.
   */
  pace?: number;
  /** Bracket colour — white on the dark hero background. */
  color?: string;
  accentColor?: string;
};

export const InvolutionMark: React.FC<Props> = ({
  height,
  assembleAt,
  accentAt,
  pace = 1,
  color = "#ffffff",
  accentColor = colors.brand,
}) => {
  const frame = useCurrentFrame();
  const outerClip = useId();
  const innerClip = useId();

  /** Internal beat offsets, all scaled by `pace`. */
  const step = (frames: number) => Math.round(frames * pace);

  /**
   * Both arms of a bracket grow from the shared corner at once, so it reads as
   * one gesture unfolding rather than two lines drawing.
   */
  const unfold = (startAt: number, duration: number) =>
    interpolate(frame, [startAt, startAt + step(duration)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    });

  /* El ángulo interior arranca a mitad del exterior, y ambos cierran justo
     antes de `accentAt`, para que el cuadrado sea el último gesto. */
  const outer = unfold(assembleAt, 16);
  const inner = unfold(assembleAt + step(9), 16);

  /** The square lands with a small overshoot so it reads as a click into place. */
  const accentScale = interpolate(
    frame,
    [accentAt, accentAt + step(9), accentAt + step(16)],
    [0, 1.18, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE,
    },
  );

  const bracketClip = (
    id: string,
    { x, y, span, thickness }: typeof OUTER_CORNER,
    progress: number,
  ) => (
    <clipPath id={id}>
      {/* Horizontal arm, growing right from the corner. */}
      <rect x={x} y={y} width={span * progress} height={thickness} />
      {/* Vertical arm, growing down from the same corner. */}
      <rect x={x} y={y} width={thickness} height={span * progress} />
    </clipPath>
  );

  return (
    <svg
      viewBox="0 0 64 64"
      style={{ height, width: height * MARK_ASPECT, overflow: "visible" }}
    >
      <defs>
        {bracketClip(outerClip, OUTER_CORNER, outer)}
        {bracketClip(innerClip, INNER_CORNER, inner)}
      </defs>

      <path d={OUTER} fill={color} clipPath={`url(#${outerClip})`} />
      <path d={INNER} fill={color} clipPath={`url(#${innerClip})`} />

      <rect
        x={ACCENT.x}
        y={ACCENT.y}
        width={ACCENT.size}
        height={ACCENT.size}
        rx={ACCENT.radius}
        fill={accentColor}
        style={{
          transformOrigin: `${ACCENT.x + ACCENT.size / 2}px ${ACCENT.y + ACCENT.size / 2}px`,
          transform: `scale(${accentScale})`,
        }}
      />
    </svg>
  );
};
