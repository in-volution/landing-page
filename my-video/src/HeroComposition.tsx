import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Interactive,
} from "remotion";
import { DotGridBackground } from "./components/DotGridBackground";
import { InvolutionMark } from "./components/InvolutionMark";
import { BEAT, DURATION, MARK_PACE } from "./lib/heroLoop";
import { colors } from "./theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const BREATHE = Easing.inOut(Easing.ease);

/**
 * Wordmark geometry, measured on public/involution-logo-white.png (1469x466)
 * and scaled to a 300px-tall lockup so the mark SVG and the PNG wordmark line
 * up exactly as in the official logo.
 */
const LOCKUP_SCALE = 300 / 466;
const LOGO_PNG_HEIGHT = 300;
const MARK_HEIGHT = Math.round(441 * LOCKUP_SCALE);
const WORDMARK_WIDTH = Math.round(1212 * LOCKUP_SCALE);
const WORDMARK_OFFSET = Math.round(244 * LOCKUP_SCALE);
const LOCKUP_GAP = Math.round(141 * LOCKUP_SCALE);

/** Midpoint of the breath, so the loop inhales and exhales exactly once. */
const BREATH_PEAK = Math.round((BEAT.settled + DURATION) / 2);

/**
 * Hero background loop: nothing but the logo. The mark assembles, the accent
 * wipes up, the wordmark reveals, and then the finished lockup breathes for the
 * rest of the clip before fading back to the background so the loop restarts
 * invisibly.
 */
export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <DotGridBackground drift />

      {/* Soft pool of light that swells with the breath, so the held frame
          never reads as a frozen image. */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 42% 46% at 50% 50%, rgba(59,88,245,0.16), transparent 70%)`,
          opacity: interpolate(
            frame,
            [BEAT.accentIn, BEAT.settled, BREATH_PEAK, DURATION],
            [0, 0.6, 1, 0.6],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: BREATHE,
            },
          ),
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Interactive.Div
          name="Logo lockup"
          style={{
            display: "flex",
            alignItems: "center",
            gap: interpolate(
              frame,
              [BEAT.wordmarkIn, BEAT.settled],
              [0, LOCKUP_GAP],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              },
            ),
            scale: interpolate(
              frame,
              [BEAT.settled, BREATH_PEAK, DURATION],
              [1, 1.022, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: BREATHE,
              },
            ),
          }}
        >
          <InvolutionMark
            height={MARK_HEIGHT}
            assembleAt={BEAT.markIn}
            accentAt={BEAT.accentIn}
            pace={MARK_PACE}
          />

          <Interactive.Div
            name="Wordmark"
            style={{
              height: LOGO_PNG_HEIGHT,
              overflow: "hidden",
              width: interpolate(
                frame,
                [BEAT.wordmarkIn, BEAT.settled],
                [0, WORDMARK_WIDTH],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE,
                },
              ),
            }}
          >
            <Img
              src={staticFile("involution-logo-white.png")}
              style={{
                height: LOGO_PNG_HEIGHT,
                maxWidth: "none",
                marginLeft: -WORDMARK_OFFSET,
              }}
            />
          </Interactive.Div>
        </Interactive.Div>
      </AbsoluteFill>

      {/* Fade back to the empty background so the loop restarts invisibly. */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.bg,
          opacity: interpolate(frame, [BEAT.loopOut, DURATION], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          }),
        }}
      />
    </AbsoluteFill>
  );
};
