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
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FreelancerRegisterPage() {
  // 1. Add these states inside your component body
  const [skillsList, setSkillsList] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // 2. Add these helper functions to handle the additions and removals
  const handleAddSkill = (e) => {
    e.preventDefault(); // Stop form from triggering a full submission pass
    const trimmed = skillInput.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setSkillInput(""); // Clear field text wrapper
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = Object.fromEntries(form);

    // FIX: Convert the comma-separated string from the input into a clean string array
    const rawSkillsString = formData.skills ? String(formData.skills) : "";
    const cleanSkillsArray = rawSkillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== ""); // Removes empty entries from trailing commas

    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      title: formData.title,
      skills: skillsList,
      linkedin: formData.linkedin,
      portfolio: formData.portfolio,
      experience: formData.experience,
      bio: formData.bio,
      image: imageUrl,
      role: "freelancer",
    });

    console.log(data, error);
    redirect("/dashboard/freelancer");
  };

  return (
    <div>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#333333]">
            Join Giglance as a Freelancer
          </h1>
          <p className="mt-3 text-gray-500">
            Create your profile and start earning by showcasing your skills.
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
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
                <Input placeholder="John Doe" className="rounded-xl" />
                <FieldError />
              </TextField>

              <TextField
                name="email"
                type="email"
                isRequired
                validate={(value) => {
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Enter a valid email";
                  }
                  return null;
                }}
              >
                <Label>Email Address</Label>
                <Input placeholder="john@example.com" className="rounded-xl" />
                <FieldError />
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
            </div>
          </section>

          {/* Professional Profile */}
          <section className="mt-10 w-full">
            <h2 className="mb-5 text-xl font-bold text-[#333333]">
              Professional Profile
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <TextField name="title">
                <Label>Professional Title</Label>
                <Input
                  placeholder="Full Stack Developer"
                  className="rounded-xl"
                />
              </TextField>

              <TextField name="experience">
                <Label>Experience</Label>
                <Input placeholder="3 Years" className="rounded-xl" />
              </TextField>

              <TextField name="portfolio">
                <Label>Portfolio Website</Label>
                <Input
                  placeholder="https://portfolio.com"
                  className="rounded-xl"
                />
              </TextField>

              <TextField name="linkedin">
                <Label>LinkedIn Profile</Label>
                <Input
                  placeholder="https://linkedin.com/in/user"
                  className="rounded-xl"
                />
              </TextField>

              {/* Skills Interactive Tag Field */}
              <div className="flex flex-col col-span-1 md:col-span-2">
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
                    No skills added yet. Add at least one skill to complete your
                    freelancer onboarding.
                  </p>
                )}
              </div>

              {/* Image upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#333333]">
                  Profile Image
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

            <div className="mt-5 flex flex-col">
              <Label>About Yourself</Label>
              <TextArea
                name="bio"
                placeholder="Tell clients about your experience and expertise..."
                className="mt-2"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex gap-4 justify-center items-center mt-5">
            <Button type="reset" variant="secondary">
              Reset
            </Button>

            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Create Freelancer Account
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
