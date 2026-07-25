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
 * Lockup geometry, read straight off the official horizontal logo
 * (assets/brand/despliegue/involution-logo-horizontal-color.svg, viewBox
 * 460x128) so the animated mark and the static logo files agree exactly.
 *
 * In those units: the symbol occupies 16..112 on both axes, and the wordmark
 * runs 132..457 horizontally and 35..87 vertically.
 */
const SYMBOL_SPAN = 96;
const WORDMARK_SPAN = { width: 325.37, height: 51.98 };
const LOCKUP_GAP_UNITS = 132 - 112;
/** The wordmark sits slightly above the symbol's centre line in the real logo. */
const WORDMARK_RISE_UNITS = 64 - (35.02 + WORDMARK_SPAN.height / 2);

/** Everything below is those units scaled to a 300px-tall symbol. */
const MARK_HEIGHT = 300;
const LOCKUP_SCALE = MARK_HEIGHT / SYMBOL_SPAN;
const WORDMARK_WIDTH = Math.round(WORDMARK_SPAN.width * LOCKUP_SCALE);
const WORDMARK_HEIGHT = Math.round(WORDMARK_SPAN.height * LOCKUP_SCALE);
const LOCKUP_GAP = Math.round(LOCKUP_GAP_UNITS * LOCKUP_SCALE);
const WORDMARK_RISE = Math.round(WORDMARK_RISE_UNITS * LOCKUP_SCALE);

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
          background: `radial-gradient(ellipse 42% 46% at 50% 50%, rgba(49,85,255,0.18), transparent 70%)`,
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
              height: WORDMARK_HEIGHT,
              marginBottom: WORDMARK_RISE * 2,
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
              src={staticFile("involution-wordmark-white.svg")}
              style={{
                height: WORDMARK_HEIGHT,
                width: WORDMARK_WIDTH,
                maxWidth: "none",
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
