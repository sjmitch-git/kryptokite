import { Loading } from "@/lib/fluid";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-32">
      <Loading size="xl" loadingColor="info" />
    </div>
  );
}
