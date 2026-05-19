"use client";

import { authClient } from "@/lib/auth-client";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Description,
  Button,
  Select,
  ListBox,
} from "@heroui/react";
import { useRef } from "react";
import toast from "react-hot-toast";

const categories = [
  "Tech",
  "FinTech",
  "EdTech",
  "HealthTech",
  "GreenTech",
  "SaaS",
  "AgriTech",
  "AI",
  "Education",
  "Health",
  "Other",
];

export default function AddIdeaPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = Object.fromEntries(formData.entries());

    const ideaData = {
      title: form.title,
      shortDescription: form.shortDescription,
      detailedDescription: form.detailedDescription,
      problemStatement: form.problemStatement,
      proposedSolution: form.proposedSolution,
      category: form.category,
      targetAudience: form.targetAudience,
      imageURL: form.imageURL || "",
      estimatedBudget: form.estimatedBudget || "",
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      author: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        photo: user?.image,
      },
      likes: [],
      likeCount: 0,
      commentCount: 0,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:4000/idea", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(ideaData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Idea posted successfully!");
        formRef.current?.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to post idea. Check your connection.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-7">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black tracking-[-0.03em]">
            Add your idea
          </h1>
          <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mt-1">
            Share your startup idea with the world.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8">
          <Form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col gap-5"
          >
            {/* Idea Title */}
            <TextField name="title" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Idea Title <span className="text-red-400">*</span>
              </Label>
              <Input
                placeholder="e.g. AI-Powered Finance Assistant"
                className="w-full"
              />
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Short Description */}
            <TextField name="shortDescription" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Short Description <span className="text-red-400">*</span>
              </Label>
              <Input
                placeholder="One line summary of your idea"
                className="w-full"
              />
              <Description className="text-[11px] text-black/30 mt-1 tracking-[-0.1px]">
                Keep it under 100 characters
              </Description>
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Detailed Description */}
            <TextField name="detailedDescription" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Detailed Description <span className="text-red-400">*</span>
              </Label>
              <TextArea
                placeholder="Describe your idea in detail..."
                className="w-full min-h-[120px]"
              />
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Problem Statement */}
            <TextField name="problemStatement" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Problem Statement <span className="text-red-400">*</span>
              </Label>
              <TextArea
                placeholder="What problem does your idea solve?"
                className="w-full min-h-[100px]"
              />
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Proposed Solution */}
            <TextField name="proposedSolution" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Proposed Solution <span className="text-red-400">*</span>
              </Label>
              <TextArea
                placeholder="How does your idea solve the problem?"
                className="w-full min-h-[100px]"
              />
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Two columns — Category + Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-black tracking-[-0.1px]">
                  Category <span className="text-red-400">*</span>
                </label>
                <Select
                  name="category"
                  placeholder="Select a category"
                  className="w-full"
                >
                  <Label className="sr-only">Category</Label>
                  <Select.Trigger className="w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {categories.map((cat) => (
                        <ListBox.Item key={cat} id={cat} textValue={cat}>
                          {cat}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="targetAudience" isRequired className="w-full">
                <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                  Target Audience <span className="text-red-400">*</span>
                </Label>
                <Input
                  placeholder="e.g. Students, Small businesses"
                  className="w-full"
                />
                <FieldError className="text-[11px] text-red-400 mt-1" />
              </TextField>
            </div>

            {/* Two columns — Image URL + Estimated Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextField name="imageURL" className="w-full">
                <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
                <Description className="text-[11px] text-black/30 mt-1 tracking-[-0.1px]">
                  Optional banner image
                </Description>
                <FieldError className="text-[11px] text-red-400 mt-1" />
              </TextField>

              <TextField name="estimatedBudget" className="w-full">
                <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                  Estimated Budget
                </Label>
                <Input placeholder="e.g. $5,000 — $10,000" className="w-full" />
                <Description className="text-[11px] text-black/30 mt-1 tracking-[-0.1px]">
                  Optional
                </Description>
                <FieldError className="text-[11px] text-red-400 mt-1" />
              </TextField>
            </div>

            {/* Tags */}
            <TextField name="tags" className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Tags
              </Label>
              <Input placeholder="e.g. AI, Mobile, B2C" className="w-full" />
              <Description className="text-[11px] text-black/30 mt-1 tracking-[-0.1px]">
                Separate tags with commas. Optional.
              </Description>
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Divider */}
            <div className="h-px bg-black/[0.06]" />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full text-[13px] font-normal text-white bg-black hover:bg-black/80 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
            >
              Post Idea
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
