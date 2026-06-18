"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Textarea,
  Select,
  SelectItem,
  ListBox,
  TextArea,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientRegisterPage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    if (!image) {
      toast.error("Please select an image");

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setImageUrl(data.url);

        toast.success("Image uploaded successfully");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("contactPerson");
      const email = formData.get("email");
      const password = formData.get("password");
      const companyName = formData.get("companyName");
      const companySize = formData.get("companySize");
      const industry = formData.get("industry");
      const website = formData.get("website");
      const location = formData.get("location");
      const description = formData.get("description");

      const role = "client";
      const image = imageUrl;

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        role,

        companyName,
        companySize,
        industry,
        website,
        location,
        description,
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }

      console.log("Signup Success:", data);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      redirect("/dashboard/client");
    }
  };

  const companySizes = [
    { key: "1-10", label: "1-10 Employees" },
    { key: "11-50", label: "11-50 Employees" },
    { key: "51-200", label: "51-200 Employees" },
    { key: "201-500", label: "201-500 Employees" },
    { key: "500+", label: "500+ Employees" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#333333]">
          Create Client Account
        </h1>

        <p className="mt-3 text-gray-500">
          Register your company and start hiring talented freelancers.
        </p>
      </div>

      <Form
        onSubmit={onSubmit}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-10"
      >
        <section className="w-full">
          <h2 className="mb-6 text-xl font-bold text-[#333333]">
            Company Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <TextField name="companyName" isRequired>
              <Label>Company Name</Label>
              <Input placeholder="Google LLC" />
              <FieldError />
            </TextField>

            <TextField name="contactPerson" isRequired>
              <Label>Contact Person Name</Label>
              <Input placeholder="John Smith" />
              <FieldError />
            </TextField>

            <TextField name="email" type="email" isRequired>
              <Label>Email Address</Label>
              <Input placeholder="contact@company.com" />
              <FieldError />
            </TextField>

            <TextField name="website">
              <Label>Website</Label>
              <Input placeholder="https://company.com" />
            </TextField>

            <TextField
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
              isRequired
            >
              <Label>Password</Label>
              <Input placeholder="Create password" />
              <FieldError />
            </TextField>

            <TextField name="confirmPassword" type="password" isRequired>
              <Label>Confirm Password</Label>

              <Input placeholder="Confirm password" className="rounded-xl" />

              <FieldError />
            </TextField>

            <TextField name="industry">
              <Label>Industry</Label>
              <Input placeholder="Software Development" />
            </TextField>

            <div className="flex flex-col gap-2">
              <Label>Company Size</Label>

              <Select
                name="companySize"
                className="w-full"
                placeholder="Select company size"
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {companySizes.map((size) => (
                      <ListBox.Item
                        key={size.key}
                        id={size.key}
                        textValue={size.label}
                      >
                        {size.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* image upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#333333]">
                Profile Image
              </label>

              <div className="flex items-center gap-5">
                {/* Image Upload Box */}
                <label
                  className="
        flex h-28 w-28 cursor-pointer overflow-hidden
        rounded-2xl border-2 border-dashed border-gray-300
        transition hover:border-[#3B82F6]
      "
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setImage(file);

                        // Preview
                        setImageUrl(URL.createObjectURL(file));
                      }
                    }}
                  />

                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                      Upload
                    </div>
                  )}
                </label>

                {/* Text Info */}
                <div>
                  <p className="font-medium text-[#333333]">
                    {uploading ? "Uploading..." : "Profile Image"}
                  </p>

                  <p className="text-sm text-gray-500">
                    PNG, JPG, WEBP (Max 5MB)
                  </p>

                  {imageUrl && (
                    <p className="mt-2 text-xs text-green-500">
                      ✓ Image Selected
                    </p>
                  )}

                  {image && !imageUrl.includes("cloudinary") && (
                    <button
                      type="button"
                      onClick={uploadImage}
                      disabled={uploading}
                      className="
            mt-3 rounded-full bg-gradient-to-r
            from-[#3B82F6] to-[#8B5CF6]
            px-5 py-2 text-sm font-medium text-white
            disabled:opacity-50
          "
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  )}

                  {imageUrl && imageUrl.includes("cloudinary") && (
                    <p className="mt-2 text-xs text-green-500">
                      ✓ Upload Complete
                    </p>
                  )}
                </div>
              </div>
            </div>

            <TextField name="location">
              <Label>Location</Label>
              <Input placeholder="Dhaka, Bangladesh" />
            </TextField>
          </div>

          <div className="mt-5 flex flex-col">
            <Label>Company Description</Label>

            <TextArea
              name="description"
              placeholder="Tell freelancers about your company, mission, and projects..."
              // minRows={5}
              className="mt-2"
            />
          </div>
        </section>
        <div className="flex gap-4 justify-center items-center mt-5">
          <Button type="reset" variant="secondary">
            Reset
          </Button>

          <Button
            type="submit"
            className=" h-12 w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            Create Client Account
          </Button>
        </div>
      </Form>
    </div>
  );
}
