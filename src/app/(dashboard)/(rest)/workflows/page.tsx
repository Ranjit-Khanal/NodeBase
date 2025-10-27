import { requireAuth } from "@/lib/auth-utils";

export default async function page() {
  await requireAuth();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      WOrkflows is here man
    </div>
  );
}
