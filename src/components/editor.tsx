import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Editor({
  formtext,
  setFormtext,
}: {
  formtext: string;
  setFormtext: (text: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormtext(e.target.value);
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid w-full gap-3">
            <Label htmlFor="message-2">Your Message</Label>
            <Textarea
              placeholder="Type your message here."
              id="message-2"
              value={formtext}
              onChange={handleChange}
            />
            <p className="text-muted-foreground text-sm">
              Your message will be copied to the support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
