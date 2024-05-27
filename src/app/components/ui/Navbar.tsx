import NavbarClient from "../NavbarClient";
import NavbarServer from "../NavbarServer";

const Navbar = async () => {
  return <NavbarServer>{(user) => <NavbarClient user={user} />}</NavbarServer>;
};

export default Navbar;
