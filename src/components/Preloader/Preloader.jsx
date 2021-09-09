import React from 'react'
import './Preloader.css'

export const Preloader = ({ preloaderVisible }) => {

    return (
        <div className={`preloader ${preloaderVisible ? '' : 'preloader_hidden'}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};
