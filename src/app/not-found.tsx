import Link from "next/link";

export default function NotFound() {
  return (
    <article className="flex flex-col items-center justify-center min-h-50 p-6 text-danger space-y-8">
      <img src={`${process.env.NEXT_PUBLIC_API_URL}logo.png`} alt="Logo" />
      <h1 className="text-3xl font-bold">Not Found!</h1>
      <p className="text-lg mb-2">Could not find requested resource.</p>
      <Link href="/">Return Home</Link>
    </article>
  );
}
