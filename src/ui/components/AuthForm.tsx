import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../context/app-context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import TextInput from './TextInput';
import ErrorMsg from './shared/ErrorMsg';
import Label from './shared/Label';
import Link from './shared/Link';
import { Logo } from './shared/Logo';
import { Button } from './shared/Button';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const emailValidation = Yup.string().email('Invalid email address').required('Email is required');
const passwordValidation = Yup.string().required('Password is required');

interface AuthFormProps {
  title: string;
  action: string;
  onAuthenticate: (api: any, values: FormValues) => Promise<void>;
  includeRememberMe?: boolean;
  signUp?: boolean;
  includeSignUpLink?: boolean;
  includeForgotPasswordLink?: boolean;
}

export const AuthForm = ({
  title,
  action,
  onAuthenticate,
  includeRememberMe = false,
  signUp = false,
  includeSignUpLink = false,
  includeForgotPasswordLink = false,
}: AuthFormProps) => {
  const { api } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setLoading(true);
    try {
      await onAuthenticate(api, values);
      navigate(ROUTES.MAIN);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: emailValidation,
    password: signUp
      ? passwordValidation.min(6, 'Password must be at least 6 characters long')
      : passwordValidation,
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-dark-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo width={'250px'} height={'100px'} />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-text-primary">
          {title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-dark-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <TextInput type="email" name="email" />
                  <ErrorMsg name="email" />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <TextInput type="password" name="password" />
                  <ErrorMsg name="password" />
                </div>

                {includeRememberMe && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        id="remember-me"
                        name="remember-me"
                        className="h-4 w-4 text-accent-200 focus:ring-accent-200"
                      />
                      <Label htmlFor="remember-me" className="ml-3">
                        Remember me
                      </Label>
                    </div>
                    {includeForgotPasswordLink && (
                      <div className="text-sm leading-6">
                        <Link
                          to={ROUTES.FORGOT_PASSWORD}
                          className="font-medium text-primary-300 hover:text-primary-200">
                          Forgot password?
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex w-full justify-center">
                  {action}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="relative mt-10">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6 text-text-muted">
              <span className="bg-dark-800 px-2">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-dark-700 px-3 py-2 text-sm font-semibold text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 focus-visible:ring-transparent">
              {/* Google Icon and Text */}
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span>Google</span>
            </a>

            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-dark-700 px-3 py-2 text-sm font-semibold text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 focus-visible:ring-transparent">
              {/* Apple Icon and Text */}
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.665 17.811c-.14.315-.291.628-.45.937-.876 1.71-2.023 2.829-3.603 2.829-1.129 0-1.733-.627-2.65-.627s-1.576.605-2.607.627c-1.554.042-2.75-1.16-3.677-2.873-1.01-1.858-1.793-5.245-.932-7.413.425-1.073 1.175-2.234 2.108-2.234.927 0 1.415.587 2.655.587 1.216 0 1.727-.587 2.906-.587.961 0 1.694 1.11 2.297 2.177.68 1.209 1.098 2.883 1.051 3.664-.044.742-.231 1.451-.709 1.451-.144 0-.363-.168-.644-.477-.22-.243-.421-.526-.602-.848-.267-.474-.537-.982-.793-1.472-.55-.998-.979-1.354-1.536-1.354-.161 0-.356.04-.578.122.33-1.04.979-1.908 1.919-2.591.641-.467 1.34-.702 2.087-.702 1.345 0 2.32.809 3.02 2.1.58 1.07.952 2.755.804 4.376-.096 1.052-.386 2.09-.855 3.057z" />
                <path d="M14.812 8.407c.504-.617.846-1.473.846-2.407 0-.332-.05-.662-.147-.984-.299.015-.637.113-.998.293-.542.27-1.013.692-1.401 1.255-.377.547-.64 1.198-.781 1.938.415.083.811.017 1.183-.195.395-.224.7-.579.998-.9z" />
              </svg>
              <span>Apple</span>
            </a>
          </div>

          {includeSignUpLink && (
            <p className="mt-10 text-center text-sm text-text-muted">
              Not a member? <Link to={ROUTES.SIGNUP}>Sign up here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
