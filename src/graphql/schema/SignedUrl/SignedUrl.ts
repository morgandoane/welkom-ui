export enum SignedUrlType {
  Read = "Read",
  Write = "Write",
}

export enum SignedUrlCategory {
  Company = "Company",
}

export interface SignedUrl {
  expires: Date;
  url: string;
  type: SignedUrlType;
}
