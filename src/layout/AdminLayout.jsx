import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ConfigProvider, Avatar, Button, Input, Dropdown, Drawer } from "antd";
import { AuthContext } from "../context/authContext";
import logo from "../assets/logo/logo.png";
import {
  AppstoreOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  ShopOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Sidebar navigation - Clean icon + label, NO badges, NO separate Add Product tab
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
      to: "/admin/payments",
      label: "Revenue & Payments",
      icon: <CreditCardOutlined className="text-lg!" />,
    },
  ];

  const adminName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    : "Store Admin";
  const adminEmail = user?.email || "admin@shop.studio";
  const adminInitials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`.toUpperCase()
    : "AD";

  const dateMenuItems = [
    { key: "today", label: "Today", onClick: () => setDateRange("Today") },
    { key: "7days", label: "Last 7 days", onClick: () => setDateRange("Last 7 days") },
    { key: "30days", label: "Last 30 days", onClick: () => setDateRange("Last 30 days") },
    { key: "quarter", label: "This Quarter (Q2)", onClick: () => setDateRange("This Quarter (Q2)") },
    { key: "all", label: "All Time", onClick: () => setDateRange("All Time") },
  ];

  const profileMenuItems = [
    {
      key: "user-info",
      disabled: true,
      label: (
        <div className="py-1">
          <p className="text-xs font-bold text-text-primary leading-tight">{adminName}</p>
          <p className="text-[11px] text-text-secondary leading-tight mt-0.5">{adminEmail}</p>
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
        {/* ========================================================================= */}
        {/* DESKTOP SIDEBAR (Complete Full Sidebar on Desktop)                        */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex lg:flex-col w-64 xl:w-72 bg-surface border-r border-border fixed inset-y-0 left-0 z-40 shadow-level-1">
          {/* Brand Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-border">
            <Link to="/admin" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="shop."
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Admin
              </span>
            </Link>
            <div
              className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"
              title="System Operational"
            />
          </div>

          {/* Navigation Section */}
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

          {/* User Profile Card at Sidebar Bottom */}
          <div className="p-4 border-t border-border bg-surface">
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-canvas transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  {user?.profilePhoto ? (
                    <Avatar src={user.profilePhoto} size={40} className="ring-2 ring-primary/20" />
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

        {/* ========================================================================= */}
        {/* MOBILE HEADER & ANTD DRAWER                                               */}
        {/* ========================================================================= */}
        <div className="lg:hidden bg-surface border-b border-border sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              type="text"
              shape="circle"
              icon={<MenuOutlined className="text-lg" />}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open sidebar menu"
            />
            <Link to="/admin" className="flex items-center gap-2">
              <img src={logo} alt="shop." className="h-6 w-auto object-contain" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Avatar size={32} className="bg-primary text-on-primary font-bold text-xs">
              {adminInitials}
            </Avatar>
          </div>
        </div>

        {/* Mobile Ant Design Drawer */}
        <Drawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          placement="left"
          width={280}
          closeIcon={<CloseOutlined className="text-text-secondary" />}
          title={
            <div className="flex items-center gap-2">
              <img src={logo} alt="shop." className="h-6 w-auto" />
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                Admin
              </span>
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
                <Avatar size={34} className="bg-primary text-on-primary font-bold text-xs">
                  {adminInitials}
                </Avatar>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-text-primary">{adminName}</p>
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

        {/* ========================================================================= */}
        {/* MAIN CONTENT AREA                                                         */}
        {/* ========================================================================= */}
        <div className="flex-1 lg:ml-64 xl:ml-72 min-h-screen flex flex-col">
          {/* Top Header Bar (Desktop) */}
          <header className="hidden lg:flex items-center justify-between h-20 px-8 bg-surface/90 backdrop-blur-md sticky top-0 z-30 border-b border-border">
            {/* Search Bar with Ant Design Input */}
            <div className="relative w-96 max-w-md">
              <Input
                placeholder="Search metrics, orders, or reports..."
                prefix={<SearchOutlined className="text-text-secondary text-sm mr-1.5" />}
                suffix={
                  <kbd className="text-[10px] font-semibold text-text-secondary bg-surface border border-border px-1.5 py-0.5 rounded shadow-2xs">
                    ⌘K
                  </kbd>
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full! py-2! px-4! bg-canvas! hover:bg-[#eae7e7]! focus:bg-surface! border-transparent! focus:border-primary! text-sm!"
              />
            </div>

            {/* Header Controls (Date range, Notifications, Profile) */}
            <div className="flex items-center gap-3">
              {/* Date Range Selector Dropdown */}
              <Dropdown menu={{ items: dateMenuItems }} trigger={["click"]}>
                <Button
                  className="rounded-full! text-xs! font-semibold! text-text-primary! bg-canvas! hover:bg-[#eae7e7]! border-transparent! hover:border-border! h-auto! py-2! px-3.5! flex! items-center! gap-2!"
                >
                  <CalendarOutlined className="text-text-secondary text-sm" />
                  <span>{dateRange}</span>
                  <DownOutlined className="text-text-secondary text-[10px]" />
                </Button>
              </Dropdown>

              {/* Notification Bell */}
              <div className="relative">
                <Button
                  type="text"
                  shape="circle"
                  icon={<BellOutlined className="text-base text-text-secondary" />}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="View notifications"
                  className="bg-canvas! hover:bg-[#eae7e7]! h-9! w-9! relative!"
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white pointer-events-none" />

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-surface rounded-2xl shadow-xl border border-border p-4 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-xs font-bold text-text-primary">Notifications</span>
                      <span className="text-[10px] text-primary font-semibold cursor-pointer">
                        Mark all read
                      </span>
                    </div>
                    <div className="py-3 space-y-2.5 text-xs">
                      <div className="flex gap-2.5 p-2 rounded-xl bg-primary/5">
                        <span className="w-2 h-2 mt-1 rounded-full bg-primary" />
                        <div>
                          <p className="font-semibold text-text-primary">Live Sync Connected</p>
                          <p className="text-[11px] text-text-secondary">
                            Store APIs & inventory are active.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
                <Button
                  className="rounded-full! pl-1.5! pr-3! py-1! bg-canvas! hover:bg-[#eae7e7]! border-transparent! hover:border-border! h-auto! flex! items-center! gap-2.5!"
                >
                  {user?.profilePhoto ? (
                    <Avatar src={user.profilePhoto} size={28} />
                  ) : (
                    <Avatar size={28} className="bg-primary text-on-primary font-bold text-xs shadow-xs">
                      {adminInitials}
                    </Avatar>
                  )}
                  <span className="text-xs font-bold text-text-primary">
                    {adminName.split(" ")[0]}
                  </span>
                  <DownOutlined className="text-text-secondary text-[10px]" />
                </Button>
              </Dropdown>
            </div>
          </header>

          {/* Dynamic Nested Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}
