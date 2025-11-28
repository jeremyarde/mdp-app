export interface FormSpec {
  id: string;
  title: string;
  plaintext: string;
  questions: unknown[]; // you gave me nothing to work with here
  blocks: FormBlock[];
  parse_version: string;
  validation: [boolean, unknown[]];
}

export type FormBlock =
  | TitleBlock
  | TextInputBlock
  | TextareaBlock
  | CheckboxBlock
  | RadioBlock
  | SubmitBlock;

export interface BaseBlock {
  id: string;
  index: number;
  block_type: string;
}

export interface TitleBlock extends BaseBlock {
  block_type: "Title";
  properties: {
    type: "Title";
    title: string;
  };
}

export interface TextInputBlock extends BaseBlock {
  block_type: "TextInput";
  properties: {
    type: "TextInput";
    id: string;
    question: string;
    default: string;
  };
}

export interface TextareaBlock extends BaseBlock {
  block_type: "Textarea";
  properties: {
    type: "Textarea";
    id: string;
    question: string;
    default: string;
  };
}

export interface CheckboxOption {
  checked: boolean;
  text: string;
  id: string;
}

export interface CheckboxBlock extends BaseBlock {
  block_type: "Checkbox";
  properties: {
    type: "Checkbox";
    id: string;
    question: string;
    options: CheckboxOption[];
  };
}

export interface RadioBlock extends BaseBlock {
  block_type: "Radio";
  properties: {
    type: "Radio";
    id: string;
    question: string;
    options: string[];
  };
}

export interface SubmitBlock extends BaseBlock {
  block_type: "Submit";
  properties: {
    type: "Submit";
    label?: string;
  };
}
