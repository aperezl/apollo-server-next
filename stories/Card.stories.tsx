import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card'

export default {
  title: 'Unuko/Card',
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}/>

export const Card1 = Template.bind({})