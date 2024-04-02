import { POST } from 'api/index';
import { NotificationsTabPropType, NotficationSettingInterface } from 'entities/interfaces'
import useAlert from 'hooks/AlertHook';
import React, { useEffect, useState } from 'react'

const WithNotificationsTabData = (NotificationsTab: React.FC<NotificationsTabPropType>) => function WithProps() {
    const {setAlert}= useAlert()

    const token = window.localStorage.getItem("currentUserToken")
    const [notificationSettings, setNotificationSettings] = useState<NotficationSettingInterface>({
        notification1: 0,
        notification2: 0,
        notification3: 0
    });

    useEffect(() => {
        getNotificationSettings()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getNotificationSettings = async () => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        const response = await POST('getUserNotification', body);

        const result: NotficationSettingInterface = response.content;
        setNotificationSettings(result)
    }

    const updateNotificationSettings = async (data: NotficationSettingInterface) => {
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('notification1', data.notification1.toString());
        body.append('notification2', data.notification2.toString());
        body.append('notification3', data.notification3.toString());
        const response = await POST('setUserNotification', body);

        if (response.status === 200)
            setAlert({color:'success', message:'Update successful!'})
        else
            setAlert({color:'error', message:response.error})

        return response
    }

    return (
        <NotificationsTab notificationSettings={notificationSettings} updateNotificationSettings={updateNotificationSettings} />
    )
}

export default WithNotificationsTabData