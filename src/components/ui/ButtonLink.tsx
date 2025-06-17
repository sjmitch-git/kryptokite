import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  label: string;
}

const ButtonLink = ({ href, label }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className="bg-primary rounded-md text-light p-2 text-lg hover:bg-primary-dark"
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
