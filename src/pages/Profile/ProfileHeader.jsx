import { useContext } from "react";
import { Button, Tooltip, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WalletOutlined,
  EditOutlined,
  ShareAltOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import customerAvatar from "../../assets/images/customer_avatar.jpg";
import { AuthContext } from "../../context/authContext";

export default function ProfileHeader({ onEditClick, stats = {} }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    message.success("Logged out successfully");
    navigate("/login");
  };

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "My Profile"
    : "Studio Member";

  const memberSince = user?.createdAt
    ? `Member since ${new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
    : "Active Member";

  return (
    <div className="bg-white! rounded-[28px]! border! border-border! p-6! sm:p-8! shadow-level-1! mb-8! relative! overflow-hidden!">
      <div className="absolute! -top-24! -right-24! w-72! h-72! bg-[#e4dfff]! opacity-40! rounded-full! blur-3xl! pointer-events-none!" />
      <div className="absolute! -bottom-20! left-1/3! w-56! h-56! bg-[#f2f4f5]! opacity-60! rounded-full! blur-2xl! pointer-events-none!" />

      <div className="relative! z-10! flex! flex-col! lg:flex-row! lg:items-center! justify-between! gap-6! sm:gap-8!">
        <div className="flex! flex-col! sm:flex-row! items-start! sm:items-center! gap-5! sm:gap-6!">
          <div className="relative! shrink-0!">
            <div className="w-24! h-24! sm:w-28! sm:h-28! rounded-[24px]! overflow-hidden! border-2! border-white! shadow-md! bg-[#f2f4f5]!">
              <img
                src={user?.profilePhoto || customerAvatar}
                alt={fullName}
                className="w-full! h-full! object-cover! object-center!"
              />
            </div>
          </div>

          <div className="flex! flex-col! gap-1.5!">
            <div className="flex! flex-wrap! items-center! gap-2.5!">
              <h1 className="text-2xl! sm:text-3xl! font-semibold! tracking-[-0.05em]! text-text-primary! m-0!">
                {fullName}
              </h1>
            </div>

            <p className="text-sm! text-text-secondary! m-0! font-normal! tracking-[-0.031em]!">
              {user?.email || "No email provided"}
            </p>

            <div className="flex! flex-wrap! items-center! gap-4! text-xs! text-text-secondary! mt-1!">
              <span className="flex! items-center! gap-1.5!">
                <CalendarOutlined className="text-text-secondary!" />
                {memberSince}
              </span>
            </div>
          </div>
        </div>

        <div>
          <Button
            type="text"
            onClick={handleLogout}
            className="rounded-full! bg-white! hover:bg-red-50! text-text-secondary! hover:text-red-600! border! border-border! hover:border-red-200! text-xs! sm:text-sm! font-semibold! px-4! sm:px-5! h-10! flex! items-center! gap-2! transition-all!"
          >
            <LogoutOutlined />
            Log out
          </Button>
        </div>
      </div>

      <div className="relative! z-10! grid! grid-cols-2! sm:grid-cols-4! gap-3! sm:gap-4! mt-6! pt-6! border-t! border-border!">
        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <ShoppingOutlined className="text-sm! text-[#5433eb]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">
              Total Orders
            </span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]!">
            {stats.totalOrders ?? 0}
          </div>
        </div>

        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <ClockCircleOutlined className="text-sm! text-[#5433eb]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">
              Active / Pending
            </span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]! flex! items-center! gap-1.5!">
            {stats.inTransitCount ?? 0}
          </div>
        </div>

        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <CheckCircleOutlined className="text-sm! text-[#137333]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">
              Delivered
            </span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]!">
            {stats.deliveredCount ?? 0}
          </div>
        </div>

        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <WalletOutlined className="text-sm! text-[#5433eb]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">
              Amount Spent
            </span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]!">
            ${Number(stats.totalSpent || 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
