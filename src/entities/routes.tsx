import ImageComponent from "ui/components/shared/ImageComponent"
import HomeIconD from 'assets/icons/Home-desktop.png'
import HomeIcon from 'assets/icons/Home.png'
import HomeIconDark from 'assets/icons/Home-dark.png'
import HomeActiveMobileIcon from 'assets/icons/Home-Filled.png'
import SkillsIcon from 'assets/icons/Skill.png'
import SkillsIconD from 'assets/icons/Skills-desktop.png'
import SkillsIconDark from 'assets/icons/Skills-dark.png'
import SkillsIconMobileActive from 'assets/icons/Skills-Filled.png'
import LibraryIconD from 'assets/icons/Library-desktop.png'
import LibraryIcon from 'assets/icons/Library.png'
import LibraryIconDark from 'assets/icons/Library-dark.png'
import LibraryIconMobileActive from 'assets/icons/Library-Filled.png'
import SkillboxIconD from 'assets/icons/Skillbox-desktop.png'
import SkillboxIcon from 'assets/icons/Skillbox.png'
import PackageIconDark from 'assets/icons/Skillbox-dark.png'
import PackageIconMobileActive from 'assets/icons/Skillbox-Filled.png'
import SettingsIconD from 'assets/icons/Settings-desktop.png'
import SettingsIcon from 'assets/icons/Settings.png'
import SettingsIconDark from 'assets/icons/Settings-dark.png'
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
        icon: <ImageComponent src={HomeIconD} alt="home" />,
        iconDark: <ImageComponent src={HomeIconDark} alt="home"/>,
        iconMobile: <ImageComponent src={HomeIcon} alt="home" />,
        iconActiveMobile: <ImageComponent src={HomeActiveMobileIcon} alt="home" />,
        component: (
            <Home />
        ),
    },
    {
        title: 'Skills',
        link: '/skills',
        icon: <ImageComponent src={SkillsIconD} alt="skills" />,
        iconDark: <ImageComponent src={SkillsIconDark} alt="skills" />,
        iconMobile: <ImageComponent src={SkillsIcon} alt="skills" />,
        iconActiveMobile: <ImageComponent src={SkillsIconMobileActive} alt="skills" />,
        component: (
            <Skills />
        ),
    },
    {
        title: 'Library',
        link: '/library',
        icon: <ImageComponent src={LibraryIconD} alt="library" />,
        iconDark: <ImageComponent src={LibraryIconDark} alt="library" />,
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
        icon: <ImageComponent src={SkillboxIconD} alt="skillbox" />,
        iconDark: <ImageComponent src={PackageIconDark} alt="skillbox" />,
        iconMobile: <ImageComponent src={SkillboxIcon} alt="skillbox" />,
        iconActiveMobile: <ImageComponent src={PackageIconMobileActive} alt="skillbox" />,
        component: (
            <Skillbox/>
        ),
    },
    {
        title: 'Settings',
        link: '/settings',
        icon: <ImageComponent src={SettingsIconD} alt="settings" />,
        iconDark: <ImageComponent src={SettingsIconDark} alt="settings" />,
        iconMobile: <ImageComponent src={SettingsIcon} alt="settings" />,
        iconActiveMobile: <ImageComponent src={SettingsIconMobileActive} alt="settings" />,
        component: (
            <Settings/>
        ),
    },
]