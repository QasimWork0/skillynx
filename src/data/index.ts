import { LibrarySkillInterface } from "entities/interfaces";
import { CreateContext } from "./CustomContext";

export const [TextSizeContext, TextSizeContextProvider] = CreateContext<'Small'|'Medium'|'Large'>('Medium')
export const [DarkModeContext, DarkModeContextProvider] = CreateContext(false)
export const [SkillsDrawerContext, SkillsDrawerContextProvider] = CreateContext(true)
export const [SelectedSkillContext, SelectedSkillContextProvider] = CreateContext<LibrarySkillInterface|undefined>(undefined)