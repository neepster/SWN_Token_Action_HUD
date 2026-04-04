/**
 * Entry point for token-action-hud-swnr
 *
 * All class definitions live inside the 'tokenActionHudCoreApiReady' hook
 * so that they can extend the live TAH Core API classes.
 *
 * This file uses Hooks.on (not once) because system-manager.js has its own
 * Hooks.once listener that runs first and populates SystemManager; this
 * handler fires after that and registers the module with TAH Core.
 */

import { SystemManager } from './system-manager.js'
import { MODULE, REQUIRED_CORE_MODULE_VERSION } from './constants.js'

// These imports are side-effect-only — they register their own
// tokenActionHudCoreApiReady hooks to define ActionHandler, RollHandler,
// DEFAULTS, and SystemManager.
import './action-handler.js'
import './roll-handler.js'
import './defaults.js'

Hooks.on('tokenActionHudCoreApiReady', async () => {
    const module = game.modules.get(MODULE.ID)
    module.api = {
        requiredCoreModuleVersion: REQUIRED_CORE_MODULE_VERSION,
        SystemManager
    }
    Hooks.call('tokenActionHudSystemReady', module)
})
