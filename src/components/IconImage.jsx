import React from 'react';

function IconImage({ src, alt, className }) {
    let styles = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    let imgStyles = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }

    return (
        <div className={`icon-image ${className}`} style={styles}>
            <img src={src} alt={alt} style={imgStyles} />
        </div>
    );
}

export default IconImage;