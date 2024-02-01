import ImageComponent from "ui/components/shared/ImageComponent"
import HomeIcon from 'assets/icons/home-Bold_1_.png'
import HomeActiveIcon from 'assets/icons/home-Filled_1_white.png'
import HomeActiveMobileIcon from 'assets/icons/home-Filled_1_.png'
import SkillsIcon from 'assets/icons/comments-Bold_1_.png'
import SkillsIconActive from 'assets/icons/comments-Filled_1_white.png'
import SkillsIconMobileActive from 'assets/icons/comments-Filled_1_.png'
import LibraryIcon from 'assets/icons/store-Bold_1_.png'
import LibraryIconActive from 'assets/icons/store-Filled_1_white.png'
import LibraryIconMobileActive from 'assets/icons/store-Filled_1_.png'
import PackageIcon from 'assets/icons/package-Bold_1_.png'
import PackageIconActive from 'assets/icons/package-Filled_1_white.png'
import PackageIconMobileActive from 'assets/icons/package-Filled_1_.png'
import SettingsIcon from 'assets/icons/settings-Bold.png'
import SettingsIconActive from 'assets/icons/settings-Filled_white.png'
import SettingsIconMobileActive from 'assets/icons/settings-Filled.png'
import Home from "ui/pages/home"
import Skills from "ui/pages/skills"
import Library from "ui/pages/library"
import { SelectedSkillContextProvider } from "data/index"
import Skillbox from "ui/pages/skillbox"
import Settings from "ui/pages/settings"
import { RoutesInterface } from "./interfaces"



export const Routes: RoutesInterface[] = [
    {
        title: 'Home',
        link: '/home',
        icon: <ImageComponent src={HomeIcon} alt="home" />,
        iconActive: <ImageComponent src={HomeActiveIcon} alt="home" filterAllowed/>,
        iconMobile: <ImageComponent src={HomeIcon} alt="home" />,
        iconActiveMobile: <ImageComponent src={HomeActiveMobileIcon} alt="home" />,
        component: (
            <Home />
        ),
    },
    {
        title: 'Skills',
        link: '/skills',
        icon: <ImageComponent src={SkillsIcon} alt="skills" />,
        iconActive: <ImageComponent src={SkillsIconActive} alt="skills" filterAllowed/>,
        iconMobile: <ImageComponent src={SkillsIcon} alt="skills" />,
        iconActiveMobile: <ImageComponent src={SkillsIconMobileActive} alt="skills" />,
        component: (
            <Skills />
        ),
    },
    {
        title: 'Library',
        link: '/library',
        icon: <ImageComponent src={LibraryIcon} alt="library" />,
        iconActive: <ImageComponent src={LibraryIconActive} alt="library" filterAllowed/>,
        iconMobile: <ImageComponent src={LibraryIcon} alt="library" />,
        iconActiveMobile: <ImageComponent src={LibraryIconMobileActive} alt="library" />,
        component: (
            <SelectedSkillContextProvider>
                <Library />
            </SelectedSkillContextProvider>
        ),
    },
    {
        title: 'Skillbox',
        link: '/skillbox',
        icon: <ImageComponent src={PackageIcon} alt="skillbox" />,
        iconActive: <ImageComponent src={PackageIconActive} alt="skillbox" filterAllowed/>,
        iconMobile: <ImageComponent src={PackageIcon} alt="skillbox" />,
        iconActiveMobile: <ImageComponent src={PackageIconMobileActive} alt="skillbox" />,
        component: (
            <Skillbox/>
        ),
    },
    {
        title: 'Settings',
        link: '/settings',
        icon: <ImageComponent src={SettingsIcon} alt="settings" />,
        iconActive: <ImageComponent src={SettingsIconActive} alt="settings" filterAllowed/>,
        iconMobile: <ImageComponent src={SettingsIcon} alt="settings" />,
        iconActiveMobile: <ImageComponent src={SettingsIconMobileActive} alt="settings" />,
        component: (
            <Settings/>
        ),
    },
]