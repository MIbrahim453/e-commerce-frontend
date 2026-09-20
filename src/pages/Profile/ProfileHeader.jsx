import React from 'react'
import { Button, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
  CalendarOutlined, 
  EnvironmentOutlined, 
  ShoppingOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  WalletOutlined, 
  EditOutlined, 
  ShareAltOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import customerAvatar from '../../assets/images/customer_avatar.jpg'

export default function ProfileHeader({ onEditClick }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="bg-white! rounded-[28px]! border! border-border! p-6! sm:p-8! shadow-level-1! mb-8! relative! overflow-hidden!">
      <div className="absolute! -top-24! -right-24! w-72! h-72! bg-[#e4dfff]! opacity-40! rounded-full! blur-3xl! pointer-events-none!" />
      <div className="absolute! -bottom-20! left-1/3! w-56! h-56! bg-[#f2f4f5]! opacity-60! rounded-full! blur-2xl! pointer-events-none!" />

      <div className="relative! z-10! flex! flex-col! lg:flex-row! lg:items-center! justify-between! gap-6! sm:gap-8!">
        <div className="flex! flex-col! sm:flex-row! items-start! sm:items-center! gap-5! sm:gap-6!">
          <div className="relative! shrink-0!">
            <div className="w-24! h-24! sm:w-28! sm:h-28! rounded-[24px]! overflow-hidden! border-2! border-white! shadow-md! bg-[#f2f4f5]!">
              <img 
                src={customerAvatar} 
                alt="Elena Vance" 
                className="w-full! h-full! object-cover! object-center!"
              />
            </div>
          </div>

          <div className="flex! flex-col! gap-1.5!">
            <div className="flex! flex-wrap! items-center! gap-2.5!">
              <h1 className="text-2xl! sm:text-3xl! font-semibold! tracking-[-0.05em]! text-text-primary! m-0!">
                Elena Vance
              </h1>
            </div>

            <p className="text-sm! text-text-secondary! m-0! font-normal! tracking-[-0.031em]!">
              elena.vance@studio-curated.com
            </p>

            <div className="flex! flex-wrap! items-center! gap-4! text-xs! text-text-secondary! mt-1!">
              <span className="flex! items-center! gap-1.5!">
                <EnvironmentOutlined className="text-[#5433eb]!" />
                San Francisco, CA
              </span>
              <span className="flex! items-center! gap-1.5!">
                <CalendarOutlined className="text-text-secondary!" />
                Member since Oct 2023
              </span>
            </div>
          </div>
        </div>

        <div className="flex! flex-wrap! items-center! gap-3! self-start! lg:self-center!">
          <Button
            type="text"
            onClick={onEditClick}
            className="rounded-full! bg-white! border! border-border! hover:bg-canvas! hover:border-text-primary! text-text-primary! text-xs! sm:text-sm! font-semibold! px-4! sm:px-5! h-10! flex! items-center! gap-2! transition-all!"
          >
            <EditOutlined />
            Edit Profile
          </Button>

          <Button
            type="text"
            onClick={handleLogout}
            className="rounded-full! bg-white! hover:bg-red-50! text-text-secondary! hover:text-red-600! border! border-border! hover:border-red-200! text-xs! sm:text-sm! font-semibold! px-4! sm:px-5! h-10! flex! items-center! gap-2! transition-all!"
          >
            <LogoutOutlined />
            Log out
          </Button>

          <Tooltip title="Share Studio Profile">
            <Button
              type="text"
              className="rounded-full! bg-canvas! hover:bg-[#ebebeb]! text-text-primary! w-10! h-10! flex! items-center! justify-center! border-0! p-0! transition-colors!"
            >
              <ShareAltOutlined className="text-base!" />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="relative! z-10! grid! grid-cols-2! sm:grid-cols-4! gap-3! sm:gap-4! mt-6! pt-6! border-t! border-border!">
        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <ShoppingOutlined className="text-sm! text-[#5433eb]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">Total Orders</span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]!">
            4
          </div>
        </div>

        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <ClockCircleOutlined className="text-sm! text-[#5433eb]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">In Transit</span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]! flex! items-center! gap-1.5!">
            2
          </div>
        </div>

        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <CheckCircleOutlined className="text-sm! text-[#137333]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">Delivered</span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]!">
            2
          </div>
        </div>

        <div className="bg-[#fcf9f8]! hover:bg-[#f6f3f2]! p-3.5! sm:p-4! rounded-[20px]! border! border-[#f0eded]! transition-colors!">
          <div className="flex! items-center! gap-2! text-text-secondary! mb-1!">
            <WalletOutlined className="text-sm! text-[#5433eb]!" />
            <span className="text-xs! font-medium! tracking-[-0.02em]!">Studio Credit</span>
          </div>
          <div className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]!">
            $120.00
          </div>
        </div>
      </div>
    </div>
  )
}
