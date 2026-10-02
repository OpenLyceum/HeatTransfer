/**
 * HeatBrushKeyboardHelpSection.ts
 *
 * The keyboard-help entry for painting on the field.
 *
 * The field is the one interactive surface in this simulation that has no
 * standard PhET analogue — it is not a slider, a combo box, or a draggable
 * object, but a continuous canvas you deposit into. So it needs its own help
 * section describing the paint cursor, which is the keyboard's stand-in for a
 * pointer position. Every other interaction in the sim is a standard control and
 * is covered by the stock sections.
 */

import { KeyboardHelpIconFactory, KeyboardHelpSection, KeyboardHelpSectionRow } from "scenerystack/scenery-phet";
import HeatTransferNamespace from "../../HeatTransferNamespace.js";
import { StringManager } from "../../i18n/StringManager.js";
import HeatTransferHotkeyData from "./HeatTransferHotkeyData.js";

export class HeatBrushKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {
    const help = StringManager.getInstance().getKeyboardHelp();

    // Rows come from the same HotkeyData as FieldNode's listener; the icons are
    // given explicitly so each row reads as one compact group of keys.
    super(help.titleStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(HeatTransferHotkeyData.MOVE_CURSOR, {
        icon: KeyboardHelpIconFactory.arrowKeysRowIcon(),
      }),
      KeyboardHelpSectionRow.fromHotkeyData(HeatTransferHotkeyData.MOVE_CURSOR_SLOWER, {
        icon: KeyboardHelpIconFactory.shiftPlusIcon(KeyboardHelpIconFactory.arrowKeysRowIcon()),
      }),
      KeyboardHelpSectionRow.fromHotkeyData(HeatTransferHotkeyData.PAINT, {
        icon: KeyboardHelpIconFactory.spaceOrEnter(),
      }),
    ]);
  }
}

HeatTransferNamespace.register("HeatBrushKeyboardHelpSection", HeatBrushKeyboardHelpSection);
