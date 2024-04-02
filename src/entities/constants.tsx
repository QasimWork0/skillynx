import PersonalLogo from "assets/icons/user-profile.png";
import LearningPreferenceLogo from "assets/icons/male-student.png";
import NotificationsLogo from "assets/icons/notification.png";
import SecurityLogo from "assets/icons/Security.png";
import FeedbackLogo from "assets/icons/heart-message.png";
import ContactusLogo from "assets/icons/Contact.png";
import PersonalLogoDark from "assets/icons/user-profile-dark.png";
import LearningPreferenceLogoDark from "assets/icons/male-student-dark.png";
import NotificationsLogoDark from "assets/icons/notification-dark.png";
import SecurityLogoDark from "assets/icons/security-dark.png";
import FeedbackLogoDark from "assets/icons/heart-message-dark.png";
import ContactusLogoDark from "assets/icons/contact-dark.png";
import PersonalTab from "ui/components/pages/settings/tabs/PersonalTab";
import LearningPreferenceTab from "ui/components/pages/settings/tabs/LearningPreferenceTab";
import NotificationsTab from "ui/components/pages/settings/tabs/NotificationsTab";
import SecurityTab from "ui/components/pages/settings/tabs/SecurityTab";
import FeedbackTab from "ui/components/pages/settings/tabs/FeedbackTab";
import ContactusTab from "ui/components/pages/settings/tabs/ContactusTab";
import { DrawerPropType } from "./interfaces";

export const MobileWidth = 960
export const AppWidthMin = 400
export const AppHeightMin = 600

export const TextSizes = [
  {
    extraLargeTitle: '38px',
    largeTitle: '32px',
    title1: '26px',
    title2: '22px',
    title3: '18px',
    body: '15px',
    callout: '14px',
    subhead: '13px',
    footnote: '12px',
    caption1: '11px',
    caption2: '11px',
  },
  {
    extraLargeTitle: '40px',
    largeTitle: '34px',
    title1: '28px',
    title2: '24px',
    title3: '20px',
    body: '17px',
    callout: '16px',
    subhead: '15px',
    footnote: '13px',
    caption1: '12px',
    caption2: '11px',
  },
  {
    extraLargeTitle: '44px',
    largeTitle: '38px',
    title1: '32px',
    title2: '26px',
    title3: '24px',
    body: '21px',
    callout: '20px',
    subhead: '19px',
    footnote: '17px',
    caption1: '16px',
    caption2: '15px',
  }
]

export const SettingsMenu: DrawerPropType[] = [
  {
    title: "Personal",
    thumbnail: PersonalLogo,
    thumbnailDark: PersonalLogoDark,
    component: <PersonalTab />,
  },
  {
    title: "Learning Preference",
    thumbnail: LearningPreferenceLogo,
    thumbnailDark: LearningPreferenceLogoDark,
    component: <LearningPreferenceTab />,
  },
  {
    title: "Notifications",
    thumbnail: NotificationsLogo,
    thumbnailDark: NotificationsLogoDark,
    component: <NotificationsTab />,
  },
  {
    title: "Security",
    thumbnail: SecurityLogo,
    thumbnailDark: SecurityLogoDark,
    component: <SecurityTab />,
  },
  {
    title: "Feedback",
    thumbnail: FeedbackLogo,
    thumbnailDark: FeedbackLogoDark,
    component: <FeedbackTab />,
  },
  {
    title: "Contact us",
    thumbnail: ContactusLogo,
    thumbnailDark: ContactusLogoDark,
    component: <ContactusTab />,
  },
];

export const Languages = ["German", "English"];

export const TextModes = ["Directly", "Sequential"];

export const DarkModes = ["On", "Off"];

export const NotificationPrompts = [
  "I will remind you everyday",
  "I will remind you two times per week",
  "I will remind you one time per week",
  "I will never remind you",
]

export const Innucation = (
  <>
    Hochschule Ruhr West - Campus Mülheim<br />
    Gebäude 03<br />
    Duisburger Straße 100<br />
    45479 Mülheim an der Ruhr
  </>
);

export const Contact = "E-Mail: fb2cmr@hs-ruhrwest.de"