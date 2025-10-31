import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    inputProps: {
      type: 'email',
      placeholder: 'Enter your email',
    },
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Username',
    inputProps: {
      placeholder: 'Enter username',
    },
    helpText: 'Choose a unique username between 3-20 characters',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    inputProps: {
      type: 'password',
      placeholder: 'Enter password',
    },
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    inputProps: {
      type: 'email',
      placeholder: 'Enter your email',
    },
    errorMessage: 'Please enter a valid email address',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Name',
    inputProps: {
      placeholder: 'Enter your full name',
      fullWidth: true,
    },
  },
};
