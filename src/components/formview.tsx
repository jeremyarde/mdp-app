import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormSpec, FormBlock } from "@/lib/survey";

function renderBlock(block: FormBlock) {
  switch (block.block_type) {
    case "Title":
      return (
        <FieldSet key={block.id}>
          <FieldLegend>{block.properties.title}</FieldLegend>
        </FieldSet>
      );

    case "TextInput":
      return (
        <Field key={block.id}>
          <FieldLabel htmlFor={block.properties.id}>
            {block.properties.question}
          </FieldLabel>
          <Input
            id={block.properties.id}
            name={block.properties.id}
            placeholder={block.properties.default || ""}
            defaultValue={block.properties.default || ""}
          />
        </Field>
      );

    case "Textarea":
      return (
        <Field key={block.id}>
          <FieldLabel htmlFor={block.properties.id}>
            {block.properties.question}
          </FieldLabel>
          <Textarea
            id={block.properties.id}
            name={block.properties.id}
            placeholder={block.properties.default || ""}
            defaultValue={block.properties.default || ""}
            className="resize-none"
          />
        </Field>
      );

    case "Checkbox":
      return (
        <Field key={block.id}>
          <FieldLabel>{block.properties.question}</FieldLabel>
          <FieldGroup>
            {block.properties.options.map((option) => (
              <Field key={option.id} orientation="horizontal">
                <Checkbox
                  id={option.id}
                  name={block.properties.id}
                  value={option.id}
                  defaultChecked={option.checked}
                />
                <FieldLabel
                  htmlFor={option.id}
                  className="font-normal cursor-pointer"
                >
                  {option.text}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </Field>
      );

    case "Radio":
      return (
        <Field key={block.id}>
          <FieldLabel>{block.properties.question}</FieldLabel>
          <FieldGroup>
            {block.properties.options.map((option, index) => {
              const optionId = `${block.id}-${index}`;
              return (
                <Field key={optionId} orientation="horizontal">
                  <input
                    type="radio"
                    id={optionId}
                    name={block.properties.id}
                    value={option}
                    className="h-4 w-4 border-input text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <FieldLabel
                    htmlFor={optionId}
                    className="font-normal cursor-pointer"
                  >
                    {option}
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </Field>
      );

    case "Submit":
      return (
        <Field key={block.id} orientation="horizontal">
          <Button type="submit">{block.properties.label || "Submit"}</Button>
        </Field>
      );

    default:
      return null;
  }
}

export function FormView({ survey }: { survey: FormSpec | undefined }) {
  if (!survey) {
    return <div>No survey found</div>;
  }

  return (
    <div className="w-full md:max-w-md">
      <form>
        <FieldGroup>
          {survey.blocks.map((block) => renderBlock(block))}
        </FieldGroup>
      </form>
    </div>
  );
}
