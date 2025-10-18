import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex justify-center items-center gap-6">
      <div className="flex w-full flex-col">
        <Link href="/" className="flex self-center gap-3 mt-14">
          <Image src="/logo.svg" alt="nodebase" width={30} height={30} />
          Nodebase
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
