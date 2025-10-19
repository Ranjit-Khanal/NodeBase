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

  const text = useMutation(trpc.testAI.mutationOptions());

  return (
    <div className="flex min-h-screen justify-center items-center gap-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-semibold">Protected Page</h1>

      {/* Workflows Section */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-medium mb-3">Workflows</h2>
        <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>

        <Button
          className="mt-4 w-full"
          disabled={create.isPending}
          onClick={() => {
            console.log("Creating workflow...");
            create.mutate();
          }}
        >
          {create.isPending ? "Creating..." : "Create Workflow"}
        </Button>
      </div>

      {/* AI Section */}
      <div className="w-full max-w-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-3">AI Test Panel 🤖</h2>

        {/* AI Result Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 border border-white/20">
          <p className="font-medium mb-2 text-gray-100">AI Response:</p>
          <p className="text-sm text-gray-200">
            {/* {text.data?.success ? text.data : "No response yet. Click 'Test AI' to start."} */}
          </p>
        </div>

        {/* AI Button */}
        <Button
          className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold w-full"
          disabled={text.isPending}
          onClick={() => {
            console.log("Testing AI...");
            text.mutate();
          }}
        >
          {text.isPending ? "Thinking..." : "Test AI"}
        </Button>
      </div>
    </div>
  );
}
