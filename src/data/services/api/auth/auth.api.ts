import { IUserBase } from '../../../entities/user.entity';
import axiosClient from '../api-client';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginRequestDto } from './dto/login-user.dto';

// Function to handle user login
export const login = async (data: LoginRequestDto): Promise<AuthResponseDto> => {
  try {
    const response = await axiosClient.post<AuthResponseDto>('/auth/login', data);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token); // Store the JWT token in localStorage
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

// Function to handle user signup
export const signUp = async (data: IUserBase): Promise<AuthResponseDto> => {
  try {
    const response = await axiosClient.post<AuthResponseDto>('/auth/signup', data);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token); // Store the JWT token in localStorage
    return response.data;
  } catch (error) {
    throw new Error('Failed to sign up');
  }
};
