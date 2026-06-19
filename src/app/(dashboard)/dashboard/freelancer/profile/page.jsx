"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  TextArea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.image);
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
    name: "",
    title: "",
    skills: "",
    experience: "",
    portfolio: "",
    linkedin: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        title: user.title || "",
        skills: user.skills || "",
        experience: user.experience || "",
        portfolio: user.portfolio || "",
        linkedin: user.linkedin || "",
        bio: user.bio || "",
      });

      setImageUrl(user.image || "");
    }
  }, [user]);
  console.log(user);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await authClient.updateUser({
        name: form.name,
        image: imageUrl,
        title: form.title,
        skills: form.skills,
        experience: form.experience,
        portfolio: form.portfolio,
        linkedin: form.linkedin,
        bio: form.bio,
      });

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold">Edit Profile</h2>
        <p>Freelancer Dashboard</p>
      </div>
      <div>
        <div className="mx-auto max-w-5xl">
          <Form
            onSubmit={onSubmit}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-10"
          >
            {/* Account Information */}

            <section className="w-full">
              <h2 className="mb-5 text-xl font-bold text-[#333333]">
                Account Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <TextField name="name" defaultValue={user?.name} isRequired>
                  <Label>Full Name</Label>

                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />

                  <FieldError />
                </TextField>

                <TextField name="title" defaultValue={user?.title}>
                  <Label>Professional Title</Label>

                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </TextField>

                <TextField name="skills" defaultValue={user?.skills}>
                  <Label>Skills</Label>

                  <Input
                    value={form.skills}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        skills: e.target.value,
                      }))
                    }
                  />
                </TextField>

                <TextField name="experience" defaultValue={user?.experience}>
                  <Label>Experience</Label>

                  <Input
                    value={form.experience}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                  />
                </TextField>

                <TextField name="portfolio" defaultValue={user?.portfolio}>
                  <Label>Portfolio Website</Label>

                  <Input
                    value={form.portfolio}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        portfolio: e.target.value,
                      }))
                    }
                  />
                </TextField>
                <TextField name="linkedin" defaultValue={user?.linkedin}>
                  <Label>LinkedIn Profile</Label>

                  <Input
                    value={form.linkedin}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }))
                    }
                  />
                </TextField>

                <div className="mt-5 flex flex-col col-span-2">
                  <Label>About Yourself</Label>

                  <TextArea
                    value={form.bio}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </section>

            {/* Professional Profile */}
            <div className="flex justify-around items-center">
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

            {/* Submit Button */}
            <div className="flex gap-4 justify-center items-center mt-5">
              <Button type="reset" variant="secondary">
                Reset
              </Button>

              <Button
                type="submit"
                className=" h-12 w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Create Freelancer Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
