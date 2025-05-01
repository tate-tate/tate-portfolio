import React from 'react';
import style from '../styles/quicklinks.module.css';
import FadeIn from '../components/FadeIn';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';

const Quicklinks = () => {

    return(
        <Wrapper>
            <Wrapper>
                <FadeIn duration={1000} delay={100}>
                <h1>Tate's QuickLinks</h1>
                </FadeIn>
                <FadeIn duration={1000} delay={200}>
                <p>If you're here and you're not me, you found my personal browser homepage.</p>
                </FadeIn>

            </Wrapper>
            <Wrapper>
                <FadeIn duration={1000} delay={500}>
                <h2 className={style.sectiontitle}>General Utility - Everything Google</h2>
                <hr className={style.divider}></hr>
                </FadeIn>
                <div className={style.row}>
                    <FadeIn duration={1000} delay={750}>
                    <div className={style.thumbnailcontainer}>
                        <a href="https://www.google.com">
                            <img className={style.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png' />
                        </a>
                        <p className={style.thumbnailtext}>Google</p>
                    </div>
                    </FadeIn>
                    <FadeIn duration={1000} delay={800}>
                    <div className={style.thumbnailcontainer}>
                        <a href='https://photos.google.com'>
                            <img className={style.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/2048px-Google_Photos_icon_%282020%29.svg.png' />
                        </a>
                        <p className={style.thumbnailtext}>Google Photos</p>
                    </div>
                    </FadeIn>
                    <FadeIn duration={1000} delay={850}>
                    <div className={style.thumbnailcontainer}>
                        <a href='https://calendar.google.com/u/0'>
                            <img className={style.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png' />
                        </a>
                        <p className={style.thumbnailtext}>Google Calendar</p>
                    </div>
                    </FadeIn>
                    <FadeIn duration={1000} delay={900}>
                    <div className={style.thumbnailcontainer}>
                        <a href='https://drive.google.com/drive/my-drive'>
                            <img className={style.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1200px-Google_Drive_icon_%282020%29.svg.png' />
                        </a>
                        <p className={style.thumbnailtext}>Google Drive</p>
                    </div>
                    </FadeIn>
                    <FadeIn duration={1000} delay={950}>
                    <div className={style.thumbnailcontainer}>
                        <a href='https://messages.google.com/web/welcome'>
                            <img className={style.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Google_Messages_icon_%282022%29.svg/2048px-Google_Messages_icon_%282022%29.svg.png' />
                        </a>
                        <p className={style.thumbnailtext}>Google Messages</p>
                    </div>
                    </FadeIn>
                    <FadeIn duration={1000} delay={1000}>
                    <div className={style.thumbnailcontainer}>
                        <a href="https://mail.google.com">
                            <img className={style.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png' />
                        </a>
                        <p className={style.thumbnailtext}>Gmail</p>
                    </div>
                    </FadeIn>
                </div>
                <FadeIn duration={1000} delay={1100}>
                <h2 className={style.sectiontitle}>Entertainment</h2>
                <hr className={style.divider}></hr>
                </FadeIn>
                
            </Wrapper>
        </Wrapper>
    )

}
export default Quicklinks;