import { Box, Button, styled } from '@mui/material'
import React, { useContext } from 'react'
import Carousel from '../Carousel'
import LibrarySkillCard from '../cards/LibrarySkillCard'
import BackgroundLogin from 'assets/images/Background_Login.png'
import BookSkillCard from '../cards/BookSkillCard'
import { SelectedSkillContext } from 'data/index'


const ViewButton = styled(Button)(({ theme }) => ({
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    textTransform: 'none',
    marginRight: '2rem',
    padding: '0'
}))

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column'
}))

const Trending = () => {
    const { state: selectedSkill } = useContext(SelectedSkillContext)

    const dataset = [
        {
            image: BackgroundLogin,
            label: 'Ideation',
            sublabel: 'Develop great ideas',
            ratings: 4.6,
            ratingsCount: 14544
        },
        {
            image: BackgroundLogin,
            label: 'Learn to learn',
            sublabel: 'Learn efficiently',
            ratings: 4.8,
            ratingsCount: 4854
        },
        {
            image: BackgroundLogin,
            label: 'Negotiation',
            sublabel: 'Be a negotiation pro',
            ratings: 5.0,
            ratingsCount: 19312
        },
        {
            image: BackgroundLogin,
            label: 'Empathy',
            sublabel: 'Connect on a Deeper Level',
            ratings: 4.5,
            ratingsCount: 1314
        },
        {
            image: BackgroundLogin,
            label: 'Home Office',
            sublabel: 'Information',
            ratings: 4.8,
            ratingsCount: 4854
        },
        {
            image: BackgroundLogin,
            label: 'Empathy',
            sublabel: 'Connect on a Deeper Level',
            ratings: 4.5,
            ratingsCount: 1314
        },
        {
            image: BackgroundLogin,
            label: 'Home Office',
            sublabel: 'Information',
            ratings: 4.8,
            ratingsCount: 4854
        },
    ]

    return (
        <Wrapper>
            <Box sx={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <ViewButton>View all</ViewButton>
            </Box>
            <Box sx={{ width: '100%', height: '60%' }}>
                {
                    dataset.length > 0 && (
                        <Carousel>
                            {dataset.map((d, i) => (
                                <LibrarySkillCard key={i} data={d} />
                            ))}
                        </Carousel>
                    )
                }
            </Box>
            {selectedSkill && <BookSkillCard />}
        </Wrapper>
    )
}

export default Trending