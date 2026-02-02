export interface QuestionBank {
  questionTypeId: number | null;
  courseId: number | null;
  question: string | null;
  lessonId: number | null;
  id: number;
  voided: 0 | 1;
  course: {
    title: string | null;
    slug: string | null;
    description: string | null;
    published: boolean | null;
    created_at: string | null;
    updated_at: string | null;
  };
  lesson: {
    lessonName: string | null;
    lessonVideo: string | null;
    lessonDuration: number | null;
    lessonOrder: string | null;
    lessonDescription: string | null;
  };
  questionType: {
    id: number;
    name: string | null;
    description: string | null;
  };
  _count: {
    questionChoices: number;
  };
}
