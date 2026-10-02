/**
 * BrushControlPanel.ts
 *
 * What the brush deposits, and how big it is.
 *
 * The heat/cool pair is a radio group rather than a toggle so that both states
 * are visible at once — a student choosing between heating and cooling should not
 * have to press a button to discover what the other option was. The size slider
 * is in fractions of the plate, not cells, so it means the same thing at every
 * grid resolution.
 */

import { Range } from "scenerystack/dot";
import { type Node, Text, VBox } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import { RectangularRadioButtonGroup, type RectangularRadioButtonGroupItem } from "scenerystack/sun";
import HeatTransferColors from "../../HeatTransferColors.js";
import {
  CONTROL_PANEL_WIDTH,
  LABEL_FONT_SIZE,
  MAX_BRUSH_RADIUS_FRACTION,
  MIN_BRUSH_RADIUS_FRACTION,
} from "../../HeatTransferConstants.js";
import HeatTransferNamespace from "../../HeatTransferNamespace.js";
import { StringManager } from "../../i18n/StringManager.js";
import { HeatTransferPanel, type HeatTransferPanelOptions, PANEL_X_MARGIN } from "../HeatTransferPanel.js";
import { BrushMode, type BrushModeId, type FieldSimulationModel } from "../model/FieldSimulationModel.js";
import { labelledSlider, panelTitle } from "./ControlFactory.js";

/** Brush-mode button row: gap between buttons, and their side margins, px. */
const BUTTON_SPACING = 8;
const BUTTON_X_MARGIN = 16;
const MATERIAL_MODE_BUTTON_X_MARGIN = 6;
/** Room left for the selected-button stroke on both sides, px. */
const BUTTON_STROKE_ALLOWANCE = 4;

export class BrushControlPanel extends HeatTransferPanel {
  /** The interactive children, in traversal order, for the ScreenView's `pdomOrder`. */
  public readonly controls: readonly Node[];

  /**
   * @param model - the screen's field model
   * @param includeMaterialMode - add a third mode that paints material instead of
   *   temperature; only the Materials screen has a material field worth painting
   * @param providedOptions - ordinary Panel options
   */
  public constructor(
    model: FieldSimulationModel,
    includeMaterialMode = false,
    providedOptions?: HeatTransferPanelOptions,
  ) {
    const strings = StringManager.getInstance();
    const controls = strings.getControls();
    const a11y = strings.getSharedA11yStrings();

    // The buttons share one row inside a panel of CONTROL_PANEL_WIDTH, so each
    // label gets an equal share of it; a longer translation scales down rather
    // than widening the panel into the next control column.
    const buttonCount = includeMaterialMode ? 3 : 2;
    const buttonXMargin = includeMaterialMode ? MATERIAL_MODE_BUTTON_X_MARGIN : BUTTON_X_MARGIN;
    const rowWidth = CONTROL_PANEL_WIDTH - 2 * PANEL_X_MARGIN - (buttonCount - 1) * BUTTON_SPACING;
    const labelMaxWidth = rowWidth / buttonCount - 2 * buttonXMargin - BUTTON_STROKE_ALLOWANCE;

    const modeItems: RectangularRadioButtonGroupItem<BrushModeId>[] = [
      {
        value: BrushMode.HEAT,
        createNode: () => radioLabel(controls.heatStringProperty, labelMaxWidth),
        options: { accessibleName: controls.heatStringProperty },
      },
      {
        value: BrushMode.COOL,
        createNode: () => radioLabel(controls.coolStringProperty, labelMaxWidth),
        options: { accessibleName: controls.coolStringProperty },
      },
    ];
    if (includeMaterialMode) {
      modeItems.push({
        value: BrushMode.MATERIAL,
        createNode: () => radioLabel(controls.paintMaterialStringProperty, labelMaxWidth),
        options: { accessibleName: controls.paintMaterialStringProperty },
      });
    }

    const modeGroup = new RectangularRadioButtonGroup<BrushModeId>(model.brushModeProperty, modeItems, {
      orientation: "horizontal",
      spacing: BUTTON_SPACING,
      accessibleName: controls.brushStringProperty,
      accessibleHelpText: a11y.controls.brushModeStringProperty,
      radioButtonOptions: {
        baseColor: HeatTransferColors.controlSurfaceColorProperty,
        xMargin: buttonXMargin,
        yMargin: 6,
        buttonAppearanceStrategyOptions: {
          selectedStroke: HeatTransferColors.accentColorProperty,
          selectedLineWidth: 3,
        },
      },
    });

    const size = labelledSlider({
      label: controls.brushSizeStringProperty,
      property: model.brushRadiusProperty,
      range: new Range(MIN_BRUSH_RADIUS_FRACTION, MAX_BRUSH_RADIUS_FRACTION),
      accessibleName: controls.brushSizeStringProperty,
      accessibleHelpText: a11y.controls.brushSizeStringProperty,
    });

    super(
      new VBox({
        align: "left",
        spacing: 9,
        children: [panelTitle(controls.brushStringProperty), modeGroup, size.node],
      }),
      providedOptions,
    );

    this.controls = [modeGroup, size.slider];
  }
}

/** A radio-button label, drawn on the white control surface. */
function radioLabel(label: Parameters<typeof panelTitle>[0], maxWidth: number): Text {
  return new Text(label, {
    font: new PhetFont({ size: LABEL_FONT_SIZE, weight: "bold" }),
    fill: HeatTransferColors.controlSurfaceTextColorProperty,
    maxWidth: maxWidth,
  });
}

HeatTransferNamespace.register("BrushControlPanel", BrushControlPanel);
