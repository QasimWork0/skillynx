import { POST } from 'api/index';
import { SkillboxCourseInterface, SkillboxPropType } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithSkillboxData = (SkillboxPage: React.FC<SkillboxPropType>) => function WithProps() {
    const {setAlert} = useAlert()
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

        // Array to store promises for each getChapters request
        const chapterPromises = result.map(async (course) => {
            const body = new URLSearchParams();
            body.append('option', course.id.toString());

            const chaptersResponse = await POST('getChapters', body);
            let chapters = chaptersResponse.result;

            chapters.sort((a: any, b: any) => parseInt(a.ordering) - parseInt(b.ordering))
            return chapters
        });

        // Wait for all promises to resolve
        const chaptersResults = await Promise.all(chapterPromises);

        // Assign chaptersResults to corresponding courses
        result.forEach((course, index) => {
            course.chapters = chaptersResults[index];
            course.state = parseInt(course.state.toString())
        });

        result.sort((a: any, b: any) => parseInt(a.ordering) - parseInt(b.ordering))
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
        if (response.status === 200)
        {
            setAlert({color:'success', message:'Course added back to skills!'})
            getCourses()
        }
        else
            setAlert({color:'error', message:response.error})

        return response.status
    }

    const deleteUserCourse = async (courseId: number) => {
        const response = await setUserCourseState(courseId, -1);
        if (response.status === 200)
        {
            setAlert({color:'success', message:'Course removed!'})
            getCourses()
        }
        else
            setAlert({color:'error', message:response.error})

        return response.status
    }

    return (
        <SkillboxPage courses={courses} addUserCourse={addUserCourse} deleteUserCourse={deleteUserCourse}/>
    )
}

export default WithSkillboxData