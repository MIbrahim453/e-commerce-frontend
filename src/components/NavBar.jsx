import { useState, useContext, useRef, useEffect } from "react";
import { Badge, Avatar, Drawer, message } from "antd";
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
  ShoppingOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo/logo.png";
import NavSearchBar from "./NavSearchBar";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";

const navLinks = [
  { to: "/", label: "Discover", exact: true },
  { to: "/catalog", label: "Catalog" },
  { to: "/collections/men", label: "Men" },
  { to: "/collections/women", label: "Women" },
  { to: "/collections/kids", label: "Kids" },
];

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { itemCount } = useContext(CartContext) || { itemCount: 0 };
  const isLoggedIn = Boolean(user);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowSearch(false);
    setUserDropdown(false);
    setIsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!showSearch && !userDropdown) return;

    const handleClickOutside = (e) => {
      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setShowSearch(false);
      }
      if (
        userDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showSearch, userDropdown]);

  const handleLogout = async () => {
    await logout();
    setUserDropdown(false);
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-transparent! sticky! top-0! z-50! p-0! h-auto! leading-normal! border-0!">
      {/* Floating Pill Container (Screenshot 4 Reference) */}
      <div className="w-full! px-3! sm:px-6! lg:px-8! pt-2.5! sm:pt-3.5! pb-1.5!">
        <div className="max-w-6xl! mx-auto! bg-white/95! backdrop-blur-xl! border! border-black/8! dark:border-white/10! shadow-[0_4px_24px_rgba(0,0,0,0.06)]! rounded-2xl! sm:rounded-full! px-3.5! sm:px-6! py-2! sm:py-2.5! flex! items-center! justify-between! gap-3!">
          
          {/* Left: Brand Identity + Category Tagline */}
          <div className="flex! items-center! gap-3! shrink-0!">
            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setIsOpen(true)}
              className="lg:hidden! flex! items-center! justify-center! w-8! h-8! rounded-full! hover:bg-canvas! transition-colors! cursor-pointer! text-text-primary! border-0! bg-transparent!"
            >
              <MenuOutlined className="text-base! text-text-primary!" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex! items-center! no-underline!">
              <img
                src={logo}
                alt="shop."
                className="h-6! sm:h-7! w-auto! object-contain!"
              />
            </Link>

            {/* Micro Tagline Divider (Screenshot 4 design) */}
            <div className="hidden! xl:flex! items-center! gap-2.5! pl-1!">
              <span className="w-[1px]! h-4! bg-black/15!" />
              <span className="text-[11px]! font-medium! text-text-secondary! tracking-tight!">
                Clothing & Shoes for Men, Women & Kids
              </span>
            </div>
          </div>

          {/* Center: Clean Text Navigation Links */}
          <nav className="hidden! lg:flex! items-center! gap-1! xl:gap-1.5!">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `text-xs! xl:text-[13px]! font-semibold! tracking-tight! px-3! xl:px-3.5! py-1.5! rounded-full! transition-all! duration-200! no-underline! ${
                    isActive
                      ? "bg-[#1a1a1a]! text-white! shadow-2xs!"
                      : "text-text-secondary! hover:text-text-primary! hover:bg-canvas!"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Actions (Search, Cart, Auth) */}
          <div className="flex! items-center! gap-2! sm:gap-3! shrink-0!">
            {/* Search Input Button */}
            <div className="relative!" ref={searchRef}>
              <button
                type="button"
                aria-label="Toggle search"
                onClick={() => setShowSearch(!showSearch)}
                className={`w-8! h-8! sm:w-9! sm:h-9! rounded-full! flex! items-center! justify-center! transition-colors! cursor-pointer! border! ${
                  showSearch
                    ? "bg-[#1a1a1a]! text-white! border-[#1a1a1a]!"
                    : "bg-canvas! hover:bg-gray-100! text-text-primary! border-border!"
                }`}
              >
                {showSearch ? (
                  <CloseOutlined className="text-xs!" />
                ) : (
                  <SearchOutlined className="text-xs! sm:text-sm!" />
                )}
              </button>

              {/* Floating Dropdown Search */}
              {showSearch && (
                <div className="absolute! top-full! right-0! mt-2.5! w-72! sm:w-80! z-50! animate-fade-in!">
                  <div className="p-2! bg-white! rounded-2xl! shadow-xl! border! border-border!">
                    <NavSearchBar
                      autoFocus
                      onSearchComplete={() => setShowSearch(false)}
                      onClose={() => setShowSearch(false)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Pill Badge */}
            <Link
              to="/cart"
              className="flex! items-center! justify-center! w-8! h-8! sm:w-9! sm:h-9! rounded-full! bg-canvas! hover:bg-gray-100! text-text-primary! border! border-border! transition-colors! no-underline!"
            >
              <Badge
                count={itemCount}
                overflowCount={99}
                color="#5433eb"
                className="cursor-pointer!"
                styles={{ indicator: { fontSize: "10px", fontWeight: 700 } }}
              >
                <ShoppingCartOutlined className="text-sm! sm:text-base! text-text-primary!" />
              </Badge>
            </Link>

            {/* Auth Actions (Screenshot 4 style: Log in text + Sign up pill) */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex! items-center! gap-2! p-1! pr-2.5! rounded-full! hover:bg-canvas! transition-colors! cursor-pointer! border! border-border! bg-white!"
                >
                  <Avatar
                    size={28}
                    src={user?.profilePhoto}
                    icon={!user?.profilePhoto && <UserOutlined />}
                    className="bg-[#5433eb]! text-white! text-xs!"
                  />
                  <span className="text-xs! font-bold! text-[#1a1a1a]! hidden! sm:inline! max-w-[90px]! truncate!">
                    {user?.firstName || "Account"}
                  </span>
                  <DownOutlined className="text-[9px]! text-text-secondary!" />
                </button>

                {userDropdown && (
                  <div className="absolute! right-0! top-full! mt-2! w-48! bg-white! rounded-2xl! shadow-xl! border! border-border! p-1.5! z-50! animate-fade-in!">
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdown(false)}
                      className="flex! items-center! gap-2! px-3! py-2! rounded-xl! text-xs! font-semibold! text-text-primary! hover:bg-canvas! transition-colors! no-underline!"
                    >
                      <UserOutlined />
                      <span>My Profile</span>
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdown(false)}
                        className="flex! items-center! gap-2! px-3! py-2! rounded-xl! text-xs! font-semibold! text-[#5433eb]! hover:bg-[#5433eb]/5! transition-colors! no-underline!"
                      >
                        <AppstoreOutlined />
                        <span>Admin Console</span>
                      </Link>
                    )}
                    <div className="h-[1px]! bg-border! my-1!" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full! flex! items-center! gap-2! px-3! py-2! rounded-xl! text-xs! font-semibold! text-rose-600! hover:bg-rose-50! transition-colors! cursor-pointer! border-0! bg-transparent! text-left!"
                    >
                      <LogoutOutlined />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex! items-center! gap-1.5! sm:gap-2!">
                <Link
                  to="/login"
                  className="px-3! sm:px-3.5! py-1.5! text-xs! sm:text-[13px]! font-semibold! text-[#1a1a1a]! hover:text-[#5433eb]! transition-colors! no-underline!"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5! sm:px-4! py-1.5! sm:py-2! rounded-full! bg-[#1a1a1a]! hover:bg-[#5433eb]! text-white! text-xs! sm:text-[13px]! font-bold! transition-all! shadow-xs! no-underline!"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <div className="flex! items-center! justify-between! w-full!">
            <img src={logo} alt="shop." className="h-6! w-auto!" />
          </div>
        }
        placement="left"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={300}
        styles={{ body: { padding: "16px" } }}
      >
        <div className="flex! flex-col! gap-1.5!">
          <div className="text-[10px]! font-bold! tracking-wider! uppercase! text-text-secondary! px-3! mb-1!">
            Navigation
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="flex! items-center! gap-3! px-3.5! py-2.5! rounded-xl! text-sm! font-semibold! text-[#1a1a1a]! hover:bg-canvas! no-underline!"
            >
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="h-[1px]! bg-border! my-3!" />

          <div className="text-[10px]! font-bold! tracking-wider! uppercase! text-text-secondary! px-3! mb-1!">
            Clothing & Footwear
          </div>
          <Link
            to="/products?category=Jackets%20%26%20Outerwear"
            onClick={() => setIsOpen(false)}
            className="px-3.5! py-2! rounded-xl! text-xs! font-medium! text-text-secondary! hover:text-text-primary! no-underline!"
          >
            Jackets & Outerwear
          </Link>
          <Link
            to="/products?category=Denim%20%26%20Jeans"
            onClick={() => setIsOpen(false)}
            className="px-3.5! py-2! rounded-xl! text-xs! font-medium! text-text-secondary! hover:text-text-primary! no-underline!"
          >
            Denim & Jeans
          </Link>
          <Link
            to="/products?category=T-Shirts%20%26%20Tops"
            onClick={() => setIsOpen(false)}
            className="px-3.5! py-2! rounded-xl! text-xs! font-medium! text-text-secondary! hover:text-text-primary! no-underline!"
          >
            T-Shirts & Tops
          </Link>
          <Link
            to="/products?category=Shoes%20%26%20Footwear"
            onClick={() => setIsOpen(false)}
            className="px-3.5! py-2! rounded-xl! text-xs! font-medium! text-text-secondary! hover:text-text-primary! no-underline!"
          >
            Shoes & Footwear
          </Link>
        </div>
      </Drawer>
    </header>
  );
}

export default NavBar;
