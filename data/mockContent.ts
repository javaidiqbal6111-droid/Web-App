
import { AgeGroup, Profile, DailyContent } from '../types';

export const MOCK_PROFILES: Profile[] = [
  { id: '1', name: 'Leo', ageGroup: AgeGroup.Toddler, avatar: 'https://picsum.photos/seed/leo/200', color: '#FBBF24' },
  { id: '2', name: 'Maya', ageGroup: AgeGroup.Kid, avatar: 'https://picsum.photos/seed/maya/200', color: '#10B981' },
  { id: '3', name: 'Sam', ageGroup: AgeGroup.Teen, avatar: 'https://picsum.photos/seed/sam/200', color: '#8B5CF6' },
  { id: '4', name: 'Dad', ageGroup: AgeGroup.Parent, avatar: 'https://picsum.photos/seed/dad/200', color: '#3B82F6' },
];

export const DAILY_CONTENT: DailyContent[] = [
  {
    id: 'c1',
    type: 'prompt',
    title: 'Morning Sunshine',
    description: 'Let\'s start the day with a big stretch! Can you reach the sky?',
    emoji: '☀️',
    accentColor: '#FBBF24',
    ageGroups: [AgeGroup.Toddler],
  },
  {
    id: 'c2',
    type: 'question',
    title: 'Superpower Talk',
    description: 'If you could have any superpower to help your family, what would it be?',
    emoji: '🦸',
    accentColor: '#10B981',
    ageGroups: [AgeGroup.Kid, AgeGroup.Teen],
  },
  {
    id: 'c3',
    type: 'activity',
    title: 'Nature Hunt',
    description: 'Find something in the yard that is shaped like a triangle.',
    emoji: '🌿',
    accentColor: '#10B981',
    ageGroups: [AgeGroup.Kid, AgeGroup.Toddler],
  },
  {
    id: 'c4',
    type: 'prompt',
    title: 'Future Goals',
    description: 'What is one thing you want to accomplish by the end of this month?',
    emoji: '🎯',
    accentColor: '#8B5CF6',
    ageGroups: [AgeGroup.Teen],
  },
  {
    id: 'c5',
    type: 'question',
    title: 'Gratitude Reflection',
    description: 'What\'s one small win from today that you\'re proud of?',
    emoji: '🙏',
    accentColor: '#3B82F6',
    ageGroups: [AgeGroup.Parent],
  },
  {
    id: 'c6',
    type: 'activity',
    title: 'Family Connection',
    description: 'Schedule a 5-minute dedicated check-in with each child tonight.',
    emoji: '🤝',
    accentColor: '#3B82F6',
    ageGroups: [AgeGroup.Parent],
  }
];
