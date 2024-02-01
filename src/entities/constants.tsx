import PersonalLogo from "assets/icons/User_Profile.png";
import LearningPreferenceLogo from "assets/icons/Male_Student.png";
import NotificationsLogo from "assets/icons/Notification.png";
import SecurityLogo from "assets/icons/Security.png";
import FeedbackLogo from "assets/icons/Heart_Message.png";
import ContactusLogo from "assets/icons/Contact.png";
import PersonalTab from "ui/components/pages/settings/tabs/PersonalTab";
import LearningPreferenceTab from "ui/components/pages/settings/tabs/LearningPreferenceTab";
import NotificationsTab from "ui/components/pages/settings/tabs/NotificationsTab";
import SecurityTab from "ui/components/pages/settings/tabs/SecurityTab";
import FeedbackTab from "ui/components/pages/settings/tabs/FeedbackTab";
import ContactusTab from "ui/components/pages/settings/tabs/ContactusTab";

export const MobileWidth = 960
export const AppWidthMin = 400

export const TextSizes = {
  Small: {
    largeTitle: '32px',
    title1: '26px',
    title2: '20px',
    title3: '18px',
    body: '15px',
    callout: '14px',
    subhead: '13px',
    footnote: '12px',
    caption1: '11px',
    caption2: '11px',
  },
  Medium: {
    largeTitle: '34px',
    title1: '28px',
    title2: '22px',
    title3: '20px',
    body: '17px',
    callout: '16px',
    subhead: '15px',
    footnote: '13px',
    caption1: '12px',
    caption2: '11px',
  },
  Large: {
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
}

export const SettingsMenu = [
  {
    label: "Personal",
    image: PersonalLogo,
    component: <PersonalTab />,
  },
  {
    label: "Learning Preference",
    image: LearningPreferenceLogo,
    component: <LearningPreferenceTab />,
  },
  {
    label: "Notifications",
    image: NotificationsLogo,
    component: <NotificationsTab />,
  },
  {
    label: "Security",
    image: SecurityLogo,
    component: <SecurityTab />,
  },
  {
    label: "Feedback",
    image: FeedbackLogo,
    component: <FeedbackTab />,
  },
  {
    label: "Contact us",
    image: ContactusLogo,
    component: <ContactusTab />,
  },
];

export const Languages = ["German", "English"];

export const TextModes = ["Directly", "Sequential"];

export const DarkModes = ["On", "Off"];

export const NotificationPrompts = {
  Frequent: "I will remind you everyday",
  Moderate: "I will remind you two times per week",
  Rare: "I will remind you one time per week",
  Off: "I will never remind you",
};

export const Innucation = (
  <>
    Hochschule Ruhr West - Campus Mülheim<br />
    Gebäude 03<br />
    Duisburger Straße 100<br />
    45479 Mülheim an der Ruhr
  </>
);

export const Contact = "E-Mail: fb2cmr@hs-ruhrwest.de"