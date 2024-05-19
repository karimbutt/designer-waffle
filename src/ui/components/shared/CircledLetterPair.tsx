interface CircledLetterPairProps {
  radius: number;
  letters: string;
  className?: React.ComponentProps<'span'>['className'];
}

export const CircledLetterPair = ({ radius = 8, letters, className }: CircledLetterPairProps) => {
  return (
    <span
      className={`inline-flex h-${radius} w-${radius} items-center justify-center rounded-full bg-slate-700 ${className}`}>
      <span className="text-sm font-medium leading-none text-gray-300">{letters}</span>
    </span>
  );
};
