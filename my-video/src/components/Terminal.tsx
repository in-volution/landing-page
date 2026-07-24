import { useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { LOG, BEATS } from "../lib/choreography";
import { colors, accents, fonts } from "../theme";

export const Terminal: React.FC = () => {
  const frame = useCurrentFrame();

  const elapsedSeconds = interpolate(
    frame,
    [BEATS.detector, BEATS.summary],
    [0, 0.94],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Interactive.Div
      name="Terminal panel"
      style={{
        position: "absolute",
        left: 150,
        right: 150,
        bottom: 56,
        opacity: interpolate(frame, [46, 70], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [46, 70], ["0px 18px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        background: colors.surface,
        border: `1px solid ${colors.line}`,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 26px",
          borderBottom: `1px solid ${colors.lineSoft}`,
          fontFamily: fonts.mono,
          fontSize: 16,
          color: colors.faint,
        }}
      >
        <span>involut-mesh · runtime</span>
        <span style={{ color: colors.muted }}>
          t+{elapsedSeconds.toFixed(2)}s
        </span>
      </div>

      <div style={{ padding: "20px 26px 22px" }}>
        {LOG.map((entry) => (
          <TypedLine
            key={entry.id}
            frame={frame}
            startFrame={entry.startFrame}
            typeDuration={entry.typeDuration}
            glyph={entry.glyph}
            tag={entry.tag}
            tagColor={accents[entry.agent]}
            text={entry.text}
            indent={entry.indent}
          />
        ))}

        <SummaryRow frame={frame} />
      </div>
    </Interactive.Div>
  );
};

const TypedLine: React.FC<{
  frame: number;
  startFrame: number;
  typeDuration: number;
  glyph: string;
  tag: string;
  tagColor: string;
  text: string;
  indent: boolean;
}> = ({ frame, startFrame, typeDuration, glyph, tag, tagColor, text, indent }) => {
  const revealed = Math.floor(
    interpolate(frame, [startFrame, startFrame + typeDuration], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const typing = frame >= startFrame && revealed < text.length;

  return (
    <div
      style={{
        opacity: interpolate(frame, [startFrame - 4, startFrame + 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        gap: 12,
        marginTop: 10,
        paddingLeft: indent ? 24 : 0,
        borderLeft: indent ? `1px solid ${colors.line}` : "1px solid transparent",
        fontFamily: fonts.mono,
        fontSize: 19,
        lineHeight: 1.5,
        color: colors.muted,
      }}
    >
      <span style={{ color: tagColor, whiteSpace: "nowrap" }}>
        {glyph} {tag}
      </span>
      <span>
        {text.slice(0, revealed)}
        {typing ? (
          <span
            style={{
              display: "inline-block",
              width: 9,
              height: 17,
              marginLeft: 2,
              background: tagColor,
              verticalAlign: "-3px",
            }}
          />
        ) : null}
      </span>
    </div>
  );
};

const SummaryRow: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div
      style={{
        opacity: interpolate(frame, [374, 396], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 18,
        paddingTop: 16,
        borderTop: `1px solid ${colors.lineSoft}`,
        fontFamily: fonts.mono,
        fontSize: 19,
        color: colors.text,
      }}
    >
      <span>caso resuelto de extremo a extremo</span>
      <span style={{ color: colors.emerald }}>0 intervención humana</span>
    </div>
  );
};
