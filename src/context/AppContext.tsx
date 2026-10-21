'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  StudentProfile,
  BranchCode,
  SchemeType,
  SemesterNumber,
  DiplomaYear,
  StudyResource,
  ResourceCategory,
  MockTest,
  JobListing,
  ProjectItem,
  CommunityPost,
  CommunityComment,
  AttachedDocument,
  MSBTEUpdate,
  CourseItem,
  NotificationItem,
} from '../data/types';
import {
  INITIAL_STUDENT_PROFILE,
  SUBJECTS,
  STUDY_RESOURCES,
  MOCK_TESTS,
  JOB_LISTINGS,
  PROJECTS,
  COMMUNITY_POSTS,
  MSBTE_UPDATES,
  COURSES,
  NOTIFICATIONS,
} from '../data/mockData';

export type ViewportMode = 'auto' | 'mobile' | 'desktop';

export type MobileScreen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'profile-setup'
  | 'home'
  | 'study'
  | 'mock-tests'
  | 'jobs'
  | 'projects'
  | 'community'
  | 'courses'
  | 'updates'
  | 'notifications'
  | 'profile'
  | 'search';

export type DesktopTab =
  | 'landing'
  | 'dashboard'
  | 'study'
  | 'mock-tests'
  | 'jobs'
  | 'projects'
  | 'community'
  | 'updates'
  | 'career'
  | 'courses'
  | 'notifications'
  | 'profile'
  | 'admin';

interface AppContextType {
  // Device & Layout Modes
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  isStandalone: boolean;
  isOnline: boolean;
  canInstall: boolean;
  promptInstall: () => Promise<void>;
  showInstallGuideModal: boolean;
  setShowInstallGuideModal: (show: boolean) => void;
  previewToolbarVisible: boolean;
  setPreviewToolbarVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;

  // Mobile navigation & History
  mobileScreen: MobileScreen;
  setMobileScreen: (screen: MobileScreen) => void;
  navigateBackMobile: () => void;
  canGoBackMobile: boolean;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;

  // Desktop navigation
  desktopTab: DesktopTab;
  setDesktopTab: (tab: DesktopTab) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;

  // Authentication & Session
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void;

  // Student Profile & Academic State (Synchronized)
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  setBranch: (branch: BranchCode) => void;
  setScheme: (scheme: SchemeType) => void;
  setSemester: (semester: SemesterNumber) => void;

  // Data Collections & Interactive State
  studyResources: StudyResource[];
  mockTests: MockTest[];
  jobListings: JobListing[];
  projects: ProjectItem[];
  communityPosts: CommunityPost[];
  msbteUpdates: MSBTEUpdate[];
  courses: CourseItem[];
  notifications: NotificationItem[];

  // Actions
  toggleSaveResource: (id: string) => void;
  toggleSaveJob: (id: string) => void;
  toggleSaveProject: (id: string) => void;
  toggleLikePost: (id: string) => void;
  addCommunityPost: (newPost: {
    content: string;
    group?: string;
    targetBranch?: BranchCode | 'ALL';
    targetYear?: DiplomaYear | 0;
    tags?: string[];
    attachedFile?: AttachedDocument;
  }) => void;
  addPostComment: (postId: string, text: string, attachedFile?: AttachedDocument) => void;
  markAllNotificationsRead: () => void;
  enrollInCourse: (courseId: string) => void;

  addStudyResource: (resource: StudyResource) => void;

  // Active Modals / Interactive sheets
  activeModal: {
    type: 'none' | 'quiz' | 'pdf-preview' | 'checkout' | 'job-apply' | 'project-details' | 'create-resource';
    data?: any;
  };
  openModal: (type: 'quiz' | 'pdf-preview' | 'checkout' | 'job-apply' | 'project-details' | 'create-resource', data?: any) => void;
  closeModal: () => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'msbte_student_profile_v2',
  THEME: 'msbte_dark_mode_v2',
  AUTH: 'msbte_auth_session_v2',
  COMMUNITY: 'msbte_community_posts_v2',
  COURSES: 'msbte_courses_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Device & layout modes
  const [viewportMode, setViewportMode] = useState<ViewportMode>('auto');
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [showInstallGuideModal, setShowInstallGuideModal] = useState<boolean>(false);
  const [previewToolbarVisible, setPreviewToolbarVisible] = useState<boolean>(false);

  // Mobile navigation & stack
  const [mobileScreen, setMobileScreenState] = useState<MobileScreen>('home');
  const [mobileHistory, setMobileHistory] = useState<MobileScreen[]>(['home']);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  // Desktop navigation
  const [desktopTab, setDesktopTab] = useState<DesktopTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Profile & Theme
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Data states
  const [studyResources, setStudyResources] = useState<StudyResource[]>(STUDY_RESOURCES);
  const [mockTests, setMockTests] = useState<MockTest[]>(MOCK_TESTS);
  const [jobListings, setJobListings] = useState<JobListing[]>(JOB_LISTINGS);
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [msbteUpdates, setMsbteUpdates] = useState<MSBTEUpdate[]>(MSBTE_UPDATES);
  const [courses, setCourses] = useState<CourseItem[]>(COURSES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Modal State
  const [activeModal, setActiveModal] = useState<{
    type: 'none' | 'quiz' | 'pdf-preview' | 'checkout' | 'job-apply' | 'project-details' | 'create-resource';
    data?: any;
  }>({ type: 'none' });

  // 1. Initialize from localStorage and set up listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect Online/Offline
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Detect Standalone PWA mode
    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Load persisted state from localStorage
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme !== null) {
        setDarkMode(savedTheme === 'true');
      }
      const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (savedAuth !== null) {
        setIsAuthenticated(savedAuth === 'true');
      }
      const savedCommunity = localStorage.getItem(STORAGE_KEYS.COMMUNITY);
      if (savedCommunity) {
        setCommunityPosts(JSON.parse(savedCommunity));
      }
      const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      }

      const savedCustom = localStorage.getItem('msbte_custom_resources');
      if (savedCustom) {
        try {
          const parsed = JSON.parse(savedCustom);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStudyResources((prev) => {
              const ids = new Set(prev.map((r) => r.id));
              const novel = parsed.filter((r: any) => !ids.has(r.id));
              return [...novel, ...prev];
            });
          }
        } catch (e) {}
      }

      // Check if preview mode was requested via query param
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('preview') === 'true' || urlParams.get('dev') === '1') {
        setPreviewToolbarVisible(true);
      }

      // Hash navigation support (e.g., #study, #jobs, #mock-tests, #projects)
      const handleHashRoute = () => {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        if (hash) {
          const validTabs: DesktopTab[] = [
            'dashboard', 'study', 'mock-tests', 'jobs', 'projects',
            'community', 'updates', 'career', 'courses', 'notifications',
            'profile', 'admin', 'landing'
          ];
          if (validTabs.includes(hash as DesktopTab)) {
            setDesktopTab(hash as DesktopTab);
          }
          const validMobile: MobileScreen[] = [
            'home', 'study', 'mock-tests', 'jobs', 'projects',
            'community', 'courses', 'updates', 'notifications', 'profile', 'search'
          ];
          if (validMobile.includes(hash as MobileScreen)) {
            setMobileScreenState(hash as MobileScreen);
          }
        }
      };
      handleHashRoute();
      window.addEventListener('hashchange', handleHashRoute);

      // Live Blogger CMS Feed Synchronization (Circulars & Study Materials)
      try {
        const feedUrl = '/feeds/posts/default?alt=json&max-results=50';
        fetch(feedUrl)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.feed?.entry?.length) {
              const liveUpdates: MSBTEUpdate[] = [];
              const liveResources: StudyResource[] = [];

              data.feed.entry.forEach((entry: any, idx: number) => {
                const title = entry.title?.$t || 'MSBTE Circular';
                const link = entry.link?.find((l: any) => l.rel === 'alternate')?.href || '#';
                const date = entry.published?.$t
                  ? new Date(entry.published.$t).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Recent';
                const labels: string[] = (entry.category || []).map((c: any) => c.term || '');
                const labelText = labels.join(' ').toLowerCase();
                const summary = entry.summary?.$t || entry.content?.$t || '';
                const cleanSnippet = summary.replace(/<[^>]*>/g, '').slice(0, 140);

                liveUpdates.push({
                  id: `blogger-post-${idx}`,
                  title,
                  date,
                  category: (['Exam Notification', 'Timetable', 'Hall Ticket', 'Results', 'Revaluation', 'Academic Notice', 'Scholarship', 'Hackathon'].includes(labels[0]) ? labels[0] : 'Academic Notice') as any,
                  isVerified: true,
                  type: 'Official Verified',
                  sourceUrl: link,
                  details: cleanSnippet,
                  urgency: idx === 0 ? 'high' : 'normal',
                });

                // Auto-detect Study Material from Blogger Post labels
                const isStudy =
                  labels.some((l) =>
                    [
                      'Notes',
                      'Solved Manuals',
                      'Previous Question Papers',
                      'Model Answers',
                      'Important Questions',
                      'Syllabus',
                    ].includes(l)
                  ) ||
                  labelText.includes('notes') ||
                  labelText.includes('manual') ||
                  labelText.includes('syllabus') ||
                  labelText.includes('question paper');

                if (isStudy) {
                  let matchedCategory: ResourceCategory = 'Notes';
                  if (labels.includes('Solved Manuals') || labelText.includes('manual')) {
                    matchedCategory = 'Solved Manuals';
                  } else if (labels.includes('Model Answers') || labelText.includes('model answer')) {
                    matchedCategory = 'Model Answers';
                  } else if (
                    labels.includes('Previous Question Papers') ||
                    labelText.includes('question paper') ||
                    labelText.includes('pyq')
                  ) {
                    matchedCategory = 'Previous Question Papers';
                  } else if (labels.includes('Important Questions') || labelText.includes('important')) {
                    matchedCategory = 'Important Questions';
                  } else if (labels.includes('Syllabus') || labelText.includes('syllabus')) {
                    matchedCategory = 'Syllabus';
                  }

                  const matchedSubject = SUBJECTS.find(
                    (s) =>
                      labels.includes(s.code) ||
                      labels.includes(s.shortName) ||
                      title.includes(s.code) ||
                      title.toLowerCase().includes(s.shortName.toLowerCase())
                  );

                  liveResources.push({
                    id: `blogger-res-${idx}`,
                    subjectId: matchedSubject ? matchedSubject.id : 'sub-co401',
                    subjectName: matchedSubject
                      ? `${matchedSubject.shortName} (${matchedSubject.code})`
                      : 'MSBTE Course',
                    title,
                    category: matchedCategory,
                    fileSize: '3.8 MB',
                    pageCount: 32,
                    downloadCount: 1450 + idx * 75,
                    isVerified: true,
                    fileUrl: link,
                    previewUrl: link,
                    author: entry.author?.[0]?.name?.$t || 'MSBTE Faculty',
                    uploadDate: date,
                  });
                }
              });

              if (liveUpdates.length > 0) {
                setMsbteUpdates(liveUpdates);
              }
              if (liveResources.length > 0) {
                setStudyResources((prev) => {
                  const existingIds = new Set(prev.map((r) => r.id));
                  const novel = liveResources.filter((r) => !existingIds.has(r.id));
                  return [...novel, ...prev];
                });
              }
            }
          })
          .catch(() => {});
      } catch (e) {}
    } catch (err) {
      console.warn('LocalStorage load error:', err);
    }

    // Keyboard shortcut to toggle preview toolbar (Ctrl + Shift + D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setPreviewToolbarVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync profile changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      } catch (e) {}
    }
  }, [profile]);

  // Sync theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, String(darkMode));
      } catch (e) {}
    }
  }, [darkMode]);

  // Sync community posts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(communityPosts));
      } catch (e) {}
    }
  }, [communityPosts]);

  // Sync courses
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      } catch (e) {}
    }
  }, [courses]);

  // PWA Install Action
  const promptInstall = useCallback(async () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choiceResult = await installPromptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstallPromptEvent(null);
      }
    } else {
      setShowInstallGuideModal(true);
    }
  }, [installPromptEvent]);

  // Mobile Navigation with Back History
  const setMobileScreen = (screen: MobileScreen) => {
    setMobileHistory((prev) => [...prev, screen]);
    setMobileScreenState(screen);
  };

  const navigateBackMobile = () => {
    setMobileHistory((prev) => {
      if (prev.length <= 1) {
        setMobileScreenState('home');
        return ['home'];
      }
      const newHistory = prev.slice(0, -1);
      const previousScreen = newHistory[newHistory.length - 1];
      setMobileScreenState(previousScreen);
      return newHistory;
    });
  };

  const canGoBackMobile = mobileScreen !== 'home' && mobileScreen !== 'splash';

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const setBranch = (branch: BranchCode) => {
    setProfile((prev) => ({ ...prev, branch }));
  };

  const setScheme = (scheme: SchemeType) => {
    setProfile((prev) => ({ ...prev, scheme }));
  };

  const setSemester = (semester: SemesterNumber) => {
    setProfile((prev) => ({ ...prev, semester }));
  };

  // Auth actions
  const login = (email: string) => {
    setIsAuthenticated(true);
    updateProfile({ email });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'false');
    }
    setMobileScreenState('login');
    setDesktopTab('landing');
  };

  const register = (name: string, email: string) => {
    setIsAuthenticated(true);
    updateProfile({ name, email });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    }
  };

  const toggleSaveResource = (id: string) => {
    setProfile((prev) => {
      const exists = prev.savedResources.includes(id);
      return {
        ...prev,
        savedResources: exists
          ? prev.savedResources.filter((item) => item !== id)
          : [...prev.savedResources, id],
      };
    });
  };

  const toggleSaveJob = (id: string) => {
    setProfile((prev) => {
      const exists = prev.savedJobs.includes(id);
      return {
        ...prev,
        savedJobs: exists
          ? prev.savedJobs.filter((item) => item !== id)
          : [...prev.savedJobs, id],
      };
    });
  };

  const toggleSaveProject = (id: string) => {
    setProfile((prev) => {
      const exists = prev.savedProjects.includes(id);
      return {
        ...prev,
        savedProjects: exists
          ? prev.savedProjects.filter((item) => item !== id)
          : [...prev.savedProjects, id],
      };
    });
  };

  const toggleLikePost = (id: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const addCommunityPost = (newPost: {
    content: string;
    group?: string;
    targetBranch?: BranchCode | 'ALL';
    targetYear?: DiplomaYear | 0;
    tags?: string[];
    attachedFile?: AttachedDocument;
  }) => {
    const userYear = profile.year || (Math.ceil(profile.semester / 2) as DiplomaYear);
    const postGroup = newPost.group || `${userYear === 1 ? 'FY' : userYear === 2 ? 'SY' : 'TY'} ${profile.branch}`;
    const created: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: profile.name,
      authorBranch: profile.branch,
      authorSemester: `${profile.semester}th Sem (${profile.scheme})`,
      authorYear: userYear,
      authorAvatar: profile.avatar,
      timeAgo: 'Just now',
      group: postGroup,
      targetBranch: newPost.targetBranch || profile.branch,
      targetYear: newPost.targetYear !== undefined ? newPost.targetYear : userYear,
      content: newPost.content,
      attachedFile: newPost.attachedFile,
      likes: 1,
      commentsCount: 0,
      isLiked: true,
      tags: newPost.tags && newPost.tags.length > 0 ? newPost.tags : ['#MSBTECommunity', `#${profile.branch}`, `#Year${userYear}`],
      comments: [],
    };
    setCommunityPosts((prev) => {
      const updated = [created, ...prev];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });
  };

  const addPostComment = (postId: string, text: string, attachedFile?: AttachedDocument) => {
    setCommunityPosts((prev) => {
      const updated = prev.map((post) => {
        if (post.id === postId) {
          const userYear = profile.year || (Math.ceil(profile.semester / 2) as DiplomaYear);
          const newComments: CommunityComment[] = [
            ...(post.comments || []),
            {
              id: `c-${Date.now()}`,
              authorName: profile.name,
              authorBranch: profile.branch,
              authorYear: userYear,
              avatar: profile.avatar,
              content: text,
              timeAgo: 'Just now',
              attachedFile,
            },
          ];
          return {
            ...post,
            commentsCount: newComments.length,
            comments: newComments,
          };
        }
        return post;
      });
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEYS.COMMUNITY, JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const enrollInCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, isEnrolled: true, progressPercent: 0 } : c))
    );
    setProfile((prev) => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId],
    }));
  };

  const addStudyResource = (newRes: StudyResource) => {
    setStudyResources((prev) => [newRes, ...prev]);
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('msbte_custom_resources');
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem('msbte_custom_resources', JSON.stringify([newRes, ...list]));
      } catch (e) {}
    }
  };

  const openModal = (
    type: 'quiz' | 'pdf-preview' | 'checkout' | 'job-apply' | 'project-details' | 'create-resource',
    data?: any
  ) => {
    setActiveModal({ type, data });
  };

  const closeModal = () => {
    setActiveModal({ type: 'none' });
  };

  return (
    <AppContext.Provider
      value={{
        viewportMode,
        setViewportMode,
        isStandalone,
        isOnline,
        canInstall: !!installPromptEvent,
        promptInstall,
        showInstallGuideModal,
        setShowInstallGuideModal,
        previewToolbarVisible,
        setPreviewToolbarVisible,
        mobileScreen,
        setMobileScreen,
        navigateBackMobile,
        canGoBackMobile,
        onboardingStep,
        setOnboardingStep,
        desktopTab,
        setDesktopTab,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isAuthenticated,
        login,
        logout,
        register,
        profile,
        updateProfile,
        setBranch,
        setScheme,
        setSemester,
        studyResources,
        mockTests,
        jobListings,
        projects,
        communityPosts,
        msbteUpdates,
        courses,
        notifications,
        toggleSaveResource,
        toggleSaveJob,
        toggleSaveProject,
        toggleLikePost,
        addCommunityPost,
        addPostComment,
        markAllNotificationsRead,
        enrollInCourse,
        addStudyResource,
        activeModal,
        openModal,
        closeModal,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
