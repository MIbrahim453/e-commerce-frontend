import { useState } from "react"
import { Layout, Button, Badge, Avatar, Drawer } from "antd"
import { NavLink, Link } from "react-router-dom"
import { ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons"
import logo from "../assets/logo/logo.png"
import SearchBar from "./SearchBar"

const { Header } = Layout

const navLinks = [
  { label: "Discover", to: "/" },
  { label: "Catalog", to: "/catalog" },
  { label: "New", to: "/new" },
  { label: "Collections", to: "/collections" },
]

function NavBar() {
  // Temporary state for design preview (toggle between logged-in and guest view)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header className="bg-surface! border-b! border-border! px-4! sm:px-8! h-16! sm:h-20! flex! items-center! justify-between! gap-3! sm:gap-6! sticky! top-0! z-50!">
      <div className="flex! items-center! gap-3! sm:gap-6! lg:gap-8! shrink-0!">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
          className="md:hidden! flex! items-center! justify-center! w-9! h-9! rounded-full! hover:bg-canvas! transition-colors! cursor-pointer! text-text-primary! border-0! bg-transparent!"
        >
          <MenuOutlined className="text-xl! text-text-primary!" />
        </button>

        <Link to="/" className="flex! items-center!">
          <img src={logo} alt="shop." className="h-6! sm:h-7! w-auto! object-contain!" />
        </Link>

        <nav className="hidden! md:flex! items-center! gap-1.5! sm:gap-2!">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-sm! font-semibold! tracking-[-0.02em]! transition-all! px-4! py-1.5! rounded-full! duration-300! ${isActive
                  ? "bg-[#f0eded]! text-text-primary!"
                  : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex-1! max-w-xs! sm:max-w-md! lg:max-w-lg!">
        <SearchBar />
      </div>

      <div className="flex! items-center! gap-3! sm:gap-4! shrink-0!">
        {!isLoggedIn ? (
          <div className="hidden! md:flex! items-center! gap-2! sm:gap-3!">
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
                className="rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! shadow-violet-glow! text-xs! sm:text-sm! font-semibold! px-4! sm:px-5! h-9! sm:h-10! border-0!"
              >
                Sign up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex! items-center! gap-3! sm:gap-4!">
            <Link to="/cart" className="flex! items-center! justify-center!">
              <Badge
                count={3}
                color="#5433eb"
                className="cursor-pointer!"
                styles={{ indicator: { fontSize: "11px", fontWeight: 600 } }}
              >
                <div className="w-9! h-9! sm:w-10! sm:h-10! rounded-full! flex! items-center! justify-center! hover:bg-canvas! transition-colors!">
                  <ShoppingCartOutlined className="text-lg! sm:text-xl! text-text-primary!" />
                </div>
              </Badge>
            </Link>

            <Link to="/profile" className="flex! items-center!">
              <Avatar
                size={{ xs: 32, sm: 38 }}
                icon={<UserOutlined />}
                className="bg-canvas! text-text-primary! border! border-border! hover:border-primary! cursor-pointer! transition-colors!"
              />
            </Link>
          </div>
        )}
      </div>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeIcon={<CloseOutlined className="text-text-primary! text-base!" />}
        placement="left"
        width="100%"
        className="md:hidden!"
        title={
          <Link to="/" onClick={() => setIsOpen(false)} className="flex! items-center!">
            <img src={logo} alt="shop." className="h-6! w-auto! object-contain!" />
          </Link>
        }
      >
        <div className="flex! flex-col! justify-between! h-full! py-2!">
          <nav className="flex! flex-col! gap-1.5!">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-2xl! sm:text-3xl! font-semibold! tracking-[-0.03em]! transition-all! duration-200! px-8! py-2.5! rounded-full! text-center! ${isActive
                    ? "bg-[#f0eded]! text-text-primary!"
                    : "text-[#474556]! hover:text-text-primary! hover:bg-canvas!"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          {!isLoggedIn && (
            <div className="flex! flex-col! items-center! gap-3! w-full! max-w-xs! mx-auto! pt-6! border-t! border-border!">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full!">
                <Button
                  type="text"
                  className="w-full! rounded-full! text-text-primary! hover:bg-canvas! text-sm! sm:text-base! font-medium! h-11! sm:h-12!"
                >
                  Log in
                </Button>
              </Link>

              <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full!">
                <Button
                  type="primary"
                  className="w-full! rounded-full! bg-primary! hover:bg-primary/90! text-on-primary! shadow-violet-glow! text-sm! sm:text-base! font-semibold! h-11! sm:h-12! border-0!"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </Header>
  )
}

export default NavBar