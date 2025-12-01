import { Editor } from "@/components/editor";
import { FormView } from "@/components/formview";
import { Separator } from "@/components/ui/separator";
import type { FormSpec } from "@/lib/survey";
import { get } from "@/lib/api";
import { toast } from "sonner";

import { markdown_to_form_wasm_v2 } from "markdownparser";
import { useEffect, useState } from "react";

export const exampleText = `# User Registration Form

Text: First name [John Dog]

Text: Email Address [john@dog.com]

Textarea: This is nice [Enter your comments here]

checkbox: subscribe?
- [x] Subscribe to newsletter
- [ ] second value here

radio: my radio
- radio button
- another one
- third radio

Submit: submit`;

interface Form {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export default function Page({ formId }: { formId?: string }) {
  const [formtext, setFormtext] = useState<string>(exampleText);
  const [survey, setSurvey] = useState<FormSpec | undefined>(undefined);

  // Load form content when formId is provided
  useEffect(() => {
    async function loadForm() {
      if (!formId) {
        return;
      }

      try {
        const form = await get<Form>(`/forms/${formId}`);
        if (form.content) {
          setFormtext(form.content);
        } else {
          toast.error("Form content not found");
        }
      } catch (error) {
        console.error("Failed to load form:", error);
        toast.error("Failed to load form");
      }
    }

    loadForm();
  }, [formId]);

  useEffect(() => {
    const result = markdown_to_form_wasm_v2(formtext);
    console.log(result);
    setSurvey(result as FormSpec);
  }, [formtext]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main mx-auto w-full max-w-screen-2xl flex flex-1 flex-col gap-2 px-4">
        <div className="flex flex-col md:flex-row gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex-1 min-w-0 max-w-xl p-4">
            <Editor formtext={formtext} setFormtext={setFormtext} />
          </div>
          <Separator orientation="horizontal" className="md:hidden" />
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex-1 min-w-0 max-w-xl p-4">
            <FormView survey={survey} />
          </div>
        </div>
      </div>
    </div>
  );
}
