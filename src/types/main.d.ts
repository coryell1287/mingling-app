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

interface AppTheme {
  mode: string | null;
}

type Theme = 'light-mode' | 'dark-mode';
