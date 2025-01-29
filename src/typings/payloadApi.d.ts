export interface payloadRegister {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface payloadLogin {
  email: string;
  password: string;
}

export interface payloadGetBook {
  size: string | number;
  page: string | number;
}
