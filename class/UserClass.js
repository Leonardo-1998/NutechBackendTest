class User {
  constructor(
    id,
    email,
    first_name,
    last_name,
    password,
    profile_image = "",
    balance
  ) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.profile_image = profile_image;
    this.balance = balance;
  }

  //   Getter
  get getId() {
    return this.id;
  }

  get getEmail() {
    return this.email;
  }

  get getFirstName() {
    return this.first_name;
  }

  get getLastName() {
    return this.last_name;
  }

  get getPassword() {
    return this.password;
  }

  get getProfileImage() {
    return this.profile_image;
  }

  get getProfileImage() {
    return this.balance;
  }

  //   Setter
  set setEmail(email) {
    this.email = email;
  }

  set setFirstName(first_name) {
    this.first_name = first_name;
  }

  set setlastName(last_name) {
    this.last_name = last_name;
  }

  set setPassword(password) {
    this.password = password;
  }

  set setProfileImage(profile_image) {
    this.profile_image = profile_image;
  }

  set setBalance(balance) {
    this.balance = balance;
  }
}

export default User;
