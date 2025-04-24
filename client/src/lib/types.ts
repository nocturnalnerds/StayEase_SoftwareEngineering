export type APIErrorResponse = {
  message: string;
  statusCode: number;
  status: string;
};

export type APISuccessResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
};

export type RoomCardProps = {
  id?: string;
  image: string;
  roomType: string;
  price: number;
  beds: number;
  maxGuests: number;
  maxBreakfasts: number;
};

export type User = {
  id?: string;
  email: string;
  name: string;
  password: string;
  phone: string;
};

export type Admin = {
  id?: string;
  email: string;
  password: string;
};

export type ContactProps = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
