import { POST } from 'api/index';
import { ParagraphInterface, SkillBoxChapterInterface, SkillboxCourseInterface, SkillboxPropType } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithSkillboxData = (SkillboxPage: React.FC<SkillboxPropType>) => function WithProps() {
    const { setAlert } = useAlert()
    const token = window.localStorage.getItem("currentUserToken")
    const [courses, setCourses] = useState<SkillboxCourseInterface[]>([]);

    useEffect(() => {
        getCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCourses = async () => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        const response = await POST('getCourses', body);

        const result: SkillboxCourseInterface[] = response.result as SkillboxCourseInterface[] || [];
        result.sort((a: any, b: any) => parseInt(a.ordering) - parseInt(b.ordering))

        const progressResult = await Promise.all(result.map(async (course) => {
            const body = new URLSearchParams();
            body.append('userToken', token || '');
            body.append('option', course.id.toString());
            const { result: chapters } = await POST('getChapters', body) || { result: [] };
            chapters.sort((a: any, b: any) => parseInt(a.ordering) - parseInt(b.ordering))

            const chapterWiseProgress = await Promise.all(
                chapters.map(async (chapter: any) => {
                    const progressBody = new URLSearchParams();
                    progressBody.append('userToken', token || '');
                    progressBody.append('option', chapter.id.toString());
                    progressBody.append('content', '2');
                    const { result: progress } = await POST('getUserProgress', progressBody);
                    
                    return parseInt(progress)
                })
            );

            var progress = 0
            chapters.forEach((chapter: SkillBoxChapterInterface, index: number) => {
                chapter.progress = chapterWiseProgress[index]
                if (chapter.progress === 2) {
                    progress++
                }
            });

            return { chapters: chapters, progress: progress * 100 / chapters.length }
        }));

        result.forEach((course, index) => {
            course.progress = progressResult[index].progress
            course.chapters = progressResult[index].chapters
        });
        setCourses(result)
    }

    const setUserCourseState = async (courseId: number, state: number) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('content', courseId.toString());
        body.append('option', state.toString());
        const response = await POST('setUserCourseState', body);
        return response
    }

    const addUserCourse = async (courseId: number) => {
        const response = await setUserCourseState(courseId, 1);
        if (response.status === 200) {
            setAlert({ color: 'success', message: 'Course added back to skills!' })
            getCourses()
        }
        else
            setAlert({ color: 'error', message: response.error })

        return response.status
    }

    const deleteUserCourse = async (courseId: number) => {
        const response = await setUserCourseState(courseId, -1);
        if (response.status === 200) {
            setAlert({ color: 'success', message: 'Course removed!' })
            getCourses()
        }
        else
            setAlert({ color: 'error', message: response.error })

        return response.status
    }

    const setChapterNote = async (chapterId: number, note: string) => {
        const body = new URLSearchParams();
        body.append('userToken', token || '');
        body.append('option', chapterId.toString());
        body.append('content', note.toString());
        await POST('setChapterNote', body);
    }

    const getChapterNote = async (chapterId: number) => {
        const progressBody = new URLSearchParams();
        progressBody.append('userToken', token || '');
        progressBody.append('option', chapterId.toString());
        const { result: note } = await POST('getChapterNote', progressBody);
        return note
    }

    const getChapterHistory = async (chapterId: number) => {
        const sectionsBody = new URLSearchParams();
        sectionsBody.append('option', chapterId.toString());
        const { result: sections } = await POST('getSections', sectionsBody) || { result: [] };


        const sectionHistory: ParagraphInterface[][] = await Promise.all(
            sections.map(async (section: any) => {

                const sectionHistoryBody = new URLSearchParams()
                sectionHistoryBody.append('userToken', token || '')
                sectionHistoryBody.append('option', section.id)
                const { content: history } = await POST('getSectionHistory', sectionHistoryBody) || { content: [] }

                const paragraphs: ParagraphInterface[] = await Promise.all(
                    history.map(async (paragraphId: any) => {
                        const body = new URLSearchParams();
                        body.append('option', paragraphId.toString());
                        const { result: paragraph } = await POST('getParagraph', body) || { result: [] }
                        return paragraph
                    })
                )
                return paragraphs
            })
        );

        let chapterHistory: ParagraphInterface[] = []
        sectionHistory.forEach(item => {
            chapterHistory = [...chapterHistory, ...item]
        })
        return chapterHistory

    }
    const getChapterMaterial = async (chapterId: number) => {

    }

    return (
        <SkillboxPage courses={courses} addUserCourse={addUserCourse} deleteUserCourse={deleteUserCourse} setChapterNote={setChapterNote}
          getChapterNote={getChapterNote} getChapterHistory={getChapterHistory} getChapterMaterial={getChapterMaterial}/>
    )
}

export default WithSkillboxData