declare module '*.ico?inline' {
  const content: string;
  export default content;
}

declare module '*.icon' {
  const content: string;
  export default content;
}

interface FormInput {
  name: string;
  email: string;
  textarea: string;
}
