"use client";

import { authClient } from "@/lib/auth-client";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  TextArea,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileEditPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const img = user?.image;
  // console.log(img)

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(img);
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

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    website: "",
    industry: "",
    location: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        companyName: user.companyName || "",
        contactPerson: user.name || "",
        website: user.website || "",
        industry: user.industry || "",
        location: user.location || "",
        description: user.description || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = form.contactPerson;

    const image = imageUrl;

    const companyName = form.companyName;
    const industry = form.industry;

    const website = form.website;
    const location = form.location;

    const description = form.description;

    await authClient.updateUser({
      name: name,
      image: image,
      companyName: companyName,
      industry: industry,
      website: website,
      location: location,
      description: description,
    });
    redirect('/dashboard/client')
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl"
    >
      <div className="grid gap-5 md:grid-cols-2 w-full">
        <TextField name="companyName">
          <Label>Company Name</Label>
          <Input
            value={form.companyName}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
          />
          <FieldError />
        </TextField>
        <TextField name="contactPerson">
          <Label>Contact Person</Label>
          <Input
            value={form.contactPerson}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                contactPerson: e.target.value,
              }))
            }
          />
          <FieldError />
        </TextField>
        <TextField name="website">
          <Label>Website</Label>
          <Input
            value={form.website}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                website: e.target.value,
              }))
            }
          />
        </TextField>
        <TextField name="industry">
          <Label>Industry</Label>
          <Input
            value={form.industry}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                industry: e.target.value,
              }))
            }
          />
        </TextField>
        <TextField name="location">
          <Label>Location</Label>
          <Input
            value={form.location}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />
        </TextField>
        <div className="col-span-2 flex flex-col">
          <Label>Description</Label>

          <TextArea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Tell freelancers about your company..."
            className="mt-2"
          />
        </div>
        <div className="flex justify-around items-center col-span-2">
          {/* image upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333333]">
              New Profile Image
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
        </div>
        \
      </div>

      <button
        type="submit"
        className="mt-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-6 py-3 text-white"
      >
        Save Changes
      </button>
    </Form>
  );
}
