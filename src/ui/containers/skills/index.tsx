import { POST } from 'api/index';
import { SkillsPropType, SkillCourseInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithSkillsData = (SkillsPage: React.FC<SkillsPropType>) => function WithProps() {
    const { setAlert } = useAlert()
    const token = window.localStorage.getItem("currentUserToken")
    const [courses, setCourses] = useState<SkillCourseInterface[]>([]);

    useEffect(() => {
        getCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCourses = async () => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('option', '1');
        const response = await POST('getCourses', body);

        const result: SkillCourseInterface[] = response.result;
        result.sort((a: any, b: any) => parseInt(a.ordering) - parseInt(b.ordering))

        const progressResult = await Promise.all(result.map(async (course) => {
            const body = new URLSearchParams();
            body.append('userToken', token || '');
            body.append('option', course.id.toString());
            const { result:chapters } = await POST('getChapters', body) || {result:[]};

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

            return progress * 100 /chapters.length
        }));

        result.forEach((course, index) => {
            course.progress = progressResult[index];
        });

        setCourses(result)
    }

    const deleteUserCourse = async (courseId: number) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('content', courseId.toString());
        body.append('option', '0');
        const response = await POST('setUserCourseState', body);
        if (response.status === 200) {
            setAlert({ color: 'success', message: 'Course removed!' })
            getCourses()
        }
        else
            setAlert({ color: 'error', message: response.error })
        return response.status
    }

    const updateProgress = () => {
        getCourses()
    }

    return (
        <SkillsPage courses={courses} deleteUserCourse={deleteUserCourse} updateProgress={updateProgress}/>
    )
}

export default WithSkillsData