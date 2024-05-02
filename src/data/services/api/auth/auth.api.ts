import { IUserBase } from '../../../entities/user.entity';
import RootStore from '../../../stores/root.store';
import AppApi from '../app-api';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';

export default class AuthApi {
  constructor(
    private api: AppApi,
    private store: RootStore,
  ) {}

  async signUp(userData: IUserBase) {
    try {
      const response = await this.api.client.post<AuthResponseDto>(`/auth/signup`, userData);
      this.store.userStore.loadUser(response.data.user);
      localStorage.setItem('jwtToken', response.data.token);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequestDto) {
    try {
      const response = await this.api.client.post<AuthResponseDto>(`/auth/login`, credentials);
      this.store.userStore.loadUser(response.data.user);
      localStorage.setItem('jwtToken', response.data.token);
      this.api.client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
}
