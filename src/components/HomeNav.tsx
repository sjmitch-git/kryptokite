import { Card, CardHeader, CardBody, CardFooter } from "@/lib/fluid";

const HomeNav = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 md:px-4 lg:px-0">
      <Card shadow="md" className="bg-dark text-light">
        <CardBody>
          <CardHeader title="Coins" />
          <p className="line-clamp-2">Browse 17,000+ crypto coins</p>
          <CardFooter link="/coins" linkLabel="Browse" />
        </CardBody>
      </Card>
      <Card shadow="md" className="bg-light text-dark">
        <CardBody>
          <CardHeader title="Trending" />
          <p className="line-clamp-2">Top 15 trending coins</p>
          <CardFooter link="/coins/trending" linkLabel="Go" />
        </CardBody>
      </Card>
      <Card shadow="md" className="bg-dark text-light">
        <CardBody>
          <CardHeader title="Watchlist" />
          <p className="line-clamp-2">Save your favourite coins</p>
          <CardFooter link="/coins" linkLabel="View" />
        </CardBody>
      </Card>
      <Card shadow="md" className="bg-light text-dark">
        <CardBody>
          <CardHeader title="Bitcoin" />
          <p className="line-clamp-2">
            Bitcoin is the first successful internet money based on peer-to-peer technology
          </p>
          <CardFooter link="/coins/bitcoin" linkLabel="Bitcoin" />
        </CardBody>
      </Card>
      <Card shadow="md" className="bg-dark text-light">
        <CardBody>
          <CardHeader title="Ethereum" />
          <p className="line-clamp-2">
            Ethereum is a global platform for decentralized applications
          </p>
          <CardFooter link="/coins/ethereum" linkLabel="Ethereum" />
        </CardBody>
      </Card>
      <Card shadow="md" className="bg-light text-dark">
        <CardBody>
          <CardHeader title="Tether" />
          <p className="line-clamp-2">
            Tether has a value meant to mirror the value of the U.S. dollar
          </p>
          <CardFooter link="/coins/tether" linkLabel="Tether" />
        </CardBody>
      </Card>
    </div>
  );
};

export default HomeNav;
