type Preferences = Record<string, string | number | boolean>;

const prefs: Preferences = {
  theme: 'dark',           // ✅
  fontSize: 14,            // ✅
  notifications: true,     // ✅
  callback: () => {}       // ❌ Functions not allowed
};
