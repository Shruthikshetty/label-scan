# Project Fixes (Gluestack UI, NativeWind & Metro)

This document details all configuration changes, package installations, and workarounds applied to get styling, icons, and components working correctly in this project.

---

## 1. Package Dependencies & Integrations

### Buffer Polyfill (for `react-native-svg` & Gluestack)
* **Added Package**: `buffer`
* **Why**: The `react-native-svg` library (used under the hood by Gluestack UI components to render SVGs/icons) includes a utility function `fetchText` which imports the Node.js standard `buffer` module. Because native React Native/Expo does not include Node standard libraries by default, this threw a bundler resolution error. Installing the package explicitly resolves the issue.

### React Native Vector Icons Integration
* **Added Package**: `@react-native-vector-icons/ionicons`
* **Why**: Expo SDK 56 recommends migrating away from the legacy `@expo/vector-icons` library. We installed the package and imported the icons directly as a default import:
  ```typescript
  import Ionicons from "@react-native-vector-icons/ionicons";
  ```
  *Note: Ensure you set the `size` prop as a number (e.g., `size={40}`) instead of `className="w-10 h-10"` since font-based vector icons do not scale using CSS sizing classes.*

---

## 2. Metro HMR / Hot Reload Crash Fix (Windows)

* **Package.json Customization**: Added `overrides` for `react-native-css-interop`.
* **Lockfile**: Regenerated `package-lock.json` and removed nested versions of the library.
* **Why**: `react-native-css-interop@0.1.22` has a bug on Windows where it emits file change notifications without the `addedFiles` property, causing Metro's `DependencyGraph` to crash when Tailwind classes are updated. We forced the system to globally resolve `react-native-css-interop` to the stable `0.1.21` version.
  ```json
  "overrides": {
    "react-native-css-interop": "0.1.21"
  }
  ```

---

## 3. Tailwind CSS & NativeWind v4 Compiling Configuration

### Entry Point CSS Setup
* **Created File**: [global.css](file:///c:/store/full-stack/label-scan/label-scan/global.css) at the root containing Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
* **Root Layout ([src/app/_layout.tsx](file:///c:/store/full-stack/label-scan/label-scan/src/app/_layout.tsx))**:
  * Imported the CSS relatively: `import "../../global.css";` (avoid using alias imports like `@/` for the primary CSS entry point as it can sometimes prevent the NativeWind compilation watcher from tracking changes).
  * Removed the unsupported `config={config}` prop from `<GluestackUIProvider>` (Gluestack imports and applies its config internally).

### Babel Configuration
* **Modified File**: [babel.config.js](file:///c:/store/full-stack/label-scan/label-scan/babel.config.js)
* **Change**: Added `jsxImportSource: 'nativewind'` inside the `babel-preset-expo` config:
  ```javascript
  presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  ```
* **Why**: Instructs Babel to compile JSX elements using NativeWind's custom runner, which parses the `className` attribute into native stylesheets.

### TypeScript Configuration
* **Modified File**: [tsconfig.json](file:///c:/store/full-stack/label-scan/label-scan/tsconfig.json)
* **Change**: Added `"jsxImportSource": "nativewind"` to `compilerOptions`.

### App Configuration (React Compiler Override)
* **Modified File**: [app.json](file:///c:/store/full-stack/label-scan/label-scan/app.json)
* **Change**: Set `"reactCompiler": false` in the experiments object.
* **Why**: In Expo SDK 56, the new experimental React Compiler pre-memoizes component JSX trees at build time before NativeWind can run its Babel transform, causing styling and class name changes to be ignored.

---

### Verifying & Rebuilding
If any configuration changes do not take effect, always clear Metro's cache and restart:
```bash
npx expo start -c
```
