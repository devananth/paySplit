import { Drawer, Header, MobileNavbar } from "../components";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Drawer />
      <MobileNavbar />
    </main>
  );
};

export { Home };
