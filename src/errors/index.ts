export const Errors = {
  Internal: {
    message:
      'Sorry, but something gone wrong in our side, we will do our best to fix it soon. You can report to us here "https://pro-api-nine.vercel.app/profile"',
    code: "001",
  },
  Parameter: {
    message: "Not all parameters are passed.",
    code: "002",
  },
  InvalidAuthCreds: {
    message: "Invalid nickname or password.",
    code: "003",
  },
  AuthTokenInvalid: {
    message: "Failed to authenticate token.",
    code: "004",
  },
  UserNotFound: {
    message: "User not found.",
    code: "005",
  },
  AppNotFound: {
    message: "App not found.",
    code: "006",
  },
  PermissionDenied: {
    message: "Permission denied.",
    code: "007",
  },
};
