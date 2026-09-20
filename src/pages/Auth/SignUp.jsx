import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  LockFilled
} from '@ant-design/icons'
import signupHeroImg from '../../assets/images/signup_hero.jpg'

export default function SignUp() {
  const [form] = Form.useForm()

  const onFinish = (values) => {}

  return (
    <div className="h-screen! w-full! bg-white! flex! flex-col! lg:flex-row! overflow-y-auto! lg:overflow-hidden!">
      <div className="w-full! lg:w-1/2! lg:h-screen! bg-white! flex! flex-col! justify-between! p-4! sm:p-6! lg:px-10! lg:py-5! xl:px-14! xl:py-6! relative! overflow-y-auto! lg:overflow-hidden!">
        <div className="pointer-events-none! absolute! top-0! left-0! w-72! h-72! bg-[#5433eb]/5! rounded-full! blur-3xl!" />

        <div className="relative! z-10! flex! items-center! justify-start!">
          <Link
            to="/"
            className="inline-flex! items-center! gap-1.5! px-3.5! py-1.5! rounded-full! bg-[#f7f8fa]! hover:bg-gray-100! text-xs! font-semibold! text-gray-700! border! border-[#ebebeb]! transition-colors! no-underline! cursor-pointer!"
          >
            <ArrowLeftOutlined className="text-[10px]!" />
            <span>Back to Shop</span>
          </Link>
        </div>

        <div className="relative! z-10! w-full! max-w-[400px]! mx-auto! my-auto! py-2!">
          <div className="text-center! mb-3.5! sm:mb-4!">
            <div className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! tracking-tight! mb-1!">
              shop<span className="text-[#5433eb]!">.</span>
            </div>
            <h1 className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! tracking-tight! mb-1!">
              Create your account
            </h1>
            <p className="text-[11.5px]! sm:text-xs! text-gray-500! m-0!">
              Start discovering curated products today.
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
            <div className="grid! grid-cols-2! gap-2.5!">
              <Form.Item
                name="firstName"
                label={
                  <span className="text-[11px]! text-gray-600! font-medium!">
                    First name
                  </span>
                }
                className="mb-1.5!"
                initialValue="Alex"
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400! mr-1.5! text-xs! shrink-0!" />}
                  placeholder="First name"
                  className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3! py-1.5! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={
                  <span className="text-[11px]! text-gray-600! font-medium!">
                    Last name
                  </span>
                }
                className="mb-1.5!"
                initialValue="Morgan"
              >
                <Input
                  placeholder="Last name"
                  className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3.5! py-1.5! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label={
                <span className="text-[11px]! text-gray-600! font-medium!">
                  Email address
                </span>
              }
              className="mb-1.5!"
              initialValue="alex.morgan@designstudio.com"
            >
              <Input
                prefix={<MailOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                placeholder="name@example.com"
                className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3.5! py-1.5! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-[11px]! text-gray-600! font-medium!">
                  Create password
                </span>
              }
              className="mb-1!"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400! mr-2! text-xs! shrink-0!" />}
                placeholder="Create strong password"
                defaultValue="••••••••••••"
                className="w-full! bg-[#f7f8fa]! border! border-[#ebebeb]! hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]! focus-within:bg-white! focus-within:ring-2! focus-within:ring-[#5433eb]/10! rounded-full! px-3.5! py-1.5! text-xs! sm:text-[13px]! text-[#1a1a1a]! font-medium! shadow-none! transition-all! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <div className="mb-2.5! px-1!">
              <div className="grid! grid-cols-4! gap-1! mb-1!">
                <div className="h-1! rounded-full! bg-[#5433eb]!" />
                <div className="h-1! rounded-full! bg-[#5433eb]!" />
                <div className="h-1! rounded-full! bg-[#5433eb]!" />
                <div className="h-1! rounded-full! bg-gray-200!" />
              </div>
              <div className="flex! items-center! justify-between! text-[10px]!">
                <span className="text-gray-600! font-medium!">
                  <span className="inline-block! w-1.5! h-1.5! rounded-full! bg-[#5433eb]! mr-1!" />
                  Strength: <strong className="text-[#1a1a1a]!">Good</strong>
                </span>
                <span className="text-gray-400!">
                  8+ chars, 1 number &amp; symbol
                </span>
              </div>
            </div>

            <div className="flex! flex-col! gap-1.5! mb-2.5!">
              <label className="flex! items-center! gap-2! cursor-pointer! select-none!">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5! h-3.5! rounded! accent-[#5433eb]! cursor-pointer!"
                />
                <span className="text-[11px]! text-gray-600!">
                  I agree to the{' '}
                  <a href="#terms" className="text-[#1a1a1a]! font-semibold! hover:text-[#5433eb]! underline!">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-[#1a1a1a]! font-semibold! hover:text-[#5433eb]! underline!">
                    Privacy Policy
                  </a>.
                </span>
              </label>

              <label className="flex! items-center! gap-2! cursor-pointer! select-none!">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5! h-3.5! rounded! accent-[#5433eb]! cursor-pointer!"
                />
                <span className="text-[11px]! text-gray-600!">
                  Receive curated drops, private studio releases, and editorial updates.
                </span>
              </label>
            </div>

            <Form.Item className="mb-0!">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full! h-10.5! sm:h-11! rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-white! font-semibold! text-xs! sm:text-[13px]! flex! items-center! justify-center! gap-2! shadow-[0_6px_24px_rgba(84,51,235,0.35)]! transition-all! active:scale-98! cursor-pointer! border-0!"
              >
                <span>Create Account</span>
                <ArrowRightOutlined className="text-xs!" />
              </Button>
            </Form.Item>

            <div className="text-center! pt-2!">
              <span className="text-xs! text-gray-500!">
                Already have an account?{' '}
                <Link to="/login" className="text-[#5433eb]! font-semibold! hover:underline! no-underline!">
                  Sign in
                </Link>
              </span>
            </div>
          </Form>
        </div>

        <div className="relative! z-10! flex! flex-col! items-center! gap-1.5! text-[10.5px]! text-gray-400! pt-1!">
          <div className="flex! items-center! gap-3!">
            <span className="flex! items-center! gap-1!">
              <LockFilled className="text-[10px]! text-gray-400!" />
              <span>256-bit SSL Encrypted</span>
            </span>
            <span>•</span>
            <span className="flex! items-center! gap-1!">
              <SafetyCertificateOutlined className="text-[10px]! text-gray-400!" />
              <span>Identity Protected</span>
            </span>
          </div>

          <div className="flex! items-center! gap-3! text-gray-400!">
            <a href="#concierge" className="hover:text-gray-600! transition-colors! no-underline! text-gray-400!">
              Concierge Care
            </a>
            <span>•</span>
            <a href="#trust" className="hover:text-gray-600! transition-colors! no-underline! text-gray-400!">
              Trust &amp; Safety
            </a>
            <span>•</span>
            <a href="#faq" className="hover:text-gray-600! transition-colors! no-underline! text-gray-400!">
              FAQ
            </a>
          </div>
        </div>
      </div>

      <div className="w-full! lg:w-1/2! relative! min-h-[340px]! lg:h-screen! flex! flex-col! justify-center! p-6! sm:p-8! lg:p-12! xl:p-16! overflow-hidden! shrink-0!">
        <img
          src={signupHeroImg}
          alt="Curated modern living architecture"
          className="absolute! inset-0! w-full! h-full! object-cover! object-center!"
        />

        <div className="absolute! inset-0! bg-gradient-to-t! from-black/85! via-black/40! to-black/35!" />

        <div className="relative! z-10! max-w-lg!">
          <h2 className="text-3xl! sm:text-4xl! lg:text-[40px]! font-bold! text-white! leading-[1.15]! tracking-tight! mb-3.5!">
            Join a community crafted for effortless modern living.
          </h2>

          <p className="text-white/80! text-xs! sm:text-sm! leading-relaxed! mb-6! m-0!">
            Create your account to unlock private studio capsules, personalized recommendations, and expedited checkout across our global catalog.
          </p>

          <div className="flex! items-center! gap-3!">
            <div className="flex! -space-x-2!">
              <div className="w-7! h-7! rounded-full! bg-stone-300! border-2! border-white! flex! items-center! justify-center! text-[10px]! font-bold! text-stone-700!">
                AM
              </div>
              <div className="w-7! h-7! rounded-full! bg-purple-300! border-2! border-white! flex! items-center! justify-center! text-[10px]! font-bold! text-purple-800!">
                SL
              </div>
              <div className="w-7! h-7! rounded-full! bg-amber-200! border-2! border-white! flex! items-center! justify-center! text-[10px]! font-bold! text-amber-800!">
                DK
              </div>
            </div>
            <span className="text-white/85! text-xs! font-medium!">
              Joined by modern collectors worldwide
            </span>
          </div>
        </div>

        <div className="absolute! bottom-6! left-6! right-6! lg:bottom-10! lg:left-12! lg:right-12! z-10! text-white/60! text-[11px]! flex! items-center! justify-between!">
          <span>Featured in Arch Digest &amp; Monocle</span>
          <span>Over 40,000 design objects cataloged</span>
        </div>
      </div>
    </div>
  )
}
