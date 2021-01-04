import React, { useState } from 'react';
import { AiFillCaretUp } from 'react-icons/ai';
// import { CaretUpOutlined } from 'ant-design/icons';
import styled from "styled-components";

const ScrollTopArrowWrapper = styled.div`

    .scrollTop {
        /* color: 'red'; */
        /* padding: '30px'; */
        :hover{
            color: 'yellow';
        }
    }
`;


const ScrollTopArrow = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(true)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <ScrollTopArrowWrapper>
            <AiFillCaretUp className="scrollTop" onClick={scrollTop}
                cursor='pointer'
                size={10}
                style=
                {{
                    height: 40,
                    width: 40,
                    display: showScroll ? 'flex' : 'none',
                    color: '#163C63',
                    // color: 'white',
                    // margin: '10px', 
                    // backgroundColor: '#9F9FF0', 
                    borderRadius: '10px',
                }} />
        </ScrollTopArrowWrapper>
    );
}

export default ScrollTopArrow;