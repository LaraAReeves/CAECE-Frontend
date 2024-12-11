import Navbar from '@/app/ui/navBar';
export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
        <Navbar />
      <div className="flex items-center w-screen h-screen flex-col">{children}</div>
    </div>
  );
}