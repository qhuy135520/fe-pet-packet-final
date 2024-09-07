import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type;
  constructor(message) {
    super();
    this.type = message;
  }
}

export class InvalidUsernamePasswordError extends AuthError {
  static type = "Username/Password is invalid!";
}

export class InactiveAccountError extends AuthError {
  static type = "Account not activated";
}

export class InvalidOtpError extends AuthError {
  static type = "Account not activated";
}


