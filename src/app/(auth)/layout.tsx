import AuthLayout from "@/features/auth/components/Auth-layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
