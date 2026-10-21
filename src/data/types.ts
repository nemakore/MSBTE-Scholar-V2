export type SchemeType = 'K Scheme' | 'I Scheme' | 'G Scheme';

export type BranchCode = 'CO' | 'IT' | 'CE' | 'ME' | 'EE' | 'EJ' | 'AIML';

export interface Branch {
  code: BranchCode;
  name: string;
  icon: string;
}

export type SemesterNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface Subject {
  id: string;
  code: string;
  name: string;
  shortName: string;
  branch: BranchCode;
  scheme: SchemeType;
  semester: SemesterNumber;
  credits: number;
  iconName: string;
  description: string;
}

export type ResourceCategory =
  | 'Syllabus'
  | 'Reference Books'
  | 'Notes'
  | 'Solved Manuals'
  | 'Previous Question Papers'
  | 'Important Questions'
  | 'Model Answers';

export interface StudyResource {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  category: ResourceCategory;
  fileSize: string;
  pageCount: number;
  downloadCount: number;
  year?: string;
  isVerified: boolean;
  isPremium?: boolean;
  fileUrl: string;
  previewUrl?: string;
  author?: string;
  uploadDate: string;
}

export interface MockQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation?: string;
  topic: string;
}

export interface MockTest {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  questionCount: number;
  durationMinutes: number;
  totalMarks: number;
  topic: string;
  questions: MockQuestion[];
}

export type JobType = 'Private' | 'Government' | 'Apprenticeship' | 'Internship' | 'Fresher' | 'Remote';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  category: JobType;
  location: string;
  eligibleBranches: BranchCode[];
  qualification: string;
  experience: string;
  salary: string;
  deadline: string;
  isVerified: boolean;
  isFeatured?: boolean;
  postedDate: string;
  sourceUrl: string;
  description: string;
  requirements: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  branch: BranchCode;
  techStack: string[];
  semester: SemesterNumber;
  price: number; // 0 for free
  isPaid: boolean;
  rating: number;
  downloads: number;
  thumbnail: string;
  features: string[];
  deliverables: {
    hasSourceCode: boolean;
    hasReportDoc: boolean;
    hasPpt: boolean;
    hasVivaQuestions: boolean;
    hasDemoVideo: boolean;
  };
}

export type DiplomaYear = 1 | 2 | 3;

export interface AttachedDocument {
  name: string;
  url: string;
  type: 'pdf' | 'notes' | 'manual' | 'doc';
  size?: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  avatar: string;
  content: string;
  timeAgo: string;
  authorBranch?: string;
  authorYear?: DiplomaYear;
  attachedFile?: AttachedDocument;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorBranch: string;
  authorSemester: string;
  authorYear?: DiplomaYear;
  authorAvatar: string;
  timeAgo: string;
  group: string;
  targetBranch?: BranchCode | 'ALL';
  targetYear?: DiplomaYear | 0;
  content: string;
  attachedFile?: AttachedDocument;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tags: string[];
  comments?: CommunityComment[];
}

export interface MSBTEUpdate {
  id: string;
  title: string;
  category: 'Exam Notification' | 'Timetable' | 'Hall Ticket' | 'Results' | 'Revaluation' | 'Academic Notice' | 'Scholarship' | 'Hackathon';
  date: string;
  isVerified: boolean;
  type: 'Official Verified' | 'Opportunity';
  sourceUrl: string;
  details: string;
  urgency: 'high' | 'medium' | 'normal';
}

export interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  enrolledStudents: number;
  duration: string;
  price: number;
  thumbnail: string;
  category: string;
  level: string;
  lessonsCount: number;
  description: string;
  isEnrolled?: boolean;
  progressPercent?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: 'job' | 'update' | 'community' | 'course' | 'system';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  branch: BranchCode;
  scheme: SchemeType;
  semester: SemesterNumber;
  year?: DiplomaYear;
  college: string;
  enrollmentNumber?: string;
  savedResources: string[];
  savedJobs: string[];
  savedProjects: string[];
  enrolledCourses: string[];
  isPremium: boolean;
  theme: 'light' | 'dark';
}
