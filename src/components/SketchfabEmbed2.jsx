import React from 'react';

const SketchfabEmbed2 = () => {
    return (
        <div className="sketchfab-embed-wrapper">
            <iframe 
                title="2010TornadicEvents" 
                frameBorder="0" 
                allowFullScreen 
                mozallowfullscreen="true" 
                webkitallowfullscreen="true" 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                src="https://sketchfab.com/models/678b49dfb66a4f7c813cd994e99bfaea/embed"
                style={{ width: '100%', height: '500px' }}>
            </iframe>
            <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
                <a href="https://sketchfab.com/3d-models/2010tornadicevents-678b49dfb66a4f7c813cd994e99bfaea?utm_medium=embed&utm_campaign=share-popup&utm_content=678b49dfb66a4f7c813cd994e99bfaea" 
                   target="_blank" 
                   rel="nofollow" 
                   style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                    2010TornadicEvents
                </a> 
                by 
                <a href="https://sketchfab.com/gtsever?utm_medium=embed&utm_campaign=share-popup&utm_content=678b49dfb66a4f7c813cd994e99bfaea" 
                   target="_blank" 
                   rel="nofollow" 
                   style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                    gtsever
                </a> 
                on 
                <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=678b49dfb66a4f7c813cd994e99bfaea" 
                   target="_blank" 
                   rel="nofollow" 
                   style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                    Sketchfab
                </a>
            </p>
        </div>
    );
}

export default SketchfabEmbed2;