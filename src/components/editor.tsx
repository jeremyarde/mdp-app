import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { SaveIcon } from "lucide-react";
import { post } from "@/lib/api";
import { useState } from "react";

export function Editor({
  formtext,
  setFormtext,
}: {
  formtext: string;
  setFormtext: (text: string) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormtext(e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Example: Save form to localStorage via mock API
      await post("/forms", {
        content: formtext,
        title: formtext.split("\n")[0] || "Untitled Form",
      });
      console.log("Form saved successfully!");
    } catch (error) {
      console.error("Failed to save form:", error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid w-full gap-3">
            <Textarea
              placeholder="Type your message here."
              id="message-2"
              value={formtext}
              onChange={handleChange}
            />
          </div>
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            <SaveIcon className="size-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
