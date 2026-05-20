"use client";
import React, { useRef } from "react";
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
const IdeaUpdateForm = ({ idea }) => {
  const formRef = useRef(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedForm = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedForm),
        },
      );
      if (res.ok) {
        toast.success("Idea updated successfully!");
        formRef.current?.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to update idea. Check your connection.");
    }
  };
  return (
    <div>
      <Form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* Idea Title */}
        <TextField
          name="title"
          isRequired
          className="w-full"
          defaultValue={idea?.title}
        >
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
        <TextField
          name="shortDescription"
          isRequired
          className="w-full"
          defaultValue={idea?.shortDescription}
        >
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
        <TextField
          name="detailedDescription"
          isRequired
          className="w-full"
          defaultValue={idea?.detailedDescription}
        >
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
        <TextField
          name="problemStatement"
          isRequired
          className="w-full"
          defaultValue={idea?.problemStatement}
        >
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
        <TextField
          name="proposedSolution"
          isRequired
          className="w-full"
          defaultValue={idea?.proposedSolution}
        >
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
              defaultSelectedKey={idea?.category}
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

          <TextField
            name="targetAudience"
            isRequired
            className="w-full"
            defaultValue={idea?.targetAudience}
          >
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
          <TextField
            name="imageURL"
            className="w-full"
            defaultValue={idea?.imageURL}
          >
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

          <TextField
            name="estimatedBudget"
            className="w-full"
            defaultValue={idea?.estimatedBudget}
          >
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
        <TextField name="tags" className="w-full" defaultValue={idea.tags}>
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

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onPress={() => window.history.back()}
            className="flex-1 text-[13px] font-normal text-black/60 bg-black/[0.04] hover:bg-black/[0.08] py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 text-[13px] font-normal text-white bg-black hover:bg-black/80 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
          >
            Update Idea
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default IdeaUpdateForm;
