import React from 'react'
import { POST } from 'api/index';
import { BookingCardPropType } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';

const WithBookSkillData = (BookingSkillPage: React.FC<BookingCardPropType>) => function WithProps() {
    const {setAlert} = useAlert()
    const token = window.localStorage.getItem("currentUserToken")

    const bookCourse = async (courseId: number) => {
        const body = new URLSearchParams();
        if(token)
            body.append('userToken', token);
        body.append('option', courseId.toString());

        const response = await POST('addUserToCourse', body);
        if (response.status === 200)
            setAlert({color:'success', message:'Course booking successful!'})
        else
            setAlert({color:'error', message:response.error})

        return {
            status: response.status,
            content: response.content,
            message: response.error || '',
        }
    }


    return (
        <BookingSkillPage bookCourse={bookCourse} />
    )
}

export default WithBookSkillData