import { AuthForm } from '../components/AuthForm';

export const LoginPage = () => (
  <AuthForm
    title="Sign in to your account"
    action="Sign in"
    onAuthenticate={(api, values) => api.auth.login(values)}
    includeRememberMe={true}
    includeForgotPasswordLink={true}
  />
);
