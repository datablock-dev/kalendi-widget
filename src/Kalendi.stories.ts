import { KalendiContainer } from './KalendiContainer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Kalendi-Container',
  component: KalendiContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { 
    backendRoute: "http://localhost:6969"
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light = {
  args: {
    primary: true,
    theme: 'light',
  },
}