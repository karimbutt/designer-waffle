import { AuthForm } from '../components/AuthForm';

export const SignupPage = () => (
  <AuthForm
    title="Sign up for an account"
    action="Sign up"
    onAuthenticate={(api, values) => api.auth.signUp(values)}
    signUp={true}
    includeSignUpLink={true}
  />
);
