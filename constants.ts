import { ProjectSection, RubricCriteria } from './types';
import { BookOpen, Compass, Lightbulb, GraduationCap, PenTool, Layout } from 'lucide-react';

export const PROJECT_TITLE = "The Teacher's Survival Guide";
export const PROJECT_DESCRIPTION = "A comprehensive manual for future English teachers, compiling essential strategies, activities, and pedagogical wisdom for their first year of teaching.";

export const PROJECT_GUIDELINES: ProjectSection[] = [
  {
    id: 'intro',
    title: '1. Introduction & Philosophy',
    description: 'Define who you are as a teacher.',
    requirements: [
      'Personal teaching philosophy statement.',
      'Your goals for your first year.',
      'A thesis statement outlining the purpose of your manual.'
    ],
    icon: 'BookOpen'
  },
  {
    id: 'first-day',
    title: '2. First Day Survival Kit',
    description: 'Concrete plans for the most critical day of the year.',
    requirements: [
      'Detailed First Day Lesson Plan.',
      'Icebreaker activities suitable for different ages.',
      'Checklist of materials needed.',
      'Scripts for introducing yourself and class rules.'
    ],
    icon: 'Compass'
  },
  {
    id: 'management',
    title: '3. Classroom Management',
    description: 'Strategies to maintain a positive learning environment.',
    requirements: [
      'List of clear, enforceable classroom rules.',
      'Rewards and consequences systems.',
      'Tips for handling disruptive behavior.',
      'Seating chart recommendations.'
    ],
    icon: 'Layout'
  },
  {
    id: 'activities',
    title: '4. The Activity Bank',
    description: 'Go-to activities for any situation.',
    requirements: [
      '5 Warm-up activities (no prep needed).',
      '5 Filler activities (5-10 minutes).',
      '3 Project-based learning ideas.',
      'Differentiation strategies for mixed-ability classes.'
    ],
    icon: 'Lightbulb'
  },
  {
    id: 'development',
    title: '5. Professional Growth',
    description: 'How to stay sane and keep improving.',
    requirements: [
      'List of useful websites and digital tools.',
      'Self-care tips for teachers.',
      'Templates for reflection journals.',
      'Concluding thoughts summarizing the manual.'
    ],
    icon: 'GraduationCap'
  }
];

export const EVALUATION_RUBRIC: RubricCriteria[] = [
  {
    category: 'Structure & Grammar',
    description: 'Use of advanced grammatical structures and paragraph formation.',
    excellent: 'Masterful use of grammatical inversion (e.g., "Rarely have I seen..."). Paragraphs contain a clear topic sentence, thesis, supporting details, and a strong concluding sentence. Transitions are seamless.',
    good: 'Uses inversion correctly but sparingly. Paragraphs generally follow the Topic-Support-Conclusion structure. Thesis is present but could be sharper.',
    needsImprovement: 'Lacks examples of inversion or uses them incorrectly. Paragraphs lack topic sentences or clear organization. Thesis is missing or weak.',
    scoreWeight: 30
  },
  {
    category: 'Organization',
    description: 'Logical flow and visual presentation of the manual.',
    excellent: 'The manual is highly organized with a logical progression. Sections are distinct yet cohesive. Visual layout aids readability.',
    good: 'Good organization, though some transitions between sections may be abrupt. Layout is functional but not engaging.',
    needsImprovement: 'Disorganized; difficult to follow. Sections appear random. No clear visual structure.',
    scoreWeight: 20
  },
  {
    category: 'Vocabulary',
    description: 'Range and accuracy of lexical choices.',
    excellent: 'Demonstrates a wide range of precise, academic, and pedagogical vocabulary. Tone is professional and authoritative.',
    good: 'Vocabulary is adequate and mostly accurate. Some repetition of common terms. Tone is generally appropriate.',
    needsImprovement: 'Limited vocabulary range. Frequent misuse of terms. Tone is too informal or inconsistent.',
    scoreWeight: 20
  },
  {
    category: 'Content & Practicality',
    description: 'Quality, relevance, and depth of the tips and activities.',
    excellent: 'Content is highly relevant, creative, and immediately useful. Demonstrates deep understanding of teaching methodology.',
    good: 'Content is useful but standard. Some ideas may lack depth or originality.',
    needsImprovement: 'Content is superficial, irrelevant, or impractical for a real classroom.',
    scoreWeight: 30
  }
];

export const SYSTEM_INSTRUCTION = `
You are an expert Teacher Trainer and Editor assisting student teachers with their final project, "The Teacher's Survival Guide".
Your role is to help them brainstorm ideas and, crucially, to check their writing against specific rubric criteria.

The Rubric requires:
1. **Structure:** They MUST use **Grammatical Inversion** (e.g., "Never in my life...", "Little did they know...", "Should you need help..."). They must also have clear **Topic Sentences**, **Thesis Statements**, **General Statements**, **Supporting Sentences**, and **Concluding Sentences**.
2. **Content:** Practical tips for English teaching (First day, classroom management, activities).

When asked to analyze text:
- Point out if Inversion is missing.
- Check if the Topic Sentence is clear.
- Suggest improvements for vocabulary to make it more "academic".
- Be encouraging but rigorous.
`;