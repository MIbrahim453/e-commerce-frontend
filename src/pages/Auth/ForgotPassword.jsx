import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {
  MailOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
  InfoCircleOutlined,
  LockFilled,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import loginInteriorImg from '../../assets/images/login_interior.jpg'
import useAuth from '../../hooks/useAuth'
import useMessage from '../../hooks/useMessage'

const checkStoredExpiry = () => {
  const stored = localStorage.getItem('tokenExpiry')
  if (stored) {
    const expiryTime = new Date(stored).getTime()
    if (!isNaN(expiryTime) && expiryTime > Date.now()) {
      return stored
    }
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('resetEmail')
  }
  return null
}

const formatExpiryTime = (isoString) => {
  if (!isoString) return '1 hour'
  try {
    const d = new Date(isoString)
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch {
    return '1 hour'
  }
}

export default function ForgotPassword() {
  const [form] = Form.useForm()
  const { forgetPassword, loading } = useAuth()
  const message = useMessage()
  const [expiryTime, setExpiryTime] = useState(() => checkStoredExpiry())

  const onFinish = async (values) => {
    const res = await forgetPassword(values.email)
    // Verify from the api that res is success
    if (res?.data?.success || res?.success) {
      const stored = localStorage.getItem('tokenExpiry')
      localStorage.setItem('resetEmail', values.email)
      setExpiryTime(stored || new Date(Date.now() + 60 * 60 * 1000).toISOString())
      message.success(res?.data?.message || res?.message || 'Password reset link sent to your email')
    } else {
      message.error(res?.message || res?.data?.message || 'Failed to send reset link. Please check your email address.')
    }
  }

  const handleResend = async () => {
    const stored = localStorage.getItem('tokenExpiry')
    
    // Verify from local storage if the expiry is not met yet
    if (stored) {
      const expiryTimestamp = new Date(stored).getTime()
      if (!isNaN(expiryTimestamp) && expiryTimestamp > Date.now()) {
        message.warning(`Reset link is already active and valid until ${formatExpiryTime(stored)}. Please check your inbox.`)
        return
      }
    }

    // Expiry has been met (expired) -> allow requesting a fresh token
    const email = localStorage.getItem('resetEmail')
    if (!email) {
      message.info('Please enter your email to request a reset link.')
      setExpiryTime(null)
      return
    }

    const res = await forgetPassword(email)
    if (res?.data?.success || res?.success) {
      const newStored = localStorage.getItem('tokenExpiry')
      setExpiryTime(newStored || new Date(Date.now() + 60 * 60 * 1000).toISOString())
      message.success('Previous link expired. A fresh reset link has been dispatched to your email')
    } else {
      message.error(res?.message || res?.data?.message || 'Failed to resend reset link')
    }
  }

  const handleResetOtherEmail = () => {
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('resetEmail')
    setExpiryTime(null)
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
          <span>Encrypted Account Recovery Protocol</span>
        </div>

        {/* Editorial Text */}
        <div className="relative! z-10! my-auto! lg:my-0! lg:mt-auto! lg:mb-8! max-w-md!">
          <div className="inline-flex! items-center! gap-2! text-xs! font-semibold! tracking-widest! uppercase! text-[#b8a5ff]! mb-2!">
            <span>Account Security</span>
          </div>
          <h1 className="text-2xl! sm:text-3xl! lg:text-[34px]! xl:text-[38px]! font-bold! text-white! leading-[1.18]! tracking-tight! mb-2.5!">
            Regain effortless access to your curated lifestyle.
          </h1>
          <p className="text-white/80! text-xs! sm:text-[13px]! leading-relaxed! m-0!">
            Your security is our highest priority. We use time-sensitive, single-use encrypted verification links to safeguard your orders, drops, and collection history.
          </p>
        </div>

        {/* Bottom stats / features */}
        <div className="relative! z-10! flex! items-center! justify-between! text-white/60! text-[11px]! border-t! border-white/15! pt-4!">
          <span>256-Bit SSL Protection</span>
          <span>Zero-Knowledge Recovery</span>
          <span>24/7 Concierge Support</span>
        </div>
      </div>

      {/* Form Content Column */}
      <div className="w-full! lg:w-1/2! min-h-screen! lg:h-screen! bg-white! flex! flex-col! justify-between! p-4! sm:p-6! lg:px-10! lg:py-6! xl:px-14! xl:py-8! relative! overflow-y-auto! [&::-webkit-scrollbar]:w-1.5! [&::-webkit-scrollbar-track]:bg-transparent! [&::-webkit-scrollbar-thumb]:bg-gray-200! [&::-webkit-scrollbar-thumb]:rounded-full! hover:[&::-webkit-scrollbar-thumb]:bg-gray-300!">
        {/* Ambient violet glow */}
        <div className="pointer-events-none! absolute! top-0! right-0! w-72! h-72! bg-[#5433eb]/5! rounded-full! blur-3xl!" />

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
            className="text-xs! font-semibold! text-gray-500! hover:text-[#5433eb]! no-underline! transition-colors!"
          >
            Shop Home
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="relative! z-10! w-full! max-w-[400px]! mx-auto! my-auto! py-4! sm:py-6!">
          {expiryTime ? (
            /* Success confirmation view - Input is removed */
            <div>
              <div className="w-12! h-12! rounded-2xl! bg-emerald-50! text-emerald-600! flex! items-center! justify-center! mb-4! border! border-emerald-200/60! shadow-xs!">
                <CheckCircleOutlined className="text-xl!" />
              </div>

              <div className="mb-4!">
                <h2 className="text-2xl! sm:text-[26px]! font-bold! text-[#1a1a1a]! tracking-tight! mb-1.5!">
                  Check your email
                </h2>
                <p className="text-xs! sm:text-[13px]! text-gray-500! leading-relaxed! m-0!">
                  We have sent password reset instructions to:
                </p>
                <div className="inline-block! mt-1.5! px-3! py-1! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-full! text-xs! font-semibold! text-gray-800!">
                  {localStorage.getItem('resetEmail') || 'your email'}
                </div>
              </div>

              {/* Expiry Time Info Card (not running countdown) */}
              <div className="bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-2xl! p-3.5! my-4! flex! items-start! gap-3!">
                <ClockCircleOutlined className="text-[#5433eb]! text-sm! mt-0.5! shrink-0!" />
                <div className="text-[11.5px]! text-gray-600! leading-relaxed!">
                  <span className="font-semibold! text-gray-800! block! mb-0.5!">
                    Link Expiry:
                  </span>
                  This recovery link is valid for <strong>1 hour</strong> (expires at {formatExpiryTime(expiryTime)}).
                </div>
              </div>

              <div className="flex! flex-col! gap-2! mt-5!">
                <Button
                  type="primary"
                  onClick={handleResend}
                  loading={loading}
                  className="w-full! h-11! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-[13px]! flex! items-center! justify-center! gap-2! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! active:scale-98! cursor-pointer! border-0!"
                >
                  <span>Resend Reset Link</span>
                  <ArrowRightOutlined className="text-xs!" />
                </Button>

                <button
                  type="button"
                  onClick={handleResetOtherEmail}
                  className="w-full! text-center! py-2! text-xs! font-medium! text-gray-500! hover:text-[#5433eb]! bg-transparent! border-0! cursor-pointer! transition-colors!"
                >
                  Enter a different email address
                </button>
              </div>
            </div>
          ) : (
            /* Input Form View */
            <div>
              <div className="w-12! h-12! rounded-2xl! bg-primary/10! text-primary! flex! items-center! justify-center! mb-4! border! border-primary/15! shadow-xs!">
                <KeyOutlined className="text-xl!" />
              </div>

              <div className="mb-5!">
                <h2 className="text-2xl! text-center! sm:text-[26px]! font-bold! text-[#1a1a1a]! tracking-tight! mb-1.5!">
                  Forgot password?
                </h2>
                <p className="text-xs! sm:text-[13px]! text-gray-500! leading-relaxed! m-0!">
                  No worries. Enter the email address linked to your account, and we’ll dispatch a secure recovery link right away.
                </p>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                className="flex! flex-col! gap-1.5!"
              >
                <Form.Item
                  name="email"
                  label={
                    <span className="text-[11px]! text-gray-600! font-medium!">
                      Account Email Address
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please enter your email address' },
                    { type: 'email', message: 'Please enter a valid email address' }
                  ]}
                  className="mb-2!"
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                    placeholder="name@example.com"
                    className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3.5! py-2! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
                  />
                </Form.Item>

                {/* Help / Guidance Alert Pill */}
                <div className="flex! items-start! gap-2.5! bg-[#f7f8fa]! border! border-[#ebebeb]! rounded-2xl! p-3! my-1!">
                  <InfoCircleOutlined className="text-[#5433eb]! text-xs! mt-0.5! shrink-0!" />
                  <div className="text-[11px]! text-gray-500! leading-relaxed!">
                    <span className="font-semibold! text-gray-700!">Security Note:</span> Password reset instructions are valid for 1 hour. Check your junk or spam folder if you do not see the message in your inbox.
                  </div>
                </div>

                {/* Submit Action */}
                <Form.Item className="mb-0! mt-2!">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full! h-11! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-[13px]! flex! items-center! justify-center! gap-2! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! active:scale-98! cursor-pointer! border-0!"
                  >
                    <span>Send Reset Link</span>
                    <ArrowRightOutlined className="text-xs!" />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}

          {/* Quick Return Options */}
          <div className="text-center! pt-5! border-t! border-[#f0f0f0]! mt-5!">
            <span className="text-xs! text-gray-500!">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-[#5433eb]! font-semibold! hover:underline! no-underline!"
              >
                Back to Sign in
              </Link>
            </span>
          </div>

          <div className="text-center! pt-2!">
            <span className="text-xs! text-gray-500!">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#5433eb]! font-semibold! hover:underline! no-underline!"
              >
                Create one now
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
