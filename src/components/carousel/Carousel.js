import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

import Albers1 from "../img/albers1.jpeg";
import Albers2 from "../img/albers2.jpeg";
import Albers3 from "../img/albers3.jpeg";
import Albers4 from "../img/albers4.jpeg";
import Albers5 from "../img/albers5.jpeg";

import "./Carousel.css";

const Carousel = () => {
    const [images] = useState([
        { url: Albers1, id: 0 },
        { url: Albers2, id: 1 },
        { url: Albers3, id: 2 },
        { url: Albers4, id: 3 },
        { url: Albers5, id: 4 }
    ]);
    const [idx, setIdx] = useState(0);
    const [source, setSource] = useState(images[idx].url);
    const [visible, setVisible] = useState(false);
    const transitions = useTransition(images[idx], item => item.id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { tension: 220, friction: 120 }
    });

    const slide = transitions.map(({ item, props, key }) => {
        return (
            <animated.img
                className={"carousel_slide"}
                style={props}
                key={key}
                src={`${item.url}`}
                alt=""
            />
        );
    });
    useEffect(() => {
        setSource(images[idx].url);
    }, [idx, images]);

    // -------------to be used for autplay------------
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setIdx(state => (state + 1) % images.length);
    //     }, 2000);
    //     return () => clearInterval(interval);
    // });

    const showArrows = () => {
        setVisible(true);
    };

    const hideArrows = () => {
        setVisible(false);
    };

    const showPrevSlide = () => {
        if (idx === 0) {
            setIdx(images.length - 1);
        } else {
            setIdx(idx - 1);
        }
        setSource(images[idx]);
    };

    const showNextSlide = () => {
        if (idx === images.length - 1) {
            setIdx(0);
        } else {
            setIdx(idx + 1);
        }
        setSource(images[idx]);
    };

    return (
        <>
            <div
                className={"carousel_container"}
                onMouseEnter={showArrows}
                onMouseLeave={hideArrows}
            >
                <div className="slide_container">{slide}</div>

                <div
                    className={
                        visible
                            ? "slider_buttons_container visible_container"
                            : "slider_buttons_container hidden_container"
                    }
                >
                    <div className="slider_button prev" onClick={showPrevSlide}>
                        <span className="chevron left"></span>
                    </div>
                    <div className="slider_button next" onClick={showNextSlide}>
                        <span className="chevron right"></span>
                    </div>
                </div>
            </div>
            <div className="slider_buttons_container-sm_screen">
                <div className="slider_button prev" onClick={showPrevSlide}>
                    <span className="chevron left"></span>
                </div>
                <div className="slider_button prev" onClick={showNextSlide}>
                    <span className="chevron right"></span>
                </div>
            </div>
        </>
    );
};

export default Carousel;
