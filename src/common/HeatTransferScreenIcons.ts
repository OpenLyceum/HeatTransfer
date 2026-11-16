/**
 * HeatTransferScreenIcons.ts
 *
 * Home-screen and navigation-bar icons, drawn programmatically on the standard
 * PhET 548 x 373 canvas.
 *
 * Each icon is a miniature of what its screen actually shows, using the same
 * colour ramp the field uses, so the home screen reads as a progression: a plain
 * temperature field, then the same field with flux arrows, then with a flow, then
 * with both, then with a material barrier through it. Nothing here imports the
 * field engine — these are static gradients and shapes, cheap enough to build
 * five of at startup.
 */
import { Shape } from "scenerystack/kite";
import { Circle, LinearGradient, Node, Path, RadialGradient, Rectangle } from "scenerystack/scenery";
import { ScreenIcon } from "scenerystack/sim";
import HeatTransferColors from "../HeatTransferColors.js";
import { HEAT_TRANSFER_SCREEN_ICONS_SETTINGS } from "../HeatTransferConstants.js";
import { rgbToCss, sampleColorMap } from "./field/ColorMap.js";

/** Icon canvas width. */
const W = 548;

/** Icon canvas height. */
const H = 373;

/** A colour from the temperature ramp, as a CSS string. */
function rampColor(position: number): string {
  return rgbToCss(sampleColorMap(position));
}

function background(): Rectangle {
  return new Rectangle(0, 0, W, H, { fill: HeatTransferColors.backgroundColorProperty });
}

/** A hot blob at (x, y) fading to ambient — the motif every icon is built from. */
function hotSpot(x: number, y: number, radius: number, peak = 1): Node {
  const gradient = new RadialGradient(x, y, 0, x, y, radius)
    .addColorStop(0, rampColor(peak))
    .addColorStop(0.45, rampColor(peak * 0.65))
    .addColorStop(1, rampColor(0.28));
  return new Circle(radius, { x, y, fill: gradient });
}

/** The field tile every icon sits on: a cool background with a warm corner. */
function fieldTile(): Node {
  const tile = new Rectangle(0, 0, W, H, { fill: rampColor(0.28) });
  return new Node({ children: [tile] });
}

function iconFrom(content: Node): ScreenIcon {
  return new ScreenIcon(content, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1,
    fill: HeatTransferColors.backgroundColorProperty,
  });
}

/** Temperature: a single hot spot on a cool plate. */
export function createTemperatureIcon(): ScreenIcon {
  return iconFrom(
    new Node({
      children: [
        background(),
        fieldTile(),
        hotSpot(W / 2, H / 2, HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_TEMPERATURE_ICON_RADIUS),
      ],
    }),
  );
}

/** Conduction: a hot spot with flux arrows radiating outward. */
export function createConductionIcon(): ScreenIcon {
  const arrows = new Shape();
  const centreX = W / 2;
  const centreY = H / 2;
  for (let n = 0; n < 8; n++) {
    const angle = (n / 8) * 2 * Math.PI;
    const inner = 95;
    const outer = 165;
    const x0 = centreX + Math.cos(angle) * inner;
    const y0 = centreY + Math.sin(angle) * inner;
    const x1 = centreX + Math.cos(angle) * outer;
    const y1 = centreY + Math.sin(angle) * outer;
    arrows.moveTo(x0, y0).lineTo(x1, y1);
    // Arrowhead
    const back = 22;
    const spread = 0.4;
    arrows
      .moveTo(x1, y1)
      .lineTo(x1 - Math.cos(angle - spread) * back, y1 - Math.sin(angle - spread) * back)
      .moveTo(x1, y1)
      .lineTo(x1 - Math.cos(angle + spread) * back, y1 - Math.sin(angle + spread) * back);
  }

  return iconFrom(
    new Node({
      children: [
        background(),
        fieldTile(),
        hotSpot(centreX, centreY, HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONDUCTION_ICON_RADIUS),
        new Path(arrows, {
          stroke: HeatTransferColors.heatFluxColorProperty,
          lineWidth: HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONDUCTION_ICON_LINE_WIDTH,
          lineCap: "round",
        }),
      ],
    }),
  );
}

/** Convection: a warm plume swept sideways, with tracer dots along the flow. */
export function createConvectionIcon(): ScreenIcon {
  const streak = new Rectangle(0, H * 0.32, W, H * 0.36, {
    fill: new LinearGradient(0, 0, W, 0)
      .addColorStop(0, rampColor(0.95))
      .addColorStop(0.55, rampColor(0.7))
      .addColorStop(1, rampColor(0.35)),
  });

  const tracers = new Node();
  for (let n = 0; n < 14; n++) {
    tracers.addChild(
      new Circle(HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONVECTION_ICON_RADIUS, {
        x:
          HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONVECTION_ICON_X_OFFSET +
          n * HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONVECTION_ICON_X_FACTOR,
        y: n % 2 === 0 ? H * HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONVECTION_ICON_Y_FACTOR : H * 0.8,
        fill: HeatTransferColors.particleColorProperty,
        opacity: HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONVECTION_ICON_OPACITY,
      }),
    );
  }

  return iconFrom(
    new Node({
      children: [
        background(),
        fieldTile(),
        streak,
        hotSpot(90, H / 2, HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_CONVECTION_ICON_RADIUS_SEGMENT_2),
        tracers,
      ],
    }),
  );
}

/** Heat Transfer: a hot spot both spreading and being swept downstream. */
export function createHeatTransferIcon(): ScreenIcon {
  const comet = new Shape()
    .moveTo(HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.COMET_X, H / 2 - 105)
    .quadraticCurveTo(HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.COMET_CONTROL_X, H / 2 - 55, W - 40, H / 2)
    .quadraticCurveTo(
      HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.COMET_CONTROL_X,
      H / 2 + 55,
      HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.COMET_END_X,
      H / 2 + 105,
    )
    .close();

  return iconFrom(
    new Node({
      children: [
        background(),
        fieldTile(),
        new Path(comet, {
          fill: new LinearGradient(130, 0, W - 40, 0)
            .addColorStop(0, rampColor(1))
            .addColorStop(0.5, rampColor(0.72))
            .addColorStop(1, rampColor(0.36)),
        }),
        hotSpot(150, H / 2, HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_HEAT_TRANSFER_ICON_RADIUS),
      ],
    }),
  );
}

/** Materials: a hot half and a cool half separated by an insulating bar. */
export function createMaterialsIcon(): ScreenIcon {
  return iconFrom(
    new Node({
      children: [
        background(),
        fieldTile(),
        hotSpot(W * 0.24, H / 2, HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_RADIUS),
        new Rectangle(
          W * 0.45,
          HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_Y,
          HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_WIDTH,
          H - 80,
          HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_CORNER_X,
          HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_CORNER_Y,
          {
            fill: HeatTransferColors.panelBackgroundColorProperty,
            stroke: HeatTransferColors.fieldBorderColorProperty,
            lineWidth: HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_LINE_WIDTH,
          },
        ),
        hotSpot(W * 0.82, H / 2, HEAT_TRANSFER_SCREEN_ICONS_SETTINGS.CREATE_MATERIALS_ICON_RADIUS_SEGMENT_2, 0.42),
      ],
    }),
  );
}
