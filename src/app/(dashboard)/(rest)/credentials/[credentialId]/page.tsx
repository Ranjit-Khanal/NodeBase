interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

export default async function page({ params }: PageProps) {
  console.log(await params);
  const { credentialId } = await params;
  return (
    <div>
      <h1>{credentialId}</h1>
    </div>
  );
}
