import { POST } from 'api/index';
import { FeedbackTabPropType, FeedbackInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithFeedbackTabData = (FeedbackTab: React.FC<FeedbackTabPropType>) => function WithProps() {
    const { setAlert } = useAlert()
    const token = window.localStorage.getItem("currentUserToken")
    const [feedbackData, setFeedbackData] = useState<FeedbackInterface[]>([]);

    useEffect(() => {
        getFeedbackData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getFeedbackData = async () => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        const response = await POST('getFeedback', body);

        const result: FeedbackInterface[] = response.result;
        setFeedbackData(result)
    }

    const addFeedback = async (content: string) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('content', content);
        body.append('option', '1');
        const response = await POST('addFeedback', body);
        if (response.status === 200){
            getFeedbackData()
        }
        else
            setAlert({ color: 'error', message: response.error })

        return response
    }

    return (
        <FeedbackTab feedbackData={feedbackData} addFeedback={addFeedback} />
    )
}

export default WithFeedbackTabData