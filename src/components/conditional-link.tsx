import Link from "next/link";

export const ConditionalLink = ({
  href,
  children,
  className,
}: {
  href: string | null;
  children: React.ReactNode;
  className?: string;
}) => {
  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
};