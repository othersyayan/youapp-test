// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen custom-radial-gradient w-full sm:w-1/2 md:w-2/4 lg:w-2/6 px-4 md:px-6 py-8">
      {children}
    </div>
  );
}
