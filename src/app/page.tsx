"use client";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      protected page here
      <p className="flex flex-col">{JSON.stringify(data)}</p>
      <Button
        disabled={create.isPending}
        onClick={() => {
          console.log("hello");
          create.mutate();
        }}
      >
        Create workflow
      </Button>
    </div>
  );
}
