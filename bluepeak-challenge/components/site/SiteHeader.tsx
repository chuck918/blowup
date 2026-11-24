import { getUser } from "@/lib/auth";
import NavBar from "./NavBar";

/** Server wrapper: resolves the session, then renders the interactive nav. */
export default async function SiteHeader() {
  const user = await getUser();
  const name = user?.profile?.full_name || user?.email || user?.phone || null;
  return <NavBar user={user ? { name, admin: user.profile?.role === "admin" } : null} />;
}
