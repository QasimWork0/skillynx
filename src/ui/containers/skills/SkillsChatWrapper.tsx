import React, { useCallback, useEffect, useState } from 'react'
import { POST } from 'api/index'
import { ParagraphInterface } from 'entities/interfaces'
import ChatComponent from 'ui/components/chat/ChatComponent'

const SkillsChatWrapper = ({ active, updateProgress }: any) => {

    const token = window.localStorage.getItem("currentUserToken")
    const [nodesData, setNodesData] = useState<ParagraphInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [calledNodes, setCalledNodes] = useState<number[]>([]);
    const [chapter, setChapter] = useState<{
        id: string
        title: string
        num: number,
        isBookmarked: boolean
    }>();
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const current = { chapter: '', section: '' }

    const getChatData = async (course_id: string) => {
        const chaptersBody = new URLSearchParams();
        chaptersBody.append('userToken', token || '');
        chaptersBody.append('option', course_id);
        const { result: chapters } = await POST('getChapters', chaptersBody)

        if (chapters) {
            const progressResult = await Promise.all(
                chapters.map(async (chapter: any) => {
                    const progressBody = new URLSearchParams();
                    progressBody.append('userToken', token || '');
                    progressBody.append('option', chapter.id.toString());
                    progressBody.append('content', '2');
                    const { result: progress } = await POST('getUserProgress', progressBody);

                    return parseInt(progress)
                })
            );

            for (let i = 0; i < chapters.length; i++) {
                if (progressResult[i] === 0 || progressResult[i] === 1) {
                    current.chapter = chapters[i].id

                    const sectionsBody = new URLSearchParams();
                    sectionsBody.append('option', current.chapter);
                    const { result: sections } = await POST('getSections', sectionsBody);

                    if (sections) {
                        const sectionsProgressResult = await Promise.all(
                            sections.map(async (section: any) => {
                                const progressBody = new URLSearchParams();
                                progressBody.append('userToken', token || '');
                                progressBody.append('option', section.id.toString());
                                progressBody.append('content', '3');
                                const { result: progress } = await POST('getUserProgress', progressBody);

                                return parseInt(progress)
                            })
                        );

                        for (let j = 0; j < sections.length; j++) {
                            if (sectionsProgressResult[j] === 0 || sectionsProgressResult[j] === 1) {
                                current.section = sections[j].id
                                setChapter({ id: chapters[i].id, title: chapters[i].title + ' - ' + sections[j].title, num: chapters[i].ordering, isBookmarked: chapters[i].bookmark === '1' })

                                break
                            }
                        }
                    }

                    break
                }
            }

            const paragraphsData = await getSectionHistoryParagraphs(current.section)

            if (paragraphsData.length === 0) {
                const paragraphsBody = new URLSearchParams();
                paragraphsBody.append('option', current.section);
                const { result: paragraphs } = await POST('getParagraphs', paragraphsBody);

                if (paragraphs) {
                    const start = paragraphs.find((item: ParagraphInterface) => item.type === "start")
                    paragraphsData.push(start)
                    await markParagraph(start.id)
                }
            }

            setNodesData(paragraphsData)
            setIsLoading(false)
        }
    }

    const bookmarkChapter = async (id: string, value: number) => {
        console.log(id, value)
        const body = new URLSearchParams();
        if (token)
            body.append('userToken', token);
        body.append('option', id);
        body.append('content', value.toString());
        const response = await POST('setBookmark', body)
        if (response.status === 200) {
            chapter && setChapter({ ...chapter, isBookmarked: value === 1 })
        }
    }

    const resetSection = async (sectionId: string) => {
        const resetBody = new URLSearchParams();
        resetBody.append('userToken', token || '');
        resetBody.append('option', sectionId);
        // const response = await POST('clearSectionUserContent', resetBody)
        // if (response.status === 200) {
        //     const paragraphs = await getSectionHistoryParagraphs()
        //     setNodesData(paragraphs)
        // }
    }

    const getSectionHistoryParagraphs = async (sectionId: string) => {
        const historyBody = new URLSearchParams()
        historyBody.append('userToken', token || '')
        historyBody.append('option', sectionId)
        const historyResp = await POST('getSectionHistory', historyBody)
        let history = historyResp.content

        const paragraphPromise = history.map(async (paragraphId: any) => {
            const body = new URLSearchParams();
            body.append('option', paragraphId.toString());
            const paragraphsResp = await POST('getParagraph', body);
            let paragraph = paragraphsResp.result;
            return paragraph
        });

        // Wait for all promises to resolve
        const paragraphs: ParagraphInterface[] = await Promise.all(paragraphPromise)
        return paragraphs
    }

    const getNext = useCallback(async (outputs: string) => {
        setIsLoading(true)
        const [nextParagraphId, delay] = outputs.split('@');

        const body = new URLSearchParams();
        body.append('option', nextParagraphId);

        const startTime = Date.now(); // Record the start time

        const paragraphsResp = await POST('getParagraph', body);

        const endTime = Date.now(); // Record the end time
        const apiResponseTime = endTime - startTime; // Calculate API response time

        // Calculate the remaining delay required to make it total 2 seconds
        const remainingDelay = Math.max(parseInt(delay) * 1000 - apiResponseTime, 0);

        const id = setTimeout(async () => {
            setIsLoading(false)
            let paragraph = paragraphsResp.result;
            setNodesData(nodesData => [...nodesData, paragraph]);
            await markParagraph(paragraph.id)
        }, remainingDelay)
        setTimeoutId(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const markParagraph = async (paragraphId: string) => {
        const body = new URLSearchParams();
        body.append('userToken', token || '');
        body.append('option', paragraphId);
        await POST('markParagraph', body)
    }

    const handleFeedback = () => {
        //Todo: feedback logic here

        updateProgress()
        setIsLoading(true)
        setCalledNodes([])
        setNodesData([])
        setChapter(undefined)
        getChatData(active.id)
    }

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setIsLoading(true)
        setCalledNodes([])
        setNodesData([])
        setChapter(undefined)
        getChatData(active.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    useEffect(() => {
        if (nodesData && nodesData.length > 0) {
            const last = nodesData[nodesData.length - 1]
            if (last.type !== 'next' && last.outputs && last.outputs.split(',').length===1) {
                if (!calledNodes.includes(last.id)) {
                    setCalledNodes(calledNodes => [...calledNodes, last.id])
                    getNext(last.outputs);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calledNodes, getNext, nodesData, active]);

    useEffect(() => {
        // Clean up the timeout when the component unmounts
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <>
            {active &&
                <ChatComponent
                    messagesData={nodesData}
                    date={new Date()}
                    sendDisabled
                    chapter={chapter}
                    bookmarkChapter={bookmarkChapter}
                    resetSection={resetSection}
                    handleNext={getNext}
                    isLoading={isLoading}
                    handleFeedback={handleFeedback}
                />

            }
        </>
    )
}

export default SkillsChatWrapper