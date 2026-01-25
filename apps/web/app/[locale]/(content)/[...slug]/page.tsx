export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return <main style={{ padding: 24 }}>Page: {slug.join('/')}</main>;
}
