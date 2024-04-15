import { AlertInterface, LibraryCourseInterface } from "entities/interfaces";
import { CreateContext } from "./CustomContext";

export const [BackgroundContext, BackgroundContextProvider] = CreateContext<1|2|3|4>(1)
export const [AlertContext, AlertContextProvider] = CreateContext<AlertInterface|undefined>(undefined)
export const [TextSizeContext, TextSizeContextProvider] = CreateContext<0|1|2>(2)
export const [DarkModeContext, DarkModeContextProvider] = CreateContext(false)
export const [SelectedSkillContext, SelectedSkillContextProvider] = CreateContext<LibraryCourseInterface|undefined>(undefined)
