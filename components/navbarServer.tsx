import { getCategories } from "@/lib/data";
import MainNavbar from "./navbar";


export default async function MainNavbarServer() {
  const categories = await getCategories();

  return <MainNavbar categories={categories} />;
}
