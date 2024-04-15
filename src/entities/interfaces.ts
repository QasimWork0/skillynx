import { ReactNode } from "react";

export interface RoutesInterface {
  title: string;
  link: string;
  icon: ReactNode;
  iconDark: ReactNode;
  iconMobile: ReactNode;
  iconActiveMobile: ReactNode;
  component: ReactNode;
  children?: RoutesInterface[];
}

export interface ResponseInterface<T> {
  status: number;
  content: T;
  message: string;
}

export interface AlertInterface {
  color: "success" | "error";
  message: string;
}

/***  Models  ***/
export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface UserInfoInterface extends UserInterface {
  token: string;
  access_count: number;
}

export interface SkillCourseInterface {
  id: number;
  title: string;
  thumbnail: string;
  ordering: number;
  status: number;
  state: number;
}

export interface ChapterInterface {
  id: number;
  title: string;
  prompt: string;
  course_id: number;
  ordering: number;
  status: number;
  isBookmarked?: boolean;
}

export interface LibraryCourseInterface extends SkillCourseInterface {
  description: string;
  subtitle: string;
  image: string;
  ratings: 5;
  ratingsCount: 100;
  chapters: string[];
}

export interface SkillboxCourseInterface extends SkillCourseInterface {
  chapters: ChapterInterface[];
}

export interface HeaderTitleType {
  label: string;
  image: string;
}

export interface NotficationSettingInterface {
  notification1: 0 | 1 | 2 | 3;
  notification2: 0 | 1;
  notification3: 0 | 1;
}

export interface ChangePasswordInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FeedbackInterface {
  feedback: string;
  time: string;
  direction: string;
}

export interface ParagraphInterface {
  content: string
  id: number
  outputs: string
  prompt: string
  prompt_type: string
  section_id: number
  settings: string
  status: string
  title: string
  type: 'start'|'io'|'next'|'exit'
  time?: string;
}

/*** --- ***/

/***  Pages Props  ***/
export interface SkillsPropType {
  courses: SkillCourseInterface[];
  deleteUserCourse: (courseId: number) => Promise<number>;
  nodesData: ParagraphInterface[];
  handleCourseChange: (courseId: string) => void;
}

export interface LibraryPropType {
  courses: LibraryCourseInterface[];
}

export interface SkillboxPropType {
  courses: SkillboxCourseInterface[];
  addUserCourse: (courseId: number) => Promise<number>;
  deleteUserCourse: (courseId: number) => Promise<number>;
}

export interface LoginPropType {
  loginUser: (
    email: string,
    password: string
  ) => Promise<ResponseInterface<UserInfoInterface>>;
}

export interface BookingCardPropType {
  bookCourse: (courseId: number) => Promise<ResponseInterface<null>>;
}

export interface DrawerPropType {
  thumbnail: string;
  title: string;
  thumbnailDark?: string;
  component?: ReactNode;
  id?: number;
}

export interface PersonalTabPropType {
  userData: UserInterface;
  updateUserData: (userData: UserInterface) => Promise<ResponseInterface<null>>;
  uploadImage: (image: File) => Promise<ResponseInterface<string>>;
}

export interface NotificationsTabPropType {
  notificationSettings: NotficationSettingInterface;
  updateNotificationSettings: (
    data: NotficationSettingInterface
  ) => Promise<ResponseInterface<null>>;
}

export interface SecurityTabPropType {
  updatePassword: (
    data: ChangePasswordInterface
  ) => Promise<ResponseInterface<null>>;
  deleteAccount: () => Promise<ResponseInterface<null>>;
}

export interface FeedbackTabPropType {
  feedbackData: FeedbackInterface[];
  addFeedback: (content: string) => Promise<ResponseInterface<null>>;
}

export interface ChatComponentPropType {
  messagesData: FeedbackInterface[] | ParagraphInterface[];
  sendMessage?: (content: string) => void;
  handleNext?: () => void;
  isLoading?: boolean;
  isBookmarked?: boolean;
  bookmarkChapter?: () => void;
  date?: Date;
  chapter?: { title: string; num: number };
  typingNotAllowed?: boolean;
  isInModal?: boolean;
  isHome?: boolean;
  reportAllowed?: boolean;
  sendDisabled?: boolean;
}
/*** --- ***/
