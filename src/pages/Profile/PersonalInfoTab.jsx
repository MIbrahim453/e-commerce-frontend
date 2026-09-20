import React, { useState } from 'react'
import { Form, Input, Button, Upload, message } from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined, 
  CheckCircleFilled, 
  CameraOutlined, 
  DeleteOutlined,
  SaveOutlined,
  HomeOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import customerAvatar from '../../assets/images/customer_avatar.jpg'

export default function PersonalInfoTab() {
  const [form] = Form.useForm()
  const [avatarSrc, setAvatarSrc] = useState(customerAvatar)

  const initialValues = {
    firstName: 'Elena',
    lastName: 'Vance',
    email: 'elena.vance@studio-curated.com',
    phone: '+1 (415) 892-4100',
    streetAddress: '742 Montgomery Street',
    apartment: 'Suite 400',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94111',
    country: 'United States',
  }

  const handleCustomUpload = ({ file, onSuccess }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarSrc(e.target.result)
      message.success('Profile photo updated successfully!')
      onSuccess('ok')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-6! sm:p-8! shadow-level-1!">
      <div className="mb-6! pb-4! border-b! border-border!">
        <h2 className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]! m-0!">
          Account Details
        </h2>
        <p className="text-xs! sm:text-sm! text-text-secondary! m-0! mt-1!">
          Manage your personal profile, contact information, and shipping address
        </p>
      </div>

      <div className="mb-8! p-5! bg-[#fcf9f8]! rounded-[20px]! border! border-[#ebebeb]! flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-5!">
        <div className="flex! items-center! gap-4!">
          <div className="w-18! h-18! sm:w-20! sm:h-20! rounded-[20px]! overflow-hidden! border-2! border-white! shadow-sm! bg-canvas! shrink-0!">
            <img 
              src={avatarSrc} 
              alt="Profile avatar preview" 
              className="w-full! h-full! object-cover! object-center!"
            />
          </div>
          <div>
            <h3 className="text-sm! sm:text-base! font-semibold! text-text-primary! m-0!">
              Profile Photo
            </h3>
            <p className="text-xs! text-text-secondary! m-0! mt-0.5!">
              Recommended dimensions 400×400px. PNG, JPG or WebP.
            </p>
          </div>
        </div>

        <div className="flex! items-center! gap-2.5! self-start! sm:self-center!">
          <Upload
            showUploadList={false}
            customRequest={handleCustomUpload}
            accept="image/*"
          >
            <Button
              type="text"
              className="rounded-full! bg-white! border! border-border! hover:bg-canvas! hover:border-text-primary! text-text-primary! text-xs! font-semibold! px-4! h-9! flex! items-center! gap-1.5!"
            >
              <CameraOutlined /> Change Photo
            </Button>
          </Upload>

          <Button
            type="text"
            onClick={() => {
              setAvatarSrc(customerAvatar)
              message.info('Reset to default photo')
            }}
            className="rounded-full! text-text-secondary! hover:text-red-500! hover:bg-canvas! text-xs! font-semibold! px-3! h-9! border-0!"
          >
            <DeleteOutlined /> Remove
          </Button>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        requiredMark={false}
      >
        <div>
          <h3 className="text-sm! font-semibold! text-text-primary! tracking-[-0.02em]! mb-3!">
            Personal Information
          </h3>
          <div className="grid! grid-cols-1! sm:grid-cols-2! gap-x-6! gap-y-1!">
            <Form.Item
              name="firstName"
              label={<span className="text-xs! font-semibold! text-text-primary!">First Name</span>}
              className="mb-4!"
            >
              <Input
                prefix={<UserOutlined className="text-text-secondary! mr-2!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span className="text-xs! font-semibold! text-text-primary!">Last Name</span>}
              className="mb-4!"
            >
              <Input
                prefix={<UserOutlined className="text-text-secondary! mr-2!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-xs! font-semibold! text-text-primary!">Email Address</span>}
              className="mb-4!"
            >
              <Input
                prefix={<MailOutlined className="text-text-secondary! mr-2!" />}
                suffix={<CheckCircleFilled className="text-[#137333]! text-sm!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="text-xs! font-semibold! text-text-primary!">Phone Number</span>}
              className="mb-4!"
            >
              <Input
                prefix={<PhoneOutlined className="text-text-secondary! mr-2!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>
          </div>
        </div>

        <div className="mt-5! pt-5! border-t! border-border!">
          <h3 className="text-sm! font-semibold! text-text-primary! tracking-[-0.02em]! mb-1!">
            Delivery Address
          </h3>
          <p className="text-xs! text-text-secondary! mb-4!">
            Your primary shipping and fulfillment destination for Cash on Delivery orders
          </p>

          <div className="grid! grid-cols-1! sm:grid-cols-2! gap-x-6! gap-y-1!">
            <Form.Item
              name="streetAddress"
              label={<span className="text-xs! font-semibold! text-text-primary!">Street Address</span>}
              className="mb-4! sm:col-span-2!"
            >
              <Input
                prefix={<HomeOutlined className="text-text-secondary! mr-2!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="apartment"
              label={<span className="text-xs! font-semibold! text-text-primary!">Apartment, Suite, Unit</span>}
              className="mb-4!"
            >
              <Input
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="city"
              label={<span className="text-xs! font-semibold! text-text-primary!">City</span>}
              className="mb-4!"
            >
              <Input
                prefix={<EnvironmentOutlined className="text-text-secondary! mr-2!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="state"
              label={<span className="text-xs! font-semibold! text-text-primary!">State / Province</span>}
              className="mb-4!"
            >
              <Input
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="postalCode"
              label={<span className="text-xs! font-semibold! text-text-primary!">Postal Code / ZIP</span>}
              className="mb-4!"
            >
              <Input
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>

            <Form.Item
              name="country"
              label={<span className="text-xs! font-semibold! text-text-primary!">Country</span>}
              className="mb-4! sm:col-span-2!"
            >
              <Input
                prefix={<GlobalOutlined className="text-text-secondary! mr-2!" />}
                className="rounded-full! h-11! border! border-border! bg-white! hover:border-[#5433eb]! focus:border-[#5433eb]! px-4! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent!"
              />
            </Form.Item>
          </div>
        </div>

        <div className="mt-6! pt-5! border-t! border-border! flex! items-center! justify-end! gap-3!">
          <Button
            type="text"
            className="rounded-full! text-text-secondary! hover:text-text-primary! hover:bg-canvas! px-5! h-11! text-xs! sm:text-sm! font-semibold!"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className="rounded-full! bg-primary! hover:bg-primary/90! text-white! shadow-violet-glow! px-6! sm:px-8! h-11! text-xs! sm:text-sm! font-semibold! border-0! flex! items-center! gap-2!"
          >
            <SaveOutlined />
            Save Profile Changes
          </Button>
        </div>
      </Form>
    </div>
  )
}
