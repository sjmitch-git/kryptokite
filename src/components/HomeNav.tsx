import Link from "next/link";
import { Card, CardHeader, CardBody, CardImage } from "@/lib/fluid";
import { HomeLinks } from "@/lib/config";

const HomeNav = () => {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 px-2 md:px-4 lg:px-0">
      {HomeLinks.map((card) => (
        <Card shadow="md" rounded="md" className="section border-none" key={card.title}>
          <CardImage
            title={card.title}
            src={card.img}
            aspect="square"
            className="mx-auto bg-dark rounded-full w-20 h-20"
          />
          <CardBody className="static">
            <CardHeader title={card.title} className="text-xl max-sm:text-center" />
            <p className="line-clamp-2 max-sm:hidden">{card.body}</p>
          </CardBody>
          <Link href={card.href} className="stretched-link"></Link>
        </Card>
      ))}
    </div>
  );
};

export default HomeNav;
