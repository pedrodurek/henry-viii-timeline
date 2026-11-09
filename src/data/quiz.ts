import type { QuizQuestion } from './types';

export const QUIZ: QuizQuestion[] = [
  {
    q: 'Which wife outlived all the others?',
    a: 'cleves',
    type: 'wife',
    why: 'Anne of Cleves died in 1557, nine years after Catherine Parr. She is the only wife buried in Westminster Abbey.',
  },
  {
    q: "Which wife had first been married to Henry's brother?",
    a: 'aragon',
    type: 'wife',
    why: 'Catherine of Aragon married Prince Arthur in 1501. He died five months later.',
  },
  {
    q: 'Which wife gave Henry the son he wanted?',
    a: 'seymour',
    type: 'wife',
    why: 'Jane Seymour gave birth to Edward in October 1537 and died twelve days later.',
  },
  {
    q: "Which wife was Anne Boleyn's first cousin?",
    a: 'howard',
    type: 'wife',
    why: "Anne Boleyn's mother, Elizabeth Howard, was the sister of Catherine Howard's father. Both cousins ended on the block.",
  },
  {
    q: 'Who was the first English queen to publish a book under her own name?',
    a: 'parr',
    type: 'wife',
    why: 'Catherine Parr published Prayers or Meditations in 1545.',
  },
  {
    q: 'How old was Henry when he became king?',
    a: '17',
    type: 'text',
    options: ['15', '17', '21', '25'],
    why: 'He took the throne in April 1509, two months short of his 18th birthday.',
  },
  {
    q: 'How long did the marriage to Anne of Cleves last?',
    a: '6 months',
    type: 'text',
    options: ['11 days', '6 months', '2 years', '5 years'],
    why: 'Married on 6 January 1540, annulled on 9 July 1540.',
  },
];
