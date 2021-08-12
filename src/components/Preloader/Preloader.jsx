import React from 'react'
import './Preloader.css'

export const Preloader = ({isPreloaderDisplay}) => {
    return (
        <div className={`preloader ${!isPreloaderDisplay ? 'preloader_hidden' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};
