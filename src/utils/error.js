import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type;
  constructor(message) {
    super();
    this.type = message;
  }
}

export class InvalidUsernamePasswordError extends AuthError {
  static type = "Email/Password is invalid!";
}

export class InactiveAccountError extends AuthError {
  static type = "Account not activated";
}

