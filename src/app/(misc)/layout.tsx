export default async function MiscLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pt-8 lg:pt-24 md:pb-12 lg:px-4">
      <article className="max-w-3xl mx-auto">{children}</article>
    </main>
  );
}
