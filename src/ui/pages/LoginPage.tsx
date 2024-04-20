import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../context/app-context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { api, store } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      setLoading(true);
      await api.auth.login(values);
      navigate(ROUTES.MAIN);
    } finally {
      setLoading(false);
    }

    console.log('Login with:', values.email, values.password);
    setSubmitting(false); // Set submitting to false once the login logic is handled
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="m-8">
        <div className="text-2xl font-bold">Logo Placeholder</div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({ isSubmitting }) => (
              <Form className="bg-white shadow-md rounded px-10 pt-6 pb-8">
                <div className="mb-8">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-10">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-between mb-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                  </button>
                  <a
                    href="#"
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a href="#" className="font-bold text-sm text-blue-500 hover:text-blue-800">
                    Sign Up
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
