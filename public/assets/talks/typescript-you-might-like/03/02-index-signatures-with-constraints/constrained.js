interface UserPreferences {
  [key: string]: string | number | boolean;
}

const prefs: UserPreferences = {
  theme: 'dark',           // ✅
  fontSize: 14,            // ✅
  notifications: true,     // ✅
  callback: () => {}       // ❌ Functions not allowed
};
