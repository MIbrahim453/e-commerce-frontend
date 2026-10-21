import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Tag,
  Modal,
  Input,
  Select,
  App as AntdApp,
  Progress,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  LoadingOutlined,
  TeamOutlined,
  CrownOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  getAllUsersApi,
  getUserStatsApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  changeUserRoleApi,
} from "../../services/adminService";
import { AuthContext } from "../../context/authContext";

export default function AdminUsers() {
  const { user: currentUser } = useContext(AuthContext);
  const { message: antdMessage, modal: antdModal } = AntdApp.useApp();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.allSettled([
        getAllUsersApi(),
        getUserStatsApi(),
      ]);
      if (usersRes.status === "fulfilled" && usersRes.value?.data?.success) {
        setUsers(usersRes.value.data.data?.users || []);
      }
      if (statsRes.status === "fulfilled" && statsRes.value?.data?.success) {
        setStats(statsRes.value.data.data || null);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Filtering ──
  const filtered = users.filter((u) => {
    const matchesSearch =
      `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ── Modal handlers ──
  const openCreateModal = () => {
    setModalMode("create");
    setEditingUser(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
    });
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalMode("edit");
    setEditingUser(user);
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      role: user.role || "user",
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email) {
      antdMessage.error("First name, last name, and email are required");
      return;
    }
    if (modalMode === "create" && !form.password) {
      antdMessage.error("Password is required for new users");
      return;
    }

    try {
      setSubmitting(true);
      if (modalMode === "create") {
        await createUserApi(form);
        antdMessage.success("User created successfully");
      } else {
        const payload = { ...form };
        delete payload.password; // Don't send empty password on edit
        await updateUserApi(editingUser._id, payload);
        antdMessage.success("User updated successfully");
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      antdMessage.error(
        err.response?.data?.message || "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (user) => {
    antdModal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      okText: "Delete",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteUserApi(user._id);
          antdMessage.success("User deleted successfully");
          fetchData();
        } catch (err) {
          antdMessage.error(
            err.response?.data?.message || "Failed to delete user",
          );
        }
      },
    });
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await changeUserRoleApi(userId, newRole);
      antdMessage.success(`Role changed to ${newRole}`);
      fetchData();
    } catch (err) {
      antdMessage.error(
        err.response?.data?.message || "Failed to change role",
      );
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage all registered users, roles, and account details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            className="rounded-full! text-xs! font-semibold! text-text-secondary! hover:text-text-primary! hover:bg-canvas! h-auto! py-2.5! px-4! border border-border!"
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined className="text-sm" />}
            onClick={openCreateModal}
            className="rounded-full! text-xs! font-bold! text-on-primary! bg-primary! hover:bg-primary/90! shadow-violet-glow! border-0! h-auto! py-2.5! px-5! flex! items-center! gap-2!"
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              TOTAL USERS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              <TeamOutlined className="text-[10px]" /> All
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {stats?.totalUsers ?? users.length}
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              Registered accounts
            </p>
          </div>
          <div className="mt-4">
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#5433eb"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              ADMIN USERS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              <CrownOutlined className="text-[10px]" /> Elevated
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {stats?.adminUsers ?? 0}
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              With admin privileges
            </p>
          </div>
          <div className="mt-4">
            <Progress
              percent={
                stats?.totalUsers
                  ? Math.round((stats.adminUsers / stats.totalUsers) * 100)
                  : 0
              }
              showInfo={false}
              strokeColor="#413787"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              REGULAR USERS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              <UserOutlined className="text-[10px]" /> Standard
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {stats?.regularUsers ?? 0}
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              Customer accounts
            </p>
          </div>
          <div className="mt-4">
            <Progress
              percent={
                stats?.totalUsers
                  ? Math.round((stats.regularUsers / stats.totalUsers) * 100)
                  : 0
              }
              showInfo={false}
              strokeColor="#059669"
              size={["100%", 4]}
            />
          </div>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border shadow-level-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">
              NEW THIS MONTH
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#5433eb]">
              <UserAddOutlined className="text-[10px]" /> Recent
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {stats?.newUsersThisMonth ?? 0}
            </h2>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">
              Joined this month
            </p>
          </div>
          <div className="mt-4">
            <Progress
              percent={
                stats?.totalUsers
                  ? Math.round(
                      (stats.newUsersThisMonth / stats.totalUsers) * 100,
                    )
                  : 0
              }
              showInfo={false}
              strokeColor="#5433eb"
              size={["100%", 4]}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-card border border-border shadow-level-1 overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary m-0">
              All Users
            </h3>
            <p className="text-xs text-text-secondary m-0 mt-0.5">
              {filtered.length} user{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined className="text-text-secondary" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full! text-xs! w-52! h-9!"
              allowClear
            />
            <div className="flex items-center gap-2">
              {["all", "user", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoleFilter(r)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                    roleFilter === r
                      ? "bg-[#1a1a1a] text-white border-transparent"
                      : "bg-surface text-text-secondary border-border hover:bg-canvas"
                  }`}
                >
                  {r === "all" ? "All" : r === "admin" ? "Admins" : "Users"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-text-secondary flex flex-col items-center justify-center gap-2">
              <LoadingOutlined className="text-2xl text-primary animate-spin" />
              <span className="text-xs">Loading users...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-text-secondary">
              <UserOutlined className="text-3xl text-text-secondary mb-2" />
              <p className="text-xs">No users found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border text-text-secondary text-[10px] uppercase tracking-wider font-bold bg-[#fafafa]">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => {
                  const initial =
                    (u.firstName?.charAt(0) || "U").toUpperCase();
                  const isSelf = currentUser?._id === u._id;
                  return (
                    <tr
                      key={u._id}
                      className="hover:bg-canvas transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#eee9ff] text-[#5433eb] font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                            {initial}
                          </div>
                          <span className="font-bold text-text-primary">
                            {u.firstName} {u.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary">
                        {u.email}
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary">
                        {u.phone || "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <Tag
                          className={`rounded-full! px-2! py-0.5! text-[10px] font-bold! border-0! m-0! ${
                            u.role === "admin"
                              ? "bg-amber-50! text-amber-700!"
                              : "bg-emerald-50! text-emerald-700!"
                          }`}
                        >
                          {u.role === "admin" ? "ADMIN" : "USER"}
                        </Tag>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isSelf && (
                            <Button
                              type="text"
                              size="small"
                              onClick={() =>
                                handleRoleChange(
                                  u._id,
                                  u.role === "admin" ? "user" : "admin",
                                )
                              }
                              className="text-[10px]! font-semibold! text-text-secondary! hover:text-primary! px-2!"
                            >
                              {u.role === "admin"
                                ? "Demote"
                                : "Promote"}
                            </Button>
                          )}
                          <Button
                            type="text"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => openEditModal(u)}
                            className="text-text-secondary! hover:text-primary!"
                          />
                          {!isSelf && (
                            <Button
                              type="text"
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => handleDelete(u)}
                              className="text-text-secondary! hover:text-red-500!"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 bg-[#fafafa] border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <span>
            Showing {filtered.length} of {users.length} total users
          </span>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        title={
          <span className="font-bold text-text-primary">
            {modalMode === "create" ? "Add New User" : "Edit User"}
          </span>
        }
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={submitting}
        okText={modalMode === "create" ? "Create User" : "Save Changes"}
        okButtonProps={{
          className:
            "bg-primary! hover:bg-primary/90! border-0! rounded-full! font-bold! text-xs! h-9! px-5!",
        }}
        cancelButtonProps={{
          className: "rounded-full! text-xs! h-9!",
        }}
      >
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                First Name
              </label>
              <Input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                placeholder="John"
                className="rounded-xl! text-xs!"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                Last Name
              </label>
              <Input
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                placeholder="Doe"
                className="rounded-xl! text-xs!"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
              Email
            </label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              className="rounded-xl! text-xs!"
              type="email"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
              Phone
            </label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 234 567 890"
              className="rounded-xl! text-xs!"
            />
          </div>

          {modalMode === "create" && (
            <div>
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <Input.Password
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Minimum 6 characters"
                className="rounded-xl! text-xs!"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
              Role
            </label>
            <Select
              value={form.role}
              onChange={(value) => setForm({ ...form, role: value })}
              className="w-full rounded-xl!"
              options={[
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
