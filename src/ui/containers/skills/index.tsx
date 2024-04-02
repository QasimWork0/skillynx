import { POST } from 'api/index';
import { SkillsPropType, LibraryCourseInterface, SkillCourseInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithSkillsData = (SkillsPage: React.FC<SkillsPropType>) => function WithProps() {
    const {setAlert} = useAlert()
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

        const result: LibraryCourseInterface[] = response.result;
        result.sort((a: any, b: any) => parseInt(a.ordering) - parseInt(b.ordering))

        setCourses(result as SkillCourseInterface[])
    }

    const deleteUserCourse = async (courseId: number) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('content', courseId.toString());
        body.append('option', '0');
        const response = await POST('setUserCourseState', body);
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
        <SkillsPage courses={courses} deleteUserCourse={deleteUserCourse}/>
    )
}

export default WithSkillsData