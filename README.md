# Token Action HUD — Systems Without Number

A [Token Action HUD Core](https://github.com/Larkinabout/fvtt-token-action-hud-core) system module for the [Systems Without Number Redux (swnr)](https://github.com/wintersleepAI/swnr) game system in Foundry VTT.

Supports **Stars Without Number**, **Cities Without Number**, **Worlds Without Number**, and **Ashes Without Number** — all variants playable through the `swnr` Foundry system.

---

## Features

| Tab | Groups | Contents |
|-----|--------|----------|
| Combat | Weapons | All weapon items — click to roll attack |
| Combat | Saves | Physical / Evasion / Mental / Luck saves |
| Combat | Attributes | STR / DEX / CON / INT / WIS / CHA checks (2d6 + mod) |
| Combat | Combat Actions | Initiative, Morale (NPC) |
| Abilities | Skills | All skill items with rank badge — click to roll |
| Abilities | Powers | Powers / Psionics |
| Abilities | Foci | Focus / Feature items (opens sheet) |
| Equipment | Armor | Armor items (opens sheet) |
| Equipment | Cyberware | Cyberware items — CWN/AWN (opens sheet) |
| Utility | Utility | Rest (Night), End Scene, Toggle Token Visibility |

---

## Requirements

| Dependency | Minimum Version |
|-----------|----------------|
| Foundry VTT | 12 |
| swnr (game system) | any |
| Token Action HUD Core | 2.0 |

---

## Installation

### Method 1 — Manifest URL (recommended once published)

1. Open Foundry VTT → **Setup → Add-on Modules → Install Module**
2. Paste the manifest URL into the **Manifest URL** field:
   ```
   https://raw.githubusercontent.com/neepster/SWN_Token_Action_HUD/main/module.json
   ```
3. Click **Install**

### Method 2 — Manual

1. Download or clone this repository.
2. Copy the `token-action-hud-swnr/` folder into your Foundry `Data/modules/` directory so the path is:
   ```
   Data/modules/token-action-hud-swnr/module.json
   ```
3. Restart Foundry and enable the module in your world's **Module Management** screen.

---

## Usage

1. Enable **Token Action HUD Core** and **Token Action HUD — SWNR** in Module Management.
2. Select (left-click) any token whose actor is type `character`, `npc`, or `ship`.
3. The HUD appears near the token. Click any action button to trigger the roll or open the item sheet.

### Tips

- **Left-click** a weapon, skill, or power: rolls normally.
- **Shift-click** a skill: triggers the secondary/opposed roll mode (passes `shiftKey = true` to the skill item).
- **Left-click** a save: opens the SWNR save dialog (modifier prompt).
- **Left-click** an attribute: rolls `2d6 + modifier` and posts to chat.
- **Right-click** any item action (or enable *Render Item* in TAH Core settings): opens the item sheet instead.
- **Initiative**: adds token to combat and rolls initiative if a combat encounter is active.
- **Morale** (NPC only): triggers the NPC morale roll dialog.
- **Rest (Night)** / **End Scene**: delegates to `globalThis.swnr.utils.refreshActor` to heal and recover resources.

---

## Known Limitations

- **Attribute checks** use a simple `2d6 + mod` formula. SWN doesn't have a canonical standalone attribute-check mechanic; the GM decides how to interpret the result.
- **Powers**: rolled via `item.roll()`. If the SWNR system changes how powers activate, this may need updating.
- **Cyberware / Armor / Foci**: clicking opens the item sheet rather than triggering a roll, since these items don't have roll actions in the base system.
- **Ship actors**: only weapon rolls and initiative are supported. Full ship combat (bridge roles, weapons fire) is outside scope for v1.0.
- The `luck` save is displayed only if the actor actually has a `system.save.luck` value. Older SWN-only actors may not include it.

---

## Development

```
token-action-hud-swnr/
├── module.json
├── scripts/
│   ├── init.js            — entry point; fires tokenActionHudSystemReady
│   ├── constants.js       — MODULE, GROUP, ACTION_TYPE, ITEM_TYPE, ATTRIBUTES, SAVES
│   ├── defaults.js        — DEFAULTS layout object
│   ├── system-manager.js  — SystemManager class
│   ├── action-handler.js  — ActionHandler class (HUD population)
│   └── roll-handler.js    — RollHandler class (click handling)
├── styles/
│   └── token-action-hud-swnr.css
└── lang/
    └── en.json
```

All classes are defined as `null` at module scope and assigned inside `Hooks.once('tokenActionHudCoreApiReady', ...)` so they extend the live TAH Core API classes at runtime.

---

## License

MIT — see [LICENSE](LICENSE) file.

---

## Credits

- **TAH Core** by [Larkinabout](https://github.com/Larkinabout)
- **swnr system** by [wintersleepAI](https://github.com/wintersleepAI)
- This module by [neepster](https://github.com/neepster)
