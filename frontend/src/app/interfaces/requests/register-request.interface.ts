export class RegisterRequest {

  userName: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(userName: string, firstName: string, lastName: string, password: string) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
