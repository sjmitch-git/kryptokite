const MaintenancePage = () => {
  return (
    <article className="flex flex-col items-center justify-center min-h-50 p-6 text-light space-y-8">
      <img src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`} alt="Logo" />
      <h1 className="text-3xl font-bold">We&apos;ll Be Back Soon!</h1>
      <p className="text-lg mb-2">Our website is currently undergoing critical maintenance.</p>
      <p className="text-base">Thank you for your patience. Please check back later.</p>
    </article>
  );
};

export default MaintenancePage;
