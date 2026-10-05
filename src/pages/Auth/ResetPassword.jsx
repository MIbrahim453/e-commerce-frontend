import React from 'react'
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {
  LockOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  LockFilled,
  InfoCircleOutlined
} from '@ant-design/icons'
import loginInteriorImg from '../../assets/images/login_interior.jpg'
import useAuth from '../../hooks/useAuth'
import useMessage from '../../hooks/useMessage'

export default function ResetPassword() {
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const params = useParams()
  const navigate = useNavigate()
  const token = params.token || searchParams.get('token')
  const { resetPassword, loading } = useAuth()
  const message = useMessage()

  const onFinish = async (values) => {
    if (!token) {
      message.error('Reset authorization token is missing. Please click the link sent to your email.')
      return
    }

    const res = await resetPassword(token, values.password)
    if (res?.data?.success || res?.success) {
      message.success(res?.data?.message || res?.message || 'Password reset successfully! Please sign in.')
      localStorage.removeItem('tokenExpiry')
      localStorage.removeItem('resetEmail')
      navigate('/login')
    } else {
      message.error(res?.message || res?.data?.message || 'Failed to reset password. The link may have expired.')
    }
  }

  return (
    <div className="min-h-screen! w-full! bg-white! flex! flex-col! lg:flex-row! overflow-x-hidden!">
      {/* Visual Editorial Column (Desktop) */}
      <div className="hidden! lg:flex! lg:w-1/2! relative! lg:h-screen! lg:sticky! lg:top-0! flex-col! justify-between! p-6! sm:p-8! lg:p-8! xl:p-10! overflow-hidden! shrink-0!">
        <img
          src={loginInteriorImg}
          alt="Curated modern living interior"
          className="absolute! inset-0! w-full! h-full! object-cover! object-center!"
        />

        <div className="absolute! inset-0! bg-gradient-to-t! from-black/85! via-black/45! to-black/35!" />

        {/* Top badge */}
        <div className="relative! z-10! flex! items-center! gap-2! bg-black/40! backdrop-blur-md! text-white/90! text-[11px]! px-3.5! py-1.5! rounded-full! border! border-white/15! w-fit!">
          <SafetyCertificateOutlined className="text-xs! text-[#a48eff]!" />
          <span>SECURE ACCESS • Token Authorization</span>
        </div>

        {/* Editorial Text */}
        <div className="relative! z-10! my-auto! lg:my-0! lg:mt-auto! lg:mb-8! max-w-md!">
          <div className="inline-flex! items-center! gap-2! text-xs! font-semibold! tracking-widest! uppercase! text-[#b8a5ff]! mb-2!">
            <span>Account Security</span>
          </div>
          <h1 className="text-2xl! sm:text-3xl! lg:text-[34px]! xl:text-[38px]! font-bold! text-white! leading-[1.18]! tracking-tight! mb-2.5!">
            Set a fresh, secure password for your account.
          </h1>
          <p className="text-white/80! text-xs! sm:text-[13px]! leading-relaxed! m-0!">
            Your security is our top priority. Choose a strong, memorable password to protect your orders, drops, and private studio capsule collections.
          </p>
        </div>

        {/* Bottom features */}
        <div className="relative! z-10! flex! items-center! justify-between! text-white/60! text-[11px]! border-t! border-white/15! pt-4!">
          <span>256-Bit SSL Protection</span>
          <span>Instant Credential Sync</span>
          <span>Verified Access Only</span>
        </div>
      </div>

      {/* Form Content Column */}
      <div className="w-full! lg:w-1/2! min-h-screen! lg:h-screen! bg-white! flex! flex-col! justify-between! p-4! sm:p-6! lg:px-10! lg:py-6! xl:px-14! xl:py-8! relative! overflow-y-auto! [&::-webkit-scrollbar]:w-1.5! [&::-webkit-scrollbar-track]:bg-transparent! [&::-webkit-scrollbar-thumb]:bg-gray-200! [&::-webkit-scrollbar-thumb]:rounded-full! hover:[&::-webkit-scrollbar-thumb]:bg-gray-300!">
        {/* Ambient violet glow */}
        <div className="pointer-events-none! absolute! top-0! right-0! w-72! h-72! bg-primary/5! rounded-full! blur-3xl!" />

        {/* Top Header / Back Link */}
        <div className="relative! z-10! flex! items-center! justify-between!">
          <Link
            to="/login"
            className="inline-flex! items-center! gap-1.5! px-3.5! py-1.5! rounded-full! bg-[#f7f8fa]! hover:bg-gray-100! text-xs! font-semibold! text-gray-700! border! border-[#ebebeb]! transition-colors! no-underline! cursor-pointer!"
          >
            <ArrowLeftOutlined className="text-[10px]!" />
            <span>Back to Sign In</span>
          </Link>

          <Link
            to="/"
            className="text-xs! font-semibold! text-gray-500! hover:text-primary! no-underline! transition-colors!"
          >
            Shop Home
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="relative! z-10! w-full! max-w-[400px]! mx-auto! my-auto! py-4! sm:py-6!">
          {/* Lock Icon Badge */}
          <div className="w-12! h-12! rounded-2xl! bg-primary/10! text-primary! flex! items-center! justify-center! mb-4! border! border-primary/15! shadow-xs! mx-auto!">
            <LockOutlined className="text-xl!" />
          </div>

          {/* Heading and Intro */}
          <div className="mb-4! text-center!">
            <h2 className="text-2xl! sm:text-[26px]! font-bold! text-[#1a1a1a]! tracking-tight! mb-1.5!">
              Reset your password
            </h2>
            <p className="text-xs! sm:text-[13px]! text-gray-500! leading-relaxed! m-0!">
              Enter your new credentials below to restore secure access to your account.
            </p>
          </div>

          {/* Token verification badge */}
          {token ? (
            <div className="flex! items-center! justify-center! gap-2! mb-4! py-1.5! px-3.5! rounded-full! bg-emerald-50! border! border-emerald-200/60! text-emerald-700! text-[11px]! font-medium! w-fit! mx-auto!">
              <CheckCircleOutlined className="text-xs! text-emerald-600!" />
              <span>Reset authorization token detected</span>
            </div>
          ) : (
            <div className="flex! items-start! gap-2! mb-4! py-2! px-3! rounded-xl! bg-amber-50! border! border-amber-200/70! text-amber-800! text-[11px]! leading-snug!">
              <InfoCircleOutlined className="text-xs! text-amber-600! mt-0.5! shrink-0!" />
              <span>
                Please ensure you opened this page directly from the reset link in your email.
              </span>
            </div>
          )}

          {/* Ant Design Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="flex! flex-col! gap-1!"
          >
            <Form.Item
              name="password"
              label={
                <span className="text-[11px]! text-gray-600! font-medium!">
                  New Password
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
              className="mb-1.5!"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                placeholder="Create new password"
                className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-primary! focus:border-primary! focus-within:border-primary! focus-within:bg-white! focus-within:ring-2! focus-within:ring-primary/10! rounded-full! px-3.5! py-2! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            {/* Password strength preview */}
            <div className="mb-2! px-1!">
              <div className="grid! grid-cols-4! gap-1! mb-1!">
                <div className="h-1! rounded-full! bg-primary!" />
                <div className="h-1! rounded-full! bg-primary!" />
                <div className="h-1! rounded-full! bg-primary!" />
                <div className="h-1! rounded-full! bg-primary!" />
              </div>
              <div className="flex! items-center! justify-between! text-[10px]!">
                <span className="text-gray-600! font-medium!">
                  <span className="inline-block! w-1.5! h-1.5! rounded-full! bg-emerald-500! mr-1!" />
                  Strength: <strong className="text-[#1a1a1a]!">Strong</strong>
                </span>
                <span className="text-gray-400!">
                  6+ characters recommended
                </span>
              </div>
            </div>

            <Form.Item
              name="confirmPassword"
              label={
                <span className="text-[11px]! text-gray-600! font-medium!">
                  Confirm New Password
                </span>
              }
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords do not match'))
                  }
                })
              ]}
              className="mb-2!"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                placeholder="Re-enter new password"
                className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-primary! focus:border-primary! focus-within:border-primary! focus-within:bg-white! focus-within:ring-2! focus-within:ring-primary/10! rounded-full! px-3.5! py-2! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            {/* Checklist guidance card */}
            <div className="bg-[#fbfbfc]! border! border-[#ebebeb]! rounded-2xl! p-3! my-1.5!">
              <span className="text-[11px]! font-semibold! text-gray-700! block! mb-1.5!">
                Password Requirements
              </span>
              <ul className="text-[10.5px]! text-gray-500! space-y-1! m-0! pl-4! list-disc!">
                <li>Minimum 6 characters</li>
                <li>At least one number and special character</li>
                <li>Different from previously used passwords</li>
              </ul>
            </div>

            {/* Submit Action */}
            <Form.Item className="mb-0! mt-2!">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full! h-11! rounded-full! bg-primary! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-[13px]! flex! items-center! justify-center! gap-2! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! active:scale-98! cursor-pointer! border-0!"
              >
                <span>Save New Password</span>
                <ArrowRightOutlined className="text-xs!" />
              </Button>
            </Form.Item>
          </Form>

          {/* Return Links */}
          <div className="text-center! pt-4! border-t! border-[#f0f0f0]! mt-5!">
            <span className="text-xs! text-gray-500!">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-primary! font-semibold! hover:underline! no-underline!"
              >
                Back to Sign in
              </Link>
            </span>
          </div>
        </div>

        {/* Footer info & security notices */}
        <div className="relative! z-10! flex! flex-col! items-center! gap-2! text-[10.5px]! text-gray-400! pt-2! pb-1!">
          <div className="flex! items-center! gap-2!">
            <LockFilled className="text-[10px]! text-gray-400!" />
            <span>End-to-End SSL Encrypted Recovery</span>
          </div>

          <div className="flex! items-center! gap-3!">
            <a href="#terms" className="hover:text-gray-600! transition-colors! no-underline! text-gray-400!">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#privacy" className="hover:text-gray-600! transition-colors! no-underline! text-gray-400!">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#help" className="hover:text-gray-600! transition-colors! no-underline! text-gray-400!">
              Need Help?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
