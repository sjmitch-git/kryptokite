import Hero from "@/components/Hero";
import EditStore from "@/components/portfolio/EditStore";

type Props = {
  params: Promise<{ id: string }>;
};

const StorePage = async ({ params }: Props) => {
  const { id } = await params;

  const decodedId = decodeURIComponent(id);

  return (
    <article>
      <Hero title={decodedId} />
      <EditStore storeName={decodedId} />
    </article>
  );
};

export default StorePage;
