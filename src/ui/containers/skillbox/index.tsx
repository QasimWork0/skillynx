import { POST } from 'api/index';
import { SkillboxCourseInterface, SkillboxPropType } from 'entities/interfaces'
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

        const result: SkillboxCourseInterface[] = response.result as SkillboxCourseInterface[];

        const progressResult = await Promise.all(result.map(async (course) => {
            const body = new URLSearchParams();
            body.append('userToken', token || '');
            body.append('option', course.id.toString());
            const { result:chapters } = await POST('getChapters', body) || {result:[]};
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
            chapterWiseProgress.forEach(chapterProgress => {
                if(chapterProgress === 2){
                    progress++
                }
            });

            return {chapters:chapters, progress:progress * 100 /chapters.length}
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

    return (
        <SkillboxPage courses={courses} addUserCourse={addUserCourse} deleteUserCourse={deleteUserCourse} />
    )
}

export default WithSkillboxData