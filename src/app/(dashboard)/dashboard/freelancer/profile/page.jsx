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

  // Initialize as an empty array to prevent "undefined reading" crashes on initial mount
  const [skillsList, setSkillsList] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter((s) => s !== skillToRemove));
  };

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

  const [form, setForm] = useState({
    name: "",
    title: "",
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
        experience: user.experience || "",
        portfolio: user.portfolio || "",
        linkedin: user.linkedin || "",
        bio: user.bio || "",
      });

      setImageUrl(user.image || "");
      // Safely load array value state here once session context data returns
      setSkillsList(Array.isArray(user.skills) ? user.skills : []);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await authClient.updateUser({
        name: form.name,
        image: imageUrl,
        title: form.title,
        skills: skillsList, // Sends clean string array state directly
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
      <div className="mb-6">
        <h2 className="text-4xl font-bold">Edit Profile</h2>
        <p className="text-gray-500">Freelancer Dashboard</p>
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
                <TextField name="name" isRequired>
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

                <TextField name="title">
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

                <TextField name="experience">
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

                <TextField name="portfolio">
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

                <TextField name="linkedin">
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

                <div className="flex flex-col col-span-2">
                  <Label>About Yourself</Label>
                  <TextArea
                    value={form.bio}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                </div>

                {/* Skills Interactive Tag Field */}
                <div className="flex flex-col col-span-1 md:col-span-2 mt-2">
                  <Label className="mb-2 block text-sm font-medium text-[#333333]">
                    Skills & Core Expertise{" "}
                    <span className="text-red-500">*</span>
                  </Label>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a skill (e.g. React) and click Add"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddSkill(e);
                        }
                      }}
                      className="rounded-xl flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 rounded-xl h-10 border border-gray-200"
                    >
                      Add
                    </Button>
                  </div>

                  {/* Hidden input field ensuring HTML validation flags empty lists */}
                  <input
                    type="hidden"
                    name="skills_validator"
                    required={skillsList.length === 0}
                  />

                  {/* Render Added Skills List as dynamic dismissible chips */}
                  {skillsList.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-100/80">
                      {skillsList.map((skill, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1.5 text-xs font-semibold bg-white text-blue-600 border border-blue-100 pl-3 pr-2 py-1 rounded-xl shadow-sm capitalize"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-gray-400 hover:text-red-500 transition font-bold w-4 h-4 rounded-full hover:bg-gray-100 flex items-center justify-center text-[10px]"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1.5 pl-1">
                      No skills added yet. Add at least one skill to save
                      modifications.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Profile Image Section */}
            <section className="w-full mt-8 pt-6 border-t border-gray-50">
              <label className="mb-2 block text-sm font-medium text-[#333333]">
                New Profile Image
              </label>

              <div className="flex items-center gap-5">
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

                <div>
                  <p className="font-medium text-[#333333]">
                    {uploading ? "Uploading..." : "Profile Image"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, WEBP (Max 5MB)
                  </p>

                  {imageUrl && (
                    <p className="mt-2 text-xs text-green-500">
                      ✓ Image Displayed
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
            </section>

            {/* Form Actions */}
            <div className="flex gap-4 justify-center items-center mt-8 pt-4 border-t border-gray-50">
              <Button type="reset" variant="secondary">
                Reset Changes
              </Button>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Update Profile Settings
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
