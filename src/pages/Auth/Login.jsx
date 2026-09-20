import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import loginInteriorImg from '../../assets/images/login_interior.jpg'

export default function Login() {
  const [form] = Form.useForm()

  const onFinish = (values) => {}

  return (
    <div className="h-screen! w-full! bg-white! flex! flex-col! lg:flex-row! overflow-y-auto! lg:overflow-hidden!">
      <div className="hidden! lg:flex! lg:w-1/2! relative! lg:h-screen! flex-col! justify-between! p-6! sm:p-8! lg:p-8! xl:p-10! overflow-hidden! shrink-0!">
        <img
          src={loginInteriorImg}
          alt="Curated modern living interior"
          className="absolute! inset-0! w-full! h-full! object-cover! object-center!"
        />

        <div className="absolute! inset-0! bg-gradient-to-t! from-black/85! via-black/40! to-black/35!" />

        <div className="relative! z-10! my-auto! lg:my-0! lg:mt-auto! lg:mb-8! max-w-md!">
          <h1 className="text-2xl! sm:text-3xl! lg:text-[34px]! xl:text-[38px]! font-bold! text-white! leading-[1.18]! tracking-tight! mb-2.5!">
            Curated essentials crafted for effortless modern living.
          </h1>
          <p className="text-white/80! text-xs! sm:text-[13px]! leading-relaxed! m-0!">
            Join our collective of discerning collectors and design enthusiasts. Access private drops, tailored recommendations, and seamless global checkout.
          </p>
        </div>

        <div className="relative! z-10! hidden! sm:inline-flex! items-center! gap-2! bg-black/40! backdrop-blur-md! text-white/90! text-[10.5px]! px-3.5! py-1.5! rounded-full! border! border-white/15! w-fit!">
          <GlobalOutlined className="text-xs! text-white/70!" />
          <span>Featured in Arch Digest &amp; Monocle • Over 40,000 design objects cataloged</span>
        </div>
      </div>

      <div className="w-full! lg:w-1/2! min-h-screen! lg:h-screen! bg-white! flex! flex-col! justify-between! p-4! sm:p-6! lg:px-10! lg:py-5! xl:px-14! xl:py-7! relative! overflow-y-auto! lg:overflow-hidden!">
        <div className="pointer-events-none! absolute! top-0! right-0! w-72! h-72! bg-[#5433eb]/5! rounded-full! blur-3xl!" />

        <div className="relative! z-10! flex! items-center! justify-start!">
          <Link
            to="/"
            className="inline-flex! items-center! gap-1.5! px-3.5! py-1.5! rounded-full! bg-[#f7f8fa]! hover:bg-gray-100! text-xs! font-semibold! text-gray-700! border! border-[#ebebeb]! transition-colors! no-underline! cursor-pointer!"
          >
            <ArrowLeftOutlined className="text-[10px]!" />
            <span>Back to Shop</span>
          </Link>
        </div>

        <div className="relative! z-10! w-full! max-w-[380px]! mx-auto! my-auto! py-2! sm:py-3!">
          <div className="text-center! mb-3.5! sm:mb-4!">
            <h2 className="text-xl! sm:text-2xl! lg:text-[25px]! font-bold! text-[#1a1a1a]! tracking-tight! mb-1!">
              Welcome back
            </h2>
            <p className="text-[11.5px]! sm:text-xs! text-gray-500! m-0!">
              Sign in to access your orders, curated drops, and saved items.
            </p>
          </div>

          <button
            type="button"
            className="w-full! h-10! sm:h-10.5! rounded-full! bg-white! hover:bg-gray-50! border! border-[#ebebeb]! shadow-2xs! flex! items-center! justify-center! gap-2.5! text-xs! sm:text-[13px]! font-semibold! text-gray-800! transition-all! cursor-pointer!"
          >
            <svg className="w-3.5! h-3.5!" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative! flex! items-center! justify-center! my-3! sm:my-3.5!">
            <div className="w-full! h-[1px]! bg-[#f0f0f0]!" />
            <span className="absolute! bg-white! px-2.5! text-[9.5px]! font-semibold! tracking-wider! uppercase! text-gray-400!">
              Or continue with email
            </span>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="flex! flex-col! gap-1!"
          >
            <Form.Item
              name="email"
              label={
                <span className="text-[11px]! text-gray-600! font-medium!">
                  Email address
                </span>
              }
              className="mb-2!"
              initialValue="alex.morgan@designstudio.com"
            >
              <Input
                prefix={<MailOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                placeholder="name@example.com"
                className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3.5! py-1.5! sm:py-2! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-[11px]! text-gray-600! font-medium!">
                  Password
                </span>
              }
              className="mb-1!"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                placeholder="Enter your password"
                className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3.5! py-1.5! sm:py-2! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <div className="flex! justify-end! -mt-0.5! mb-1!">
              <a
                href="#forgot"
                className="text-[11px]! text-gray-500! hover:text-[#5433eb]! font-medium! no-underline! transition-colors!"
              >
                Forgot password?
              </a>
            </div>

            <Form.Item className="mb-0! mt-1!">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full! h-10.5! sm:h-11! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-[13px]! flex! items-center! justify-center! gap-2! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! active:scale-98! cursor-pointer! border-0!"
              >
                <span>Sign in to Shop</span>
                <ArrowRightOutlined className="text-xs!" />
              </Button>
            </Form.Item>

            <div className="text-center! pt-2!">
              <span className="text-xs! text-gray-500!">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#5433eb]! font-semibold! hover:underline! no-underline!">
                  Sign up
                </Link>
              </span>
            </div>
          </Form>
        </div>

        <div className="relative! z-10! flex! items-center! justify-center! gap-3! text-[10.5px]! text-gray-400! pt-1!">
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
  )
}
