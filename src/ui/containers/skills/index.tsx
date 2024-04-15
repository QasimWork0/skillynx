import { POST } from 'api/index';
import { SkillsPropType, LibraryCourseInterface, SkillCourseInterface, ParagraphInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithSkillsData = (SkillsPage: React.FC<SkillsPropType>) => function WithProps() {
    const { setAlert } = useAlert()
    const token = window.localStorage.getItem("currentUserToken")
    const [courses, setCourses] = useState<SkillCourseInterface[]>([]);
    const [nodesData, setNodesData] = useState<ParagraphInterface[]>([]);

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
        if (response.status === 200) {
            setAlert({ color: 'success', message: 'Course removed!' })
            getCourses()
        }
        else
            setAlert({ color: 'error', message: response.error })
        return response.status
    }

    const handleCourseChange = async (course_id: string) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('option', course_id);
        const chaptersResp = await POST('getChapters', body);
        const chapters = chaptersResp.result

        // Array to store promises for each getSections request
        const chapterPromises = chapters.map(async (chapter: any) => {
            const body = new URLSearchParams();
            body.append('option', chapter.id.toString());

            const sectionsResp = await POST('getSections', body);
            let sections = sectionsResp.result;

            // Array to store promises for each getParagraphs request
            const sectionsPromises = sections.map(async (section: any) => {
                const body = new URLSearchParams();
                body.append('option', section.id.toString());

                const paragraphsResp = await POST('getParagraphs', body);
                let paragraphs = paragraphsResp.result;

                return paragraphs
            });

            const paragraphResult = await Promise.all(sectionsPromises);

            // Assign chaptersResults to corresponding courses
            sections.forEach((section: any, index: number) => {
                section.paragraphs = paragraphResult[index];
            });

            // sections.sort((a:any, b:any) => parseInt(a.ordering) - parseInt(b.ordering))
            // return sections.map((item:any) => item.title)
            return sections
        });

        // Wait for all promises to resolve
        const sectionsResult = await Promise.all(chapterPromises);

        // Assign chaptersResults to corresponding courses
        chapters.forEach((chapter: any, index: number) => {
            chapter.sections = sectionsResult[index];
        });

        // setCourses(result)

        setNodesData(sectionsResult[0][0].paragraphs)
    }

    return (
        <SkillsPage courses={courses} deleteUserCourse={deleteUserCourse} nodesData={nodesData} handleCourseChange={handleCourseChange} />
    )
}

export default WithSkillsData