import IdeaUpdateForm from "@/components/IdeaUpdateForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export default async function UpdateIdeaForm({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const idea = await res.json();

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-7">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black tracking-[-0.03em]">
            Update your idea
          </h1>
          <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mt-1">
            Edit and improve your startup idea.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8">
          <IdeaUpdateForm idea={idea} />
        </div>
      </div>
    </div>
  );
}
