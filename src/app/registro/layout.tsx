import './styles.css';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div id="contenedor" className='flex items-center justify-center w-[100%] h-[100%]'>
          {children}
        </div>
    );
  }