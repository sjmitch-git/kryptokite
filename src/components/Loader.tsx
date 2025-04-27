import { Loading } from "@/lib/fluid";

export default function Loader() {
  return (
    <div className="flex items-start justify-center p-8">
      <Loading size="xl" loadingColor="info" />
    </div>
  );
}
