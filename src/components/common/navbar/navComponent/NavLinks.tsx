import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  scrolled: boolean;
}

const NavLinks: React.FC<Props> = ({ scrolled }) => {
  // Text color changes based on scroll state
  const textColor = scrolled ? "text-gray-700" : "text-white";

  return (
    <NavigationMenu className="hidden md:flex items-center space-x-8">
      <NavigationMenuList className="flex gap-6 items-center">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/"
              className={cn(
                "text-primary font-semibold transition-colors hover:text-blue-600",
                textColor
              )}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Pricing - ✅ NEW LINK */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/pricing"
              className={cn(
                "text-base font-semibold transition-colors hover:text-blue-600",
                textColor
              )}
            >
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Explore */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "text-base font-semibold bg-transparent px-2 py-1 hover:text-blue-600",
              textColor
            )}
          >
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white rounded-md shadow-lg p-2 min-w-[180px] space-y-1">
            <NavigationMenuLink asChild>
              <Link
                to="/explore"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                More Explore
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="/category"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Category
              </Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Pages */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "text-base font-semibold bg-transparent px-2 py-1 hover:text-blue-600",
              textColor
            )}
          >
            Pages
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white rounded-md shadow-lg p-2 min-w-[180px] space-y-1">
            <NavigationMenuLink asChild>
              <Link
                to="/about"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                About Us
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="/contact"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Contact Us
              </Link>
            </NavigationMenuLink>
            
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            {/* <Link
            to={'/dash'}
              
              className={cn(
                "text-base font-semibold transition-colors hover:text-blue-600",
                textColor
              )}
            >
              Buissnes
            </Link> */}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
