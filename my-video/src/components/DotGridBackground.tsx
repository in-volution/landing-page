import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

/** Matches `backgroundSize`, so a full cell of drift loops seamlessly. */
const CELL = 32;

type Props = {
  /**
   * When true the grid creeps down by exactly one cell across the whole
   * composition, which keeps a long static shot alive without drawing the eye.
   */
  drift?: boolean;
};

export const DotGridBackground: React.FC<Props> = ({ drift = false }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <AbsoluteFill
        style={{
          opacity: 0.55,
          backgroundImage: `radial-gradient(${colors.line} 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`,
          backgroundPosition: drift
            ? interpolate(
                frame,
                [0, durationInFrames],
                [`0px 0px`, `0px ${CELL}px`],
              )
            : undefined,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000, transparent 78%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
