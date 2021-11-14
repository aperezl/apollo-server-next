import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Test } from './Test'

export default {
  title: 'Unuko/Test',
  component: Test,
  argTypes: {}
} as ComponentMeta<typeof Test>

const Template: ComponentStory<typeof Test> = (args) => <Test/>

export const Test1 = Template.bind({})