// Painful code - vague "possibly undefined" errors everywhere
interface ApiResponse {
  data?: {
    user?: {
      profile?: {
        settings?: {
          notifications?: {
            email?: boolean;
          };
        };
      };
    };
  };
}

function getEmailNotificationSetting(response: ApiResponse) {
  // Error: Object is possibly 'undefined'
  // But which object? Good luck finding it!
  return response.data.user.profile.settings.notifications.email;
}

// Attempting to fix with optional chaining still gives unclear errors
function saveSettings(response: ApiResponse) {
  const email = response.data?.user?.profile?.settings?.notifications?.email;
  
  // Error: Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'
  // Where did the undefined come from? Which level?
  updateEmailPreference(email);
}

function updateEmailPreference(enabled: boolean) {
  console.log(enabled);
}