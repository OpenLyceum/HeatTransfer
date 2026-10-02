/**
 * formatters.ts
 *
 * Turning physical quantities into short strings a student can read at a glance.
 *
 * Every quantity in this simulation spans several decades — conductivity runs
 * from 0.03 to 401, diffusivity from 1e-7 to 1e-4, the Peclet number from 0 to
 * thousands — so a fixed number of decimal places is wrong for most of the range.
 * These helpers choose a representation that keeps two or three significant
 * figures without ever printing something like `0.000000143`.
 *
 * The unit text itself lives in the locale files; these produce only the numeric
 * part, which is then substituted into a translated pattern.
 */

import { StringUtils } from "scenerystack/phetcommon";
import { KELVIN_TO_CELSIUS_OFFSET } from "../../HeatTransferConstants.js";

/** Degrees Celsius, to one decimal place. */
export function formatCelsius(kelvin: number): string {
  return StringUtils.toFixedLTR(kelvin - KELVIN_TO_CELSIUS_OFFSET, 1);
}

/** Degrees Celsius, rounded to a whole number, for summaries and axis ticks. */
export function formatCelsiusRounded(kelvin: number): string {
  return Math.round(kelvin - KELVIN_TO_CELSIUS_OFFSET).toString();
}

/** Thermal conductivity in W/(m K): whole numbers for metals, decimals below 10. */
export function formatConductivity(conductivity: number): string {
  if (conductivity >= 10) {
    return Math.round(conductivity).toString();
  }
  if (conductivity >= 0.1) {
    return StringUtils.toFixedLTR(conductivity, 2);
  }
  return StringUtils.toFixedLTR(conductivity, 3);
}

/** Thermal diffusivity in m^2/s, always in scientific notation with two figures. */
export function formatDiffusivity(diffusivity: number): string {
  if (diffusivity <= 0) {
    return "0";
  }
  const exponent = Math.floor(Math.log10(diffusivity));
  const mantissa = diffusivity / 10 ** exponent;
  return `${StringUtils.toFixedLTR(mantissa, 1)} × 10${superscript(exponent)}`;
}

/** Speed in millimetres per second, since the flow speeds here are a few mm/s. */
export function formatSpeed(metresPerSecond: number): string {
  return StringUtils.toFixedLTR(metresPerSecond * 1000, 1);
}

/**
 * The Peclet number. Below 10 it is worth seeing the decimal; above that the
 * order of magnitude is the whole message.
 */
export function formatPeclet(peclet: number): string {
  if (!Number.isFinite(peclet)) {
    return "∞";
  }
  if (peclet < 10) {
    return StringUtils.toFixedLTR(peclet, 1);
  }
  if (peclet < 1000) {
    return Math.round(peclet).toString();
  }
  return `${Math.round(peclet / 100) / 10}k`;
}

/** Heat flux in kW/m^2, to two significant-ish figures. */
export function formatFlux(wattsPerSquareMetre: number): string {
  const kilowatts = wattsPerSquareMetre / 1000;
  const magnitude = Math.abs(kilowatts);
  if (magnitude >= 100) {
    return Math.round(kilowatts).toString();
  }
  if (magnitude >= 1) {
    return StringUtils.toFixedLTR(kilowatts, 1);
  }
  return StringUtils.toFixedLTR(kilowatts, 2);
}

/** Distance along the cross-section, in millimetres. */
export function formatMillimetres(metres: number): string {
  return StringUtils.toFixedLTR(metres * 1000, 0);
}

/** Renders an integer exponent with Unicode superscript digits. */
function superscript(exponent: number): string {
  const digits = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const sign = exponent < 0 ? "⁻" : "";
  const body = Math.abs(exponent)
    .toString()
    .split("")
    .map((digit) => digits[Number(digit)] ?? digit)
    .join("");
  return sign + body;
}
