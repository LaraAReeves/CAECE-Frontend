import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function BotonPiso({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'h-10 w-12 text-center items-center rounded-lg px-2 text-lg font-medium transition-colors hover:bg-foreground hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
