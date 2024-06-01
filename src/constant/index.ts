export enum UserRole {
  Driver = 'Driver',
  Dispatcher = 'Dispatcher',
  Organization = 'Organization',
  Admin = 'Admin',
}

export enum UserStatus {
  Occupied = 'occupied',
  Available = 'available',
}

export enum OnBoardingStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum REPOSITORY {
  USER_REPOSITORY = 'USER_REPOSITORY',
  COMPAY_REPOSITORY = 'COMPAY_REPOSITORY',
}

export enum INJECTION_TOKEN {
  DATA_SOURCE = 'DATA_SOURCE',
  CACHE = 'CACHE',
}

export enum EVENT_ENUM {
  EMAIL = 'EMAIL',
  TEXT = 'TEXT',
  PUSH = 'PUSH',
}

export enum SUB_TYPE {
  SIGNUP = 'SIGNUP',
  RESEND = 'RESEND',
}

export type QUEUE_EVENT = {
  type: EVENT_ENUM;
  sub_type: SUB_TYPE;
  data: any;
};
