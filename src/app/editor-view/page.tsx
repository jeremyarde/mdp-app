import { Editor } from "@/components/editor";
import { FormView } from "@/components/formview";
import { Separator } from "@/components/ui/separator";
import type { FormSpec } from "@/lib/survey";

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

export default function Page() {
  const [formtext, setFormtext] = useState<string>(exampleText);
  const [survey, setSurvey] = useState<FormSpec | undefined>(undefined);

  useEffect(() => {
    const result = markdown_to_form_wasm_v2(formtext);
    console.log(result);
    setSurvey(result as FormSpec);
  }, [formtext]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Editor formtext={formtext} setFormtext={setFormtext} />
          <Separator orientation="horizontal" />
          <FormView survey={survey} />
        </div>
      </div>
    </div>
  );
}
