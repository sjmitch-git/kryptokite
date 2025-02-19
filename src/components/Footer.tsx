import { MetaData } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-neutral-200 p-4 mt-8" dir="ltr">
      <div className="container mx-auto text-center space-y-4">
        <p className="text-sm" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {MetaData.defaultSitename}. All rights reserved.
        </p>
        <p className="text-sm">
          Created by{" "}
          <a
            href={MetaData.defaultAuthorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {MetaData.defaultAuthor}
          </a>
        </p>
      </div>
    </footer>
  );
}
