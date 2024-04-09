export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}
