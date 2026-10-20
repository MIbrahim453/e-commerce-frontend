import { useState, useContext, useRef } from "react";
import { Layout, Button, Badge, Avatar, Drawer } from "antd";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  SearchOutlined,
  AppstoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo/logo.png";
import NavSearchBar from "./NavSearchBar";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";

const { Header } = Layout;

const collectionItems = [
  {
    key: "men",
    label: "Men",
    sublabel: "Clothing & streetwear",
    to: "/collections/men",
    color: "bg-[#5433eb]",
  },
  {
    key: "women",
    label: "Women",
    sublabel: "Dresses, tops & style",
    to: "/collections/women",
    color: "bg-pink-500",
  },
  {
    key: "kids",
    label: "Kids",
    sublabel: "Everyday essentials & fun",
    to: "/collections/kids",
    color: "bg-amber-500",
  },
];

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { itemCount } = useContext(CartContext) || { itemCount: 0 };
  const isLoggedIn = Boolean(user);
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [collectionsHover, setCollectionsHover] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnterCollections = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setCollectionsHover(true);
  };

  const handleMouseLeaveCollections = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setCollectionsHover(false);
    }, 150);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Header className="bg-surface! border-b! border-border! sticky! top-0! z-50! p-0! h-auto! leading-normal!">
      <div className="px-4! sm:px-8! h-16! sm:h-20! flex! items-center! justify-between! gap-2! sm:gap-6!">
        <div className="flex! items-center! gap-2! sm:gap-6! lg:gap-8! shrink-0!">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setIsOpen(true)}
            className="md:hidden! flex! items-center! justify-center! w-9! h-9! rounded-full! hover:bg-canvas! transition-colors! cursor-pointer! text-text-primary! border-0! bg-transparent!"
          >
            <MenuOutlined className="text-xl! text-text-primary!" />
          </button>

          <Link to="/" className="flex! items-center!">
            <img
              src={logo}
              alt="shop."
              className="h-6! sm:h-7! w-auto! object-contain!"
            />
          </Link>

          <nav className="hidden! md:flex! items-center! gap-1.5! sm:gap-2!">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm! font-semibold! tracking-[-0.02em]! transition-all! px-4! py-1.5! rounded-full! duration-300! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              Discover
            </NavLink>

            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                `text-sm! font-semibold! tracking-[-0.02em]! transition-all! px-4! py-1.5! rounded-full! duration-300! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              Catalog
            </NavLink>

            <NavLink
              to="/new"
              className={({ isActive }) =>
                `text-sm! font-semibold! tracking-[-0.02em]! transition-all! px-4! py-1.5! rounded-full! duration-300! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              New
            </NavLink>

            <div
              className="relative"
              onMouseEnter={handleMouseEnterCollections}
              onMouseLeave={handleMouseLeaveCollections}
            >
              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `text-sm! font-semibold! tracking-[-0.02em]! transition-all! px-4! py-1.5! rounded-full! duration-300! flex! items-center! gap-1.5! cursor-pointer! ${isActive || location.pathname.startsWith("/collections")
                    ? "bg-[#f0eded]! text-text-primary!"
                    : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                  }`
                }
              >
                <span>Collections</span>
                <DownOutlined
                  className={`text-[9px]! transition-transform! duration-300! ${collectionsHover ? "rotate-180!" : ""
                    }`}
                />
              </NavLink>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-60 transition-all duration-200 ${collectionsHover
                    ? "opacity-100! visible! translate-y-0! pointer-events-auto!"
                    : "opacity-0! invisible! -translate-y-2! pointer-events-none!"
                  }`}
              >
                <div className="bg-white! rounded-2xl! shadow-level-3! border! border-border! p-2! backdrop-blur-md!">
                  <div className="px-3! py-1.5! text-[11px]! font-bold! text-gray-400! uppercase! tracking-wider!">
                    Collections
                  </div>

                  <div className="flex! flex-col! gap-1!">
                    {collectionItems.map((item) => {
                      const isItemActive = location.pathname === item.to;
                      return (
                        <Link
                          key={item.key}
                          to={item.to}
                          onClick={() => setCollectionsHover(false)}
                          className={`flex! items-center! gap-3! px-3! py-2.5! rounded-xl! transition-all! no-underline! group/item ${isItemActive
                              ? "bg-[#eee9ff]! text-[#5433eb]!"
                              : "hover:bg-canvas! text-text-primary!"
                            }`}
                        >
                          <span
                            className={`w-2.5! h-2.5! rounded-full! ${item.color} group-hover/item:scale-125! transition-transform! shrink-0!`}
                          />
                          <div className="flex! flex-col!">
                            <span className="text-sm! font-semibold! group-hover/item:text-[#5433eb]! transition-colors!">
                              {item.label}
                            </span>
                            <span className="text-[11px]! text-text-secondary!">
                              {item.sublabel}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="h-[1px]! bg-border! my-1.5!" />

                  <Link
                    to="/collections"
                    onClick={() => setCollectionsHover(false)}
                    className="flex! items-center! justify-between! px-3! py-2! rounded-xl! text-xs! font-semibold! text-text-secondary! hover:text-[#5433eb]! hover:bg-[#5433eb]/5! transition-colors! no-underline!"
                  >
                    <span>All Collections</span>
                    <span className="text-xs!">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hidden! md:block! flex-1! max-w-xs! sm:max-w-md! lg:max-w-lg! mx-auto!">
          <NavSearchBar />
        </div>

        <div className="flex! items-center! gap-1.5! sm:gap-3.5! shrink-0!">
          <button
            type="button"
            aria-label={
              showMobileSearch ? "Close search bar" : "Open search bar"
            }
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className={`md:hidden! flex! items-center! justify-center! w-9! h-9! rounded-full! transition-colors! cursor-pointer! border-0! ${showMobileSearch
                ? "bg-canvas! text-primary!"
                : "bg-transparent! text-text-primary! hover:bg-canvas!"
              }`}
          >
            {showMobileSearch ? (
              <CloseOutlined className="text-base! text-text-primary!" />
            ) : (
              <SearchOutlined className="text-lg! text-text-primary!" />
            )}
          </button>

          <Link to="/cart" className="flex! items-center! justify-center!">
            <Badge
              count={itemCount}
              overflowCount={99}
              color="#5433eb"
              className="cursor-pointer!"
              styles={{ indicator: { fontSize: "11px", fontWeight: 600 } }}
            >
              <div className="w-8! h-8! sm:w-10! sm:h-10! rounded-full! flex! items-center! justify-center! hover:bg-canvas! transition-colors!">
                <ShoppingCartOutlined className="text-lg! sm:text-xl! text-text-primary!" />
              </div>
            </Badge>
          </Link>

          {!isLoggedIn ? (
            <div className="flex! items-center! gap-2! sm:gap-3!">
              <Link to="/login">
                <Button
                  type="text"
                  className="rounded-full! text-text-primary! hover:bg-canvas! text-xs! sm:text-sm! font-medium! px-3! sm:px-4! h-9! sm:h-10!"
                >
                  Log in
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  type="primary"
                  className="rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! shadow-violet-glow! text-xs! sm:text-sm! font-semibold! px-3.5! sm:px-5! h-9! sm:h-10! border-0!"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex! items-center! gap-1.5! sm:gap-3.5!">
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3! py-1.5! rounded-full! text-xs! font-semibold! bg-[#5433eb]/10! text-[#5433eb]! hover:bg-[#5433eb]/20! transition-colors! flex! items-center! gap-1.5! no-underline!"
                >
                  <AppstoreOutlined className="text-xs!" />
                  <span className="hidden! sm:inline!">Admin</span>
                </Link>
              )}
              <Link to="/profile" className="flex! items-center! gap-2! group!">
                <Avatar
                  size={{ xs: 30, sm: 38 }}
                  src={user?.profilePhoto}
                  icon={!user?.profilePhoto && <UserOutlined />}
                  className="bg-canvas! text-text-primary! border! border-border! group-hover:border-primary! cursor-pointer! transition-colors!"
                />
                <span className="hidden! xl:inline-block! text-xs! sm:text-sm! font-semibold! text-text-primary! group-hover:text-primary! max-w-[120px]! truncate! transition-colors!">
                  {user?.firstName
                    ? `${user.firstName} ${user.lastName || ""}`.trim()
                    : "Profile"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                title="Log out"
                aria-label="Log out"
                className="flex! items-center! gap-1.5! px-2.5! sm:px-3.5! py-1.5! sm:py-2! rounded-full! text-xs! font-semibold! text-text-secondary! hover:text-red-600! hover:bg-red-50! border! border-border! hover:border-red-200! transition-all! cursor-pointer! bg-transparent!"
              >
                <LogoutOutlined className="text-xs! sm:text-sm!" />
                <span className="hidden! sm:inline!">Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showMobileSearch && (
        <div className="md:hidden! px-4! pb-3! pt-1! bg-surface! border-t! border-border!">
          <NavSearchBar
            autoFocus
            onCloseMobile={() => setShowMobileSearch(false)}
          />
        </div>
      )}

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeIcon={<CloseOutlined className="text-text-primary! text-base!" />}
        placement="left"
        width="100%"
        className="md:hidden!"
        title={
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex! items-center!"
          >
            <img
              src={logo}
              alt="shop."
              className="h-6! w-auto! object-contain!"
            />
          </Link>
        }
      >
        <div className="flex! flex-col! justify-between! h-full! py-2!">
          <nav className="flex! flex-col! gap-2!">
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-2xl! sm:text-3xl! font-semibold! tracking-[-0.03em]! transition-all! duration-200! px-8! py-2! rounded-full! text-center! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              Discover
            </NavLink>

            <NavLink
              to="/catalog"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-2xl! sm:text-3xl! font-semibold! tracking-[-0.03em]! transition-all! duration-200! px-8! py-2! rounded-full! text-center! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              Catalog
            </NavLink>

            <NavLink
              to="/new"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-2xl! sm:text-3xl! font-semibold! tracking-[-0.03em]! transition-all! duration-200! px-8! py-2! rounded-full! text-center! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              New
            </NavLink>

            <div className="flex! flex-col! items-center! w-full! pt-1!">
              <NavLink
                to="/collections"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-2xl! sm:text-3xl! font-semibold! tracking-[-0.03em]! transition-all! duration-200! px-8! py-2! rounded-full! text-center! w-full! ${isActive || location.pathname.startsWith("/collections")
                    ? "bg-[#f0eded]! text-text-primary!"
                    : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                  }`
                }
              >
                Collections
              </NavLink>

              <div className="flex! items-center! justify-center! gap-2! mt-2.5! mb-1! flex-wrap!">
                {collectionItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`px-3.5! py-1.5! rounded-full! text-xs! font-bold! border! transition-all! no-underline! flex! items-center! gap-1.5! ${location.pathname === item.to
                        ? "bg-[#5433eb]! text-white! border-[#5433eb]!"
                        : "bg-canvas! text-text-primary! border-border! hover:bg-gray-200!"
                      }`}
                  >
                    <span
                      className={`w-1.5! h-1.5! rounded-full! ${location.pathname === item.to ? "bg-white!" : item.color
                        }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          {!isLoggedIn ? (
            <div className="flex! flex-col! items-center! gap-3! w-full! max-w-xs! mx-auto! pt-6! border-t! border-border!">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full!"
              >
                <Button
                  type="text"
                  className="w-full! rounded-full! text-text-primary! hover:bg-canvas! text-sm! sm:text-base! font-medium! h-11! sm:h-12!"
                >
                  Log in
                </Button>
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full!"
              >
                <Button
                  type="primary"
                  className="w-full! rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! shadow-violet-glow! text-sm! sm:text-base! font-semibold! h-11! sm:h-12! border-0!"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex! flex-col! items-center! gap-3! w-full! max-w-xs! mx-auto! pt-6! border-t! border-border!">
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full! py-2.5! px-4! rounded-full! text-center! font-semibold! text-sm! text-white! bg-[#5433eb]! hover:bg-[#4324d4]! transition-colors! no-underline!"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="w-full! p-3! bg-canvas! rounded-2xl! border! border-border! flex! items-center! gap-3! hover:border-primary! transition-colors!"
              >
                <Avatar
                  size={42}
                  src={user?.profilePhoto}
                  icon={!user?.profilePhoto && <UserOutlined />}
                  className="bg-white! text-text-primary! border! border-border!"
                />
                <div className="flex! flex-col! min-w-0! text-left!">
                  <span className="text-sm! font-semibold! text-text-primary! truncate!">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName || ""}`.trim()
                      : "My Profile"}
                  </span>
                  <span className="text-xs! text-text-secondary! truncate!">
                    {user?.email || "View details"}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full! py-3! rounded-full! text-center! font-semibold! text-sm! text-red-600! bg-red-50! border! border-red-200! cursor-pointer!"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </Header>
  );
}

export default NavBar;
