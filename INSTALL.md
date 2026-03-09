# Install & run

**Working install (mirror + legacy peer deps):**
```bash
npm install --registry https://registry.npmmirror.com --no-optional --legacy-peer-deps
npm run dev
```

If `npm run dev` fails with **Cannot find module @rollup/rollup-darwin-arm64**, install the Rollup binary then run dev again:
```bash
npm install @rollup/rollup-darwin-arm64 --save-dev
npm run dev
```

---

# If `npm install` is stuck

1. **Stop it:** Press `Ctrl+C` in the terminal.

2. **Use the mirror that works:**
   ```bash
   npm install --registry https://registry.npmmirror.com --no-optional --legacy-peer-deps
   ```

3. **Or use yarn:**
   ```bash
   npm install -g yarn
   yarn install
   yarn dev
   ```

Then run `npm run dev` (or `yarn dev`).
