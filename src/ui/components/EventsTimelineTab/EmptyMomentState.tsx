import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

interface Props {
  message: string;
}

export const EmptyMomentState = ({ message }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(ROUTES.CREATE_EVENT)}
      className="relative block w-full rounded-lg border border-dashed border-stone-600 p-12 text-center hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <svg
        className="mx-auto h-10 w-10 text-stone-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      <p className="text-sm font-normal text-stone-400 my-1">{message}</p>
    </button>
  );
};
