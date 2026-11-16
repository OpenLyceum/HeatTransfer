/**
 * HeatTransferConstants.ts
 *
 * Every named numeric constant used across the simulation.
 *
 * Conventions
 * ───────────
 *  - Physics / model values use SI units; the unit is named in the comment or
 *    the identifier suffix (`_M`, `_S`, `_K`, `_W_PER_M_K`, …).
 *  - Layout / chrome values are in screen pixels of the 1024 x 618 layout bounds.
 *  - Colours live in HeatTransferColors.ts, not here.
 */

import HeatTransferNamespace from "./HeatTransferNamespace.js";

// ── Layout / chrome (screen pixels) ───────────────────────────────────────────

/** Margin between the screen edge and edge-anchored controls (e.g. Reset All). */
export const SCREEN_VIEW_MARGIN = 20;

/** Corner radius shared by control panels and dialogs. */
export const PANEL_CORNER_RADIUS = 6;

/** Vertical spacing between stacked control panels. */
export const PANEL_SPACING = 10;

/** Side length of the square field view, in screen pixels. */
export const FIELD_VIEW_SIZE = 480;

/** Left edge of the field view. */
export const FIELD_VIEW_LEFT = 25;

/** Top edge of the field view. */
export const FIELD_VIEW_TOP = 55;

/** Left edge of the temperature legend, just right of the field. */
export const LEGEND_LEFT = 517;

/** Left edge of the first control column. */
export const CONTROL_COLUMN_LEFT = 590;

/** Left edge of the second control column. */
export const CONTROL_COLUMN_RIGHT = 804;

/** Minimum width of a control panel. Two columns of this fill the control area. */
export const CONTROL_PANEL_WIDTH = 200;

/** Full width of the control area, spanning both columns. */
export const CONTROL_AREA_WIDTH = 414;

/** Top of the full-width area under the control columns, used for the graph. */
export const WIDE_AREA_TOP = 385;

/** Font size for panel titles. */
export const TITLE_FONT_SIZE = 15;

/** Font size for ordinary control labels and readouts. */
export const LABEL_FONT_SIZE = 13;

/** Font size for small annotations (legend ticks, units). */
export const SMALL_FONT_SIZE = 11;

// ── Grid resolution ───────────────────────────────────────────────────────────

/**
 * Named grid resolutions. The simulation is resolution-agnostic: these only
 * choose how many cells the field engine allocates. The CPU fallback backend is
 * clamped to {@link MAX_CPU_RESOLUTION} because it evolves the field on the main
 * thread.
 */
export const RESOLUTION_PRESETS = {
  classroom: 128,
  high: 512,
  large: 1024,
  extreme: 2048,
} as const;

export type ResolutionPresetId = keyof typeof RESOLUTION_PRESETS;

/** Preset order for UI controls (coarse to fine). */
export const RESOLUTION_PRESET_ORDER: readonly ResolutionPresetId[] = ["classroom", "high", "large", "extreme"];

/** The CPU fallback backend never allocates a grid finer than this. */
export const MAX_CPU_RESOLUTION = 128;

/** Resolution used when nothing else is specified. */
export const DEFAULT_RESOLUTION: ResolutionPresetId = "classroom";

// ── Time integration ──────────────────────────────────────────────────────────

/**
 * Safety factor on the explicit-diffusion stability limit. The 2-D five-point
 * Laplacian is stable for alpha*dt*(1/dx^2 + 1/dy^2) <= 1/2; staying at 40% of
 * that keeps the scheme well away from the boundary on non-square cells.
 */
export const DIFFUSION_CFL = 0.4;

/**
 * Courant number for advection. Semi-Lagrangian backtracing is unconditionally
 * stable, but accuracy degrades once a parcel jumps more than a cell or two per
 * substep, so the substep is also capped by |v| dt / dx <= this.
 */
export const ADVECTION_CFL = 1.0;

/**
 * Diffusion substeps taken per animation frame at normal speed. The simulation
 * always integrates at the stability-limited step, so this — not a wall-clock
 * target — is what sets how fast the field evolves on screen. See doc/model.md.
 */
export const SUBSTEPS_PER_FRAME = 8;

/** Multiplier applied to {@link SUBSTEPS_PER_FRAME} for TimeControlNode's slow speed. */
export const SLOW_SPEED_FACTOR = 0.25;

/** Largest frame delta the model will accept, in seconds (guards against tab-switch jumps). */
export const MAX_FRAME_DT = 1 / 20;

// ── Temperature ───────────────────────────────────────────────────────────────

/** Ambient / initial temperature of the plate, in kelvin (20 degrees Celsius). */
export const AMBIENT_TEMPERATURE_K = 293.15;

/** Coldest temperature the colour map resolves, in kelvin (-20 degrees Celsius). */
export const MIN_TEMPERATURE_K = 253.15;

/** Hottest temperature the colour map resolves, in kelvin (180 degrees Celsius). */
export const MAX_TEMPERATURE_K = 453.15;

/** Offset between kelvin and degrees Celsius. */
export const KELVIN_TO_CELSIUS_OFFSET = 273.15;

/** Temperature deposited by the heat brush at full strength, in kelvin (matches MAX_TEMPERATURE_K). */
export const HOT_BRUSH_TEMPERATURE_K = 453.15;

/** Temperature deposited by the cool brush at full strength, in kelvin (matches MIN_TEMPERATURE_K). */
export const COOL_BRUSH_TEMPERATURE_K = 253.15;

/** Spacing between isotherm contour lines, in kelvin. */
export const ISOTHERM_INTERVAL_K = 10;

// ── Brush ─────────────────────────────────────────────────────────────────────

/** Brush radius as a fraction of the domain's shorter side. */
export const DEFAULT_BRUSH_RADIUS_FRACTION = 0.08;

/** Smallest selectable brush radius, as a fraction of the domain's shorter side. */
export const MIN_BRUSH_RADIUS_FRACTION = 0.02;

/** Largest selectable brush radius, as a fraction of the domain's shorter side. */
export const MAX_BRUSH_RADIUS_FRACTION = 0.2;

/**
 * Fraction of the way to the brush temperature that a single application moves a
 * cell at the brush centre. Repeated strokes saturate rather than overshoot.
 */
export const BRUSH_STRENGTH = 0.35;

// ── Flow ──────────────────────────────────────────────────────────────────────

/** Flow speed at the "fast" end of the speed control, in metres per second. */
export const MAX_FLOW_SPEED = 0.01;

/** Default flow speed, in metres per second. */
export const DEFAULT_FLOW_SPEED = 0.002;

// ── Visualization ─────────────────────────────────────────────────────────────

/** Number of heat-flux arrows across the field, per axis. */
export const FLUX_ARROW_COUNT = 20;

/** Longest an arrow may be drawn, as a fraction of the field's on-screen size. */
export const MAX_ARROW_LENGTH_FRACTION = 0.055;

/** Number of tracer particles used to visualize the velocity field. */
export const PARTICLE_COUNT = 1800;

/** Tracer particle lifetime, in seconds, before it respawns at a random position. */
export const PARTICLE_LIFETIME_S = 6;

/** How many animation frames pass between GPU-to-CPU field readbacks. */
export const READBACK_FRAME_INTERVAL = 4;

/** Number of samples taken along the cross-section line. */
export const CROSS_SECTION_SAMPLES = 128;

/** Backing-canvas resolution multiplier shared by every screen model (high-DPI crispness). */
export const CANVAS_SCALE = 2;

/** Settings for common/HeatTransferPanel.ts. */
export const HEAT_TRANSFER_PANEL_SETTINGS = {
  /** Panel x margin (px). */
  PANEL_X_MARGIN: 12,
  /** Options y margin (px). */
  OPTIONS_Y_MARGIN: 10,
} as const;

/** Settings for common/HeatTransferScreenIcons.ts. */
export const HEAT_TRANSFER_SCREEN_ICONS_SETTINGS = {
  CREATE_CONVECTION_ICON_X_OFFSET: 30, // px
  CREATE_CONVECTION_ICON_X_FACTOR: 38, // dimensionless
  CREATE_CONVECTION_ICON_Y_FACTOR: 0.2, // dimensionless

  CREATE_TEMPERATURE_ICON_RADIUS: 190, // px
  CREATE_CONDUCTION_ICON_RADIUS: 150, // px
  CREATE_CONVECTION_ICON_RADIUS_SEGMENT_2: 110, // px
  CREATE_HEAT_TRANSFER_ICON_RADIUS: 95, // px
  CREATE_MATERIALS_ICON_RADIUS: 165, // px
  CREATE_MATERIALS_ICON_RADIUS_SEGMENT_2: 130, // px

  /** Create conduction icon line width (px). */
  CREATE_CONDUCTION_ICON_LINE_WIDTH: 9,
  /** Create convection icon radius (px). */
  CREATE_CONVECTION_ICON_RADIUS: 7,
  /** Create convection icon opacity (dimensionless). */
  CREATE_CONVECTION_ICON_OPACITY: 0.85,
  /** Comet x (px). */
  COMET_X: 130,
  /** Comet control x (px). */
  COMET_CONTROL_X: 360,
  /** Comet end x (px). */
  COMET_END_X: 130,
  /** Create materials icon y (px). */
  CREATE_MATERIALS_ICON_Y: 40,
  /** Create materials icon width (px). */
  CREATE_MATERIALS_ICON_WIDTH: 62,
  /** Create materials icon corner x (px). */
  CREATE_MATERIALS_ICON_CORNER_X: 8,
  /** Create materials icon corner y (px). */
  CREATE_MATERIALS_ICON_CORNER_Y: 8,
  /** Create materials icon line width (px). */
  CREATE_MATERIALS_ICON_LINE_WIDTH: 5,
} as const;

/** Settings for common/field/SimulationDomain.ts. */
export const SIMULATION_DOMAIN_SETTINGS = {
  /** Default physical size (m). */
  DEFAULT_PHYSICAL_SIZE: 0.1,
} as const;

/** Settings for common/field/VelocityPresets.ts. */
export const VELOCITY_PRESETS_SETTINGS = {
  /** Radius of the vortex core, as a fraction of the domain's shorter side. */
  VORTEX_CORE_RADIUS: 0.22,
} as const;

/** Settings for common/field/cpu/CpuFieldRenderer.ts. */
export const CPU_FIELD_RENDERER_SETTINGS = {
  /** Entries in the colour lookup table built once per style change. */
  COLOR_LUT_SIZE: 256,
  /** How much of the way to white the gradient layer lifts a pixel at full strength. */
  GRADIENT_LIFT: 0.55,
  /** Opacity of the material tint overlay. */
  MATERIAL_TINT_ALPHA: 0.35,
  /** Radius of a tracer particle, in display pixels. */
  PARTICLE_RADIUS: 1.6,
} as const;

/** Settings for common/field/gpu/GpuContext.ts. */
export const GPU_CONTEXT_SETTINGS = {
  /** Edge length of the throwaway canvas used by the presentation check. */
  PRESENTATION_PROBE_SIZE: 4,
} as const;

/** Settings for common/field/gpu/WebGpuFieldEngine.ts. */
export const WEB_GPU_FIELD_ENGINE_SETTINGS = {
  /** Floats per particle in the storage buffer: (u, v, life, seed). */
  PARTICLE_STRIDE: 4,
  /** Radius of a tracer particle in clip-space units. */
  PARTICLE_CLIP_SIZE: 0.006,
} as const;

/** Settings for common/view/BrushControlPanel.ts. */
export const BRUSH_CONTROL_PANEL_SETTINGS = {
  /** Brush-mode button row: gap between buttons, and their side margins, px. */
  BUTTON_SPACING: 8,
  /** Button x margin (px). */
  BUTTON_X_MARGIN: 16,
  /** Material mode button x margin (px). */
  MATERIAL_MODE_BUTTON_X_MARGIN: 6,
  /** Room left for the selected-button stroke on both sides, px. */
  BUTTON_STROKE_ALLOWANCE: 4,
  /** Mode group y margin (px). */
  MODE_GROUP_Y_MARGIN: 6,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 9,
} as const;

/** Settings for common/view/ControlFactory.ts. */
export const CONTROL_FACTORY_SETTINGS = {
  COMBO_BOX_LABEL_MAX_WIDTH_OFFSET: 40, // px

  /** Slider track height (px). */
  SLIDER_TRACK_HEIGHT: 4,
  /** Slider width (px). */
  SLIDER_WIDTH: 13,
  /** Slider height (px). */
  SLIDER_HEIGHT: 24,
  /** Labelled slider spacing (px). */
  LABELLED_SLIDER_SPACING: 5,
  /** Themed checkbox spacing (px). */
  THEMED_CHECKBOX_SPACING: 8,
  /** Themed combo box x margin (px). */
  THEMED_COMBO_BOX_X_MARGIN: 10,
  /** Themed combo box y margin (px). */
  THEMED_COMBO_BOX_Y_MARGIN: 5,
} as const;

/** Settings for common/view/CrossSectionGraphNode.ts. */
export const CROSS_SECTION_GRAPH_NODE_SETTINGS = {
  CONSTRUCTOR_LINE_DASH_DASH: 4, // px
  CONSTRUCTOR_TOP_OFFSET: 4, // px

  /** Plot margin left (px). */
  PLOT_MARGIN_LEFT: 34,
  /** Plot margin right (px). */
  PLOT_MARGIN_RIGHT: 12,
  /** Plot margin top (px). */
  PLOT_MARGIN_TOP: 10,
  /** Plot margin bottom (px). */
  PLOT_MARGIN_BOTTOM: 22,
  /** Number of horizontal gridlines. */
  GRIDLINE_COUNT: 4,
  /** Background corner x (px). */
  BACKGROUND_CORNER_X: 4,
  /** Background corner y (px). */
  BACKGROUND_CORNER_Y: 4,
  /** Constructor line width (px). */
  CONSTRUCTOR_LINE_WIDTH: 0.5,
  /** Constructor opacity (dimensionless). */
  CONSTRUCTOR_OPACITY: 0.5,
  /** Constructor right (px). */
  CONSTRUCTOR_RIGHT: -5,
  /** Flux curve line width (px). */
  FLUX_CURVE_LINE_WIDTH: 1.5,
  /** Temperature curve line width (px). */
  TEMPERATURE_CURVE_LINE_WIDTH: 2,
  /** Bottom inset for the graph title (px). */
  TITLE_BOTTOM: -3,
  /** Y axis label right (px). */
  Y_AXIS_LABEL_RIGHT: 10,
} as const;

/** Settings for common/view/CrossSectionToolNode.ts. */
export const CROSS_SECTION_TOOL_NODE_SETTINGS = {
  /** Cross-section line dash length (px). */
  LINE_DASH: 7, // px
  /** Cross-section line gap length (px). */
  LINE_GAP: 4, // px

  /** Radius of a drag handle, in view coordinates. */
  HANDLE_RADIUS: 8,
  /** How far one keyboard drag step moves a handle, as a fraction of the field. */
  KEYBOARD_SCALE: 0.5,
  /** Cross-section line stroke width (px). */
  LINE_WIDTH: 2.5,
  /** Handle line width (px). */
  HANDLE_LINE_WIDTH: 1.5,
} as const;

/** Settings for common/view/FieldNode.ts. */
export const FIELD_NODE_SETTINGS = {
  CONSTRUCTOR_LINE_DASH_DASH: 4, // px

  /** Fraction of the field the keyboard cursor moves per arrow-key press. */
  KEYBOARD_STEP: 0.05,
  /** Finer keyboard step, used while shift is held. */
  KEYBOARD_FINE_STEP: 0.01,
  /** Keyboard position x (px). */
  KEYBOARD_POSITION_X: 0.5,
  /** Keyboard position y (px). */
  KEYBOARD_POSITION_Y: 0.5,
  /** Border line width (px). */
  BORDER_LINE_WIDTH: 1.5,
  /** Hover ring line width (px). */
  HOVER_RING_LINE_WIDTH: 1.5,
  /** Keyboard cursor line width (px). */
  KEYBOARD_CURSOR_LINE_WIDTH: 2,
} as const;

/** Settings for common/view/FieldScreenView.ts. */
export const FIELD_SCREEN_VIEW_SETTINGS = {
  STATUS_NODE_TOP_OFFSET: 8, // px
  CONSTRUCTOR_TOP_OFFSET: 30, // px

  /** Clear field button max width (px). */
  CLEAR_FIELD_BUTTON_MAX_WIDTH: 120,
} as const;

/** Settings for common/view/FieldStatusNode.ts. */
export const FIELD_STATUS_NODE_SETTINGS = {
  /** Seconds per minute (s). */
  SECONDS_PER_MINUTE: 60,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 14,
} as const;

/** Settings for common/view/FlowControlPanel.ts. */
export const FLOW_CONTROL_PANEL_SETTINGS = {
  /** Slowest selectable flow, in metres per second. Zero would make the layer pointless. */
  MIN_FLOW_SPEED: 0.0002,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 9,
} as const;

/** Settings for common/view/LayerControlPanel.ts. */
export const LAYER_CONTROL_PANEL_SETTINGS = {
  CHECKBOXES_MAX_WIDTH_OFFSET: 60, // px
  TITLE_MAX_WIDTH_OFFSET: 30, // px

  /** Checkboxes spacing (px). */
  CHECKBOXES_SPACING: 8,
  /** Content spacing (px). */
  CONTENT_SPACING: 7,
} as const;

/** Settings for common/view/MaterialControlPanel.ts. */
export const MATERIAL_CONTROL_PANEL_SETTINGS = {
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for common/view/ProbeNode.ts. */
export const PROBE_NODE_SETTINGS = {
  CONSTRUCTOR_CENTER_Y_OFFSET: 6, // px

  /** Radius of the probe's ring, in view coordinates. */
  RING_RADIUS: 9,
  /** Height of the readout bubble. */
  BUBBLE_HEIGHT: 26,
  /** Fraction of the field a keyboard arrow press moves the probe. */
  KEYBOARD_STEP: 0.02,
  /** Bubble line width (px). */
  BUBBLE_LINE_WIDTH: 1.5,
  /** Ring line width (px). */
  RING_LINE_WIDTH: 2.5,
  /** Crosshair line width (px). */
  CROSSHAIR_LINE_WIDTH: 1.5,
} as const;

/** Settings for common/view/TemperatureLegendNode.ts. */
export const TEMPERATURE_LEGEND_NODE_SETTINGS = {
  LABEL_LEFT_OFFSET: 8, // px
  UNIT_TOP_OFFSET: 5, // px

  SHAPE_Y_SEGMENT_2: 4, // px

  /** Width of the colour bar, in view coordinates. */
  BAR_WIDTH: 22,
  /** Number of labelled ticks along the bar, including both ends. */
  TICK_COUNT: 5,
  /** Title max width (px). */
  TITLE_MAX_WIDTH: 90,
  /** Title bottom (px). */
  TITLE_BOTTOM: -6,
  /** Shape x (px). */
  SHAPE_X: -7,
  /** Shape y (px). */
  SHAPE_Y: -4,
} as const;

/** Settings for common/view/TransportControlPanel.ts. */
export const TRANSPORT_CONTROL_PANEL_SETTINGS = {
  /** Decades the balance slider sweeps in each direction. */
  DECADES: 2,
  /** Peclet numbers above this read as flow-dominated. */
  ADVECTION_THRESHOLD: 100,
  /** Default conduction/advection balance slider position (dimensionless, 0–1). */
  BALANCE_DEFAULT: 0.5,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for conduction/view/ConductionScreenView.ts. */
export const CONDUCTION_SCREEN_VIEW_SETTINGS = {
  /** Height of the cross-section graph, in view coordinates. */
  GRAPH_HEIGHT: 150,
  /** Tool panel spacing (px). */
  TOOL_PANEL_SPACING: 7,
} as const;

/** Settings for materials/view/MaterialsScreenView.ts. */
export const MATERIALS_SCREEN_VIEW_SETTINGS = {
  /** Anisotropy range min (control/model units). */
  ANISOTROPY_RANGE_MIN: 0.25,
  /** Anisotropy range max (control/model units). */
  ANISOTROPY_RANGE_MAX: 4,
  /** Paint panel spacing (px). */
  PAINT_PANEL_SPACING: 8,
} as const;

/** Settings for preferences/HeatTransferPreferencesNode.ts. */
export const HEAT_TRANSFER_PREFERENCES_NODE_SETTINGS = {
  /** Preference-label font size. */
  LABEL_SIZE: 14,
  /** Header font size (px). */
  HEADER_FONT_SIZE: 18,
  /** Resolution radio buttons spacing (px). */
  RESOLUTION_RADIO_BUTTONS_SPACING: 6,
  /** Resolution radio buttons radius (px). */
  RESOLUTION_RADIO_BUTTONS_RADIUS: 7,
  /** Resolution help font size (px). */
  RESOLUTION_HELP_FONT_SIZE: 11,
  /** Resolution help max width (px). */
  RESOLUTION_HELP_MAX_WIDTH: 340,
  /** Status checkbox spacing (px). */
  STATUS_CHECKBOX_SPACING: 8,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 12,
} as const;

/** Settings for temperature/view/TemperatureScreenView.ts. */
export const TEMPERATURE_SCREEN_VIEW_SETTINGS = {
  /** View panel spacing (px). */
  VIEW_PANEL_SPACING: 7,
} as const;

/** Settings for common/model/FieldSimulationModel.ts; units are documented per value. */
export const FIELD_SIMULATION_SETTINGS = {
  /** Wall-clock interval advanced by Step Forward (s). */
  MANUAL_STEP_SECONDS: 1 / 60,
  /** Frame rate used to scale the substep budget (1/s). */
  REFERENCE_FRAME_RATE: 60,
  /** Maximum substep budget relative to the baseline (dimensionless). */
  MAX_BUDGET_MULTIPLIER: 4,
  /** Initial cross-section start in unit-square coordinates (dimensionless). */
  CROSS_SECTION_START_U: 0.1,
  /** Initial cross-section end in unit-square coordinates (dimensionless). */
  CROSS_SECTION_END_U: 0.9,
} as const;

HeatTransferNamespace.register("HeatTransferConstants", {
  ADVECTION_CFL,
  AMBIENT_TEMPERATURE_K,
  BRUSH_STRENGTH,
  CANVAS_SCALE,
  CONTROL_AREA_WIDTH,
  CONTROL_COLUMN_LEFT,
  CONTROL_COLUMN_RIGHT,
  CONTROL_PANEL_WIDTH,
  COOL_BRUSH_TEMPERATURE_K,
  CROSS_SECTION_SAMPLES,
  DEFAULT_BRUSH_RADIUS_FRACTION,
  DEFAULT_FLOW_SPEED,
  DEFAULT_RESOLUTION,
  DIFFUSION_CFL,
  FIELD_VIEW_LEFT,
  FIELD_VIEW_SIZE,
  FIELD_VIEW_TOP,
  FLUX_ARROW_COUNT,
  HOT_BRUSH_TEMPERATURE_K,
  ISOTHERM_INTERVAL_K,
  KELVIN_TO_CELSIUS_OFFSET,
  LABEL_FONT_SIZE,
  LEGEND_LEFT,
  MAX_ARROW_LENGTH_FRACTION,
  MAX_BRUSH_RADIUS_FRACTION,
  MAX_CPU_RESOLUTION,
  MAX_FLOW_SPEED,
  MAX_FRAME_DT,
  MAX_TEMPERATURE_K,
  MIN_BRUSH_RADIUS_FRACTION,
  MIN_TEMPERATURE_K,
  PANEL_CORNER_RADIUS,
  PANEL_SPACING,
  PARTICLE_COUNT,
  PARTICLE_LIFETIME_S,
  READBACK_FRAME_INTERVAL,
  RESOLUTION_PRESETS,
  SCREEN_VIEW_MARGIN,
  SLOW_SPEED_FACTOR,
  SMALL_FONT_SIZE,
  SUBSTEPS_PER_FRAME,
  TITLE_FONT_SIZE,
  WIDE_AREA_TOP,
});
