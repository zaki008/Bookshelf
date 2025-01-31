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

export interface payloadCreateBook {
  title: string | undefined;
  author: string | undefined;
  isbn: string | undefined;
  cover: string | null | undefined;
  category: string | undefined;
  status: string | undefined;
}
