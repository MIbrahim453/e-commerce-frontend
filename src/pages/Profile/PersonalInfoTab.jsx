import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Upload, message } from "antd";
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
  GlobalOutlined,
  EditOutlined,
  CloseOutlined,
  LockOutlined,
} from "@ant-design/icons";
import customerAvatar from "../../assets/images/customer_avatar.jpg";
import { AuthContext } from "../../context/authContext";

export default function PersonalInfoTab({ isEditing = false, setIsEditing }) {
  const [form] = Form.useForm();
  const { user, updateProfile, loading } = useContext(AuthContext);
  const [avatarSrc, setAvatarSrc] = useState(
    user?.profilePhoto || customerAvatar,
  );

  const populateFormWithUser = () => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        streetAddress: user.address?.street || "",
        apartment: user.address?.apartment || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        postalCode: user.address?.zipCode ? String(user.address.zipCode) : "",
        country: user.address?.country || "",
      });
      if (user.profilePhoto) {
        setAvatarSrc(user.profilePhoto);
      }
    }
  };

  useEffect(() => {
    populateFormWithUser();
  }, [user, form]);

  const handleCustomUpload = ({ file, onSuccess }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarSrc(e.target.result);
      message.success("Profile photo selected!");
      onSuccess("ok");
    };
    reader.readAsDataURL(file);
  };

  const handleResetForm = () => {
    populateFormWithUser();
    if (setIsEditing) {
      setIsEditing(false);
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      firstName: values.firstName?.trim(),
      lastName: values.lastName?.trim(),
      email: values.email?.trim(),
      phone: values.phone?.trim(),
      address: {
        street: values.streetAddress?.trim() || "",
        apartment: values.apartment?.trim() || "",
        city: values.city?.trim() || "",
        state: values.state?.trim() || "",
        zipCode: values.postalCode ? Number(values.postalCode) : undefined,
        country: values.country?.trim() || "",
      },
    };

    const res = await updateProfile(payload);
    if (res?.success) {
      message.success(res.message || "Profile updated successfully!");
      if (setIsEditing) {
        setIsEditing(false);
      }
    } else {
      message.error(res?.message || "Failed to update profile");
    }
  };

  const inputClassName = `rounded-full! h-11! border! border-border! bg-white! text-text-primary! text-sm! font-medium! px-4! [&>input]:text-text-primary! [&>input]:text-sm! [&>input]:font-medium! [&>input]:border-0! [&>input]:outline-none! [&>input]:ring-0! [&>input]:bg-transparent! ${
    !isEditing
      ? "cursor-default! select-text! bg-white! hover:border-border!"
      : "hover:border-[#5433eb]! focus:border-[#5433eb]! focus-within:border-[#5433eb]!"
  }`;

  return (
    <div className="bg-white! rounded-[24px]! sm:rounded-[28px]! border! border-border! p-6! sm:p-8! shadow-level-1!">
      <div className="mb-6! pb-4! border-b! border-border! flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4!">
        <div>
          <div className="flex! items-center! gap-2.5!">
            <h2 className="text-xl! sm:text-2xl! font-semibold! text-text-primary! tracking-[-0.04em]! m-0!">
              Account Details
            </h2>
            {!isEditing ? (
              <span className="text-[11px]! font-medium! bg-canvas! text-text-secondary! px-2.5! py-0.5! rounded-full! border! border-border! flex! items-center! gap-1!">
                <LockOutlined className="text-[10px]!" /> Read-only
              </span>
            ) : (
              <span className="text-[11px]! font-semibold! bg-[#e4dfff]! text-primary! px-2.5! py-0.5! rounded-full! border! border-[#5433eb]/20! flex! items-center! gap-1!">
                <EditOutlined className="text-[10px]!" /> Editing Mode
              </span>
            )}
          </div>
          <p className="text-xs! sm:text-sm! text-text-secondary! m-0! mt-1!">
            Manage your personal profile, contact information, and shipping
            address
          </p>
        </div>

        {!isEditing && (
          <Button
            type="primary"
            onClick={() => setIsEditing && setIsEditing(true)}
            className="rounded-full! bg-primary! hover:bg-primary/90! text-white! text-xs! sm:text-sm! font-semibold! px-5! h-10! border-0! flex! items-center! gap-2! self-start! sm:self-auto! shadow-violet-glow!"
          >
            <EditOutlined />
            Edit Profile
          </Button>
        )}
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
              {isEditing
                ? "Recommended dimensions 400×400px. PNG, JPG or WebP."
                : 'Click "Edit Profile" above to modify your details.'}
            </p>
          </div>
        </div>

        {isEditing && (
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
                setAvatarSrc(customerAvatar);
                message.info("Reset to default photo");
              }}
              className="rounded-full! text-text-secondary! hover:text-red-500! hover:bg-canvas! text-xs! font-semibold! px-3! h-9! border-0!"
            >
              <DeleteOutlined /> Remove
            </Button>
          </div>
        )}
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          phone: user?.phone || "",
          streetAddress: user?.address?.street || "",
          apartment: user?.address?.apartment || "",
          city: user?.address?.city || "",
          state: user?.address?.state || "",
          postalCode: user?.address?.zipCode
            ? String(user.address.zipCode)
            : "",
          country: user?.address?.country || "",
        }}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div>
          <h3 className="text-sm! font-semibold! text-text-primary! tracking-[-0.02em]! mb-3!">
            Personal Information
          </h3>
          <div className="grid! grid-cols-1! sm:grid-cols-2! gap-x-6! gap-y-1!">
            <Form.Item
              name="firstName"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  First Name
                </span>
              }
              rules={[{ required: true, message: "First name is required" }]}
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="First Name"
                prefix={<UserOutlined className="text-text-secondary! mr-2!" />}
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Last Name
                </span>
              }
              rules={[{ required: true, message: "Last name is required" }]}
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Last Name"
                prefix={<UserOutlined className="text-text-secondary! mr-2!" />}
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Email Address
                </span>
              }
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Email Address"
                prefix={<MailOutlined className="text-text-secondary! mr-2!" />}
                suffix={
                  !isEditing && (
                    <CheckCircleFilled className="text-[#137333]! text-sm!" />
                  )
                }
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Phone Number
                </span>
              }
              rules={[{ required: true, message: "Phone number is required" }]}
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Phone Number"
                prefix={
                  <PhoneOutlined className="text-text-secondary! mr-2!" />
                }
                className={inputClassName}
              />
            </Form.Item>
          </div>
        </div>

        <div className="mt-5! pt-5! border-t! border-border!">
          <h3 className="text-sm! font-semibold! text-text-primary! tracking-[-0.02em]! mb-1!">
            Delivery Address
          </h3>
          <p className="text-xs! text-text-secondary! mb-4!">
            Your primary shipping and fulfillment destination for Cash on
            Delivery orders
          </p>

          <div className="grid! grid-cols-1! sm:grid-cols-2! gap-x-6! gap-y-1!">
            <Form.Item
              name="streetAddress"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Street Address
                </span>
              }
              className="mb-4! sm:col-span-2!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Street Address"
                prefix={<HomeOutlined className="text-text-secondary! mr-2!" />}
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="apartment"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Apartment, Suite, Unit
                </span>
              }
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Apartment, Suite, Unit"
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="city"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  City
                </span>
              }
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="City"
                prefix={
                  <EnvironmentOutlined className="text-text-secondary! mr-2!" />
                }
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="state"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  State / Province
                </span>
              }
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="State / Province"
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="postalCode"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Postal Code / ZIP
                </span>
              }
              className="mb-4!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Postal Code / ZIP"
                className={inputClassName}
              />
            </Form.Item>

            <Form.Item
              name="country"
              label={
                <span className="text-xs! font-semibold! text-text-primary!">
                  Country
                </span>
              }
              className="mb-4! sm:col-span-2!"
            >
              <Input
                readOnly={!isEditing}
                placeholder="Country"
                prefix={
                  <GlobalOutlined className="text-text-secondary! mr-2!" />
                }
                className={inputClassName}
              />
            </Form.Item>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6! pt-5! border-t! border-border! flex! items-center! justify-end! gap-3!">
            <Button
              type="text"
              onClick={handleResetForm}
              disabled={loading}
              className="rounded-full! text-text-secondary! hover:text-text-primary! hover:bg-canvas! px-5! h-11! text-xs! sm:text-sm! font-semibold! flex! items-center! gap-1.5!"
            >
              <CloseOutlined /> Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="rounded-full! bg-primary! hover:bg-primary/90! text-white! shadow-violet-glow! px-6! sm:px-8! h-11! text-xs! sm:text-sm! font-semibold! border-0! flex! items-center! gap-2!"
            >
              <SaveOutlined />
              Save Profile Changes
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
