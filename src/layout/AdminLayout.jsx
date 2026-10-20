import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ConfigProvider, Avatar, Button, Dropdown, Drawer } from "antd";
import { AuthContext } from "../context/authContext";
import logo from "../assets/logo/logo.png";
import {
  AppstoreOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  TagsOutlined,
  CreditCardOutlined,
  ShopOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    {
      to: "/admin",
      label: "Overview",
      end: true,
      icon: <AppstoreOutlined className="text-lg!" />,
    },
    {
      to: "/admin/orders",
      label: "Orders & Fulfillment",
      icon: <OrderedListOutlined className="text-lg!" />,
    },
    {
      to: "/admin/products",
      label: "Products Catalog",
      icon: <ShoppingOutlined className="text-lg!" />,
    },
    {
      to: "/admin/categories",
      label: "Categories",
      icon: <TagsOutlined className="text-lg!" />,
    },
    {
      to: "/admin/payments",
      label: "Revenue & Payments",
      icon: <CreditCardOutlined className="text-lg!" />,
    },
  ];

  const breadcrumbs = useMemo(() => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/dashboard") {
      return [{ label: "Admin", to: "/admin" }, { label: "Overview" }];
    }
    if (path.startsWith("/admin/orders")) {
      return [
        { label: "Admin", to: "/admin" },
        { label: "Orders & Fulfillment" },
      ];
    }
    if (path === "/admin/products/new") {
      return [
        { label: "Admin", to: "/admin" },
        { label: "Products", to: "/admin/products" },
        { label: "Add Product" },
      ];
    }
    if (path.includes("/admin/products/edit")) {
      return [
        { label: "Admin", to: "/admin" },
        { label: "Products", to: "/admin/products" },
        { label: "Edit Product" },
      ];
    }
    if (path.startsWith("/admin/products")) {
      return [{ label: "Admin", to: "/admin" }, { label: "Products Catalog" }];
    }
    if (path.startsWith("/admin/categories")) {
      return [{ label: "Admin", to: "/admin" }, { label: "Categories" }];
    }
    if (path.startsWith("/admin/payments")) {
      return [
        { label: "Admin", to: "/admin" },
        { label: "Revenue & Payments" },
      ];
    }
    return [{ label: "Admin", to: "/admin" }, { label: "Portal" }];
  }, [location.pathname]);

  const adminName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    : "Store Admin";
  const adminEmail = user?.email || "admin@shop.studio";
  const adminInitials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`.toUpperCase()
    : "AD";

  const profileMenuItems = [
    {
      key: "user-info",
      disabled: true,
      label: (
        <div className="py-1">
          <p className="text-xs font-bold text-text-primary leading-tight">
            {adminName}
          </p>
          <p className="text-[11px] text-text-secondary leading-tight mt-0.5">
            {adminEmail}
          </p>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "profile",
      label: <Link to="/profile">Admin Profile</Link>,
    },
    {
      key: "storefront",
      label: (
        <Link to="/" target="_blank" rel="noreferrer">
          Go to Storefront
        </Link>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#5433eb",
          borderRadius: 16,
          fontFamily: "inherit",
        },
      }}
    >
      <div className="min-h-screen bg-canvas text-text-primary flex flex-col lg:flex-row font-sans selection:bg-primary/20 selection:text-primary">
        <aside className="hidden lg:flex lg:flex-col w-64 xl:w-72 bg-surface border-r border-border fixed inset-y-0 left-0 z-40 shadow-level-1">
          <div className="h-20 flex items-center px-6 border-b border-border">
            <Link to="/admin" className="flex items-center group">
              <img
                src={logo}
                alt="shop."
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            <div>
              <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                Main Navigation
              </div>
              <nav className="space-y-1.5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `group flex items-center px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#f0eded]! text-text-primary! font-bold! shadow-2xs!"
                          : "text-text-secondary! hover:text-text-primary! hover:bg-canvas!"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`text-lg transition-colors ${
                            isActive
                              ? "text-primary!"
                              : "text-text-secondary! group-hover:text-text-primary!"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div>
              <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                Quick Shortcuts
              </div>
              <div className="space-y-1">
                <Link
                  to="/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between px-4 py-2.5 rounded-2xl text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShopOutlined className="text-base text-text-secondary group-hover:text-primary" />
                    <span>Customer Storefront</span>
                  </div>
                  <span className="text-[11px] text-text-secondary bg-canvas px-2 py-0.5 rounded-md">
                    View
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-surface">
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-canvas transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  {user?.profilePhoto ? (
                    <Avatar
                      src={user.profilePhoto}
                      size={40}
                      className="ring-2 ring-primary/20"
                    />
                  ) : (
                    <Avatar
                      size={40}
                      className="bg-gradient-to-tr from-primary to-[#7f5af0] text-on-primary font-bold text-sm shadow-sm"
                    >
                      {adminInitials}
                    </Avatar>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-text-primary truncate leading-tight">
                    {adminName}
                  </p>
                  <p className="text-xs text-text-secondary truncate leading-tight">
                    {adminEmail}
                  </p>
                </div>
              </div>

              <Button
                type="text"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                title="Logout"
                className="text-text-secondary! hover:text-red-600! hover:bg-red-50!"
              />
            </div>
          </div>
        </aside>

        <div className="lg:hidden bg-surface border-b border-border sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              type="text"
              shape="circle"
              icon={<MenuOutlined className="text-lg" />}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open sidebar menu"
            />
            <Link to="/admin" className="flex items-center">
              <img
                src={logo}
                alt="shop."
                className="h-6 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 rounded-full flex items-center justify-center focus:outline-none"
                aria-label="Admin Profile Menu"
              >
                {user?.profilePhoto ? (
                  <Avatar src={user.profilePhoto} size={32} />
                ) : (
                  <Avatar
                    size={32}
                    className="bg-primary text-on-primary font-bold text-xs"
                  >
                    {adminInitials}
                  </Avatar>
                )}
              </button>
            </Dropdown>
          </div>
        </div>

        <Drawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          placement="left"
          width={280}
          closeIcon={<CloseOutlined className="text-text-secondary" />}
          title={
            <div className="flex items-center">
              <img src={logo} alt="shop." className="h-6 w-auto" />
            </div>
          }
        >
          <div className="flex flex-col justify-between h-full space-y-4">
            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#f0eded]! text-text-primary! font-bold! shadow-2xs!"
                        : "text-text-secondary hover:bg-canvas hover:text-text-primary"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ))}

              <div className="pt-4 mt-4 border-t border-border">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary"
                >
                  <ShopOutlined className="text-base" />
                  <span>Customer Storefront</span>
                </Link>
              </div>
            </nav>

            <div className="p-3 border-t border-border bg-canvas rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  size={34}
                  className="bg-primary text-on-primary font-bold text-xs"
                >
                  {adminInitials}
                </Avatar>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-text-primary">
                    {adminName}
                  </p>
                  <p className="text-[10px] text-text-secondary">Store Admin</p>
                </div>
              </div>
              <Button
                type="link"
                size="small"
                danger
                onClick={handleLogout}
                className="font-semibold text-xs! p-0!"
              >
                Logout
              </Button>
            </div>
          </div>
        </Drawer>

        <div className="flex-1 lg:ml-64 xl:ml-72 min-h-screen flex flex-col min-w-0 overflow-x-hidden">
          <header className="hidden lg:flex items-center justify-between h-20 px-8 bg-surface/90 backdrop-blur-md sticky top-0 z-30 border-b border-border">
            <div className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 mr-1"
                title="System Operational"
              />
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && (
                    <span className="text-text-secondary/40 font-normal">
                      /
                    </span>
                  )}
                  {crumb.to ? (
                    <Link
                      to={crumb.to}
                      className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-text-primary font-bold">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/" target="_blank" rel="noreferrer">
                <Button
                  type="text"
                  icon={
                    <ShopOutlined className="text-sm text-text-secondary" />
                  }
                  className="rounded-full! text-xs! font-semibold! text-text-secondary! hover:text-text-primary! hover:bg-canvas! h-9! px-3.5! flex! items-center! gap-2! border border-transparent hover:border-border transition-all"
                >
                  View Storefront
                </Button>
              </Link>

              <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
                <Button className="rounded-full! pl-1.5! pr-3! py-1! bg-canvas! hover:bg-[#eae7e7]! border border-border! h-auto! flex! items-center! gap-2.5! shadow-2xs!">
                  {user?.profilePhoto ? (
                    <Avatar src={user.profilePhoto} size={28} />
                  ) : (
                    <Avatar
                      size={28}
                      className="bg-primary text-on-primary font-bold text-xs shadow-xs"
                    >
                      {adminInitials}
                    </Avatar>
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-text-primary leading-tight">
                      {adminName.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-text-secondary leading-tight font-medium">
                      Admin
                    </span>
                  </div>
                  <DownOutlined className="text-text-secondary text-[10px] ml-0.5" />
                </Button>
              </Dropdown>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}
