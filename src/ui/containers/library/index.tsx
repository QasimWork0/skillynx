import { POST } from 'api/index';
import { LibraryPropType, LibraryCourseInterface } from 'entities/interfaces'
import React, { useEffect, useState } from 'react'

const WithLibraryData = (LibraryPage: React.FC<LibraryPropType>) => function WithProps() {
    const [courses, setCourses] = useState<LibraryCourseInterface[]>([]);

    useEffect(() => {
        getCourses()
    }, []);

    const getCourses = async () => {
        const response = await POST('getCourses');
        let result: LibraryCourseInterface[] = response.result;

        // Array to store promises for each getChapters request
        const chapterPromises = result.map(async (course) => {
            const body = new URLSearchParams();
            body.append('option', course.id.toString());

            const chaptersResponse = await POST('getChapters', body);
            let chapters =  chaptersResponse.result;

            chapters.sort((a:any, b:any) => parseInt(a.ordering) - parseInt(b.ordering))
            return chapters.map((item:any) => item.title)
        });

        // Wait for all promises to resolve
        const chaptersResults = await Promise.all(chapterPromises);

        // Assign chaptersResults to corresponding courses
        result.forEach((course, index) => {
            course.chapters = chaptersResults[index];
        });

        setCourses(result)
    }


  return (
   <LibraryPage courses={courses} />
  )
}

export default WithLibraryData