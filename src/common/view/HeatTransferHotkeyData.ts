/**
 * HeatTransferHotkeyData.ts
 *
 * The paint cursor's keys on a focused field. FieldNode's KeyboardListener and
 * HeatBrushKeyboardHelpSection both read these, so the keys the field handles
 * and the keys the dialog shows cannot drift apart.
 */

import { HotkeyData } from "scenerystack/scenery";
import { StringManager } from "../../i18n/StringManager.js";

const REPO_NAME = "heat-transfer";
const help = StringManager.getInstance().getKeyboardHelp();

const HeatTransferHotkeyData = {
  MOVE_CURSOR: new HotkeyData({
    keys: ["arrowLeft", "arrowRight", "arrowUp", "arrowDown"],
    repoName: REPO_NAME,
    keyboardHelpDialogLabelStringProperty: help.moveCursorStringProperty,
  }),

  MOVE_CURSOR_SLOWER: new HotkeyData({
    keys: ["shift+arrowLeft", "shift+arrowRight", "shift+arrowUp", "shift+arrowDown"],
    repoName: REPO_NAME,
    keyboardHelpDialogLabelStringProperty: help.moveCursorSlowerStringProperty,
  }),

  PAINT: new HotkeyData({
    keys: ["space", "enter"],
    repoName: REPO_NAME,
    keyboardHelpDialogLabelStringProperty: help.paintStringProperty,
  }),
} as const;

export default HeatTransferHotkeyData;
