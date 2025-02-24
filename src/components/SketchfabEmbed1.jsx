import React from 'react';

const SketchfabEmbed1 = () => {
    return (
        <div className="sketchfab-embed-wrapper">
            <iframe 
                title="Doric Pillar" 
                frameBorder="0" 
                allowFullScreen 
                mozallowfullscreen="true" 
                webkitallowfullscreen="true" 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                src="https://sketchfab.com/models/71281e2a19f842738f8766f5bab6ca86/embed"
                style={{ width: '100%', height: '500px' }}>
            </iframe>
            <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
                <a href="https://sketchfab.com/3d-models/doric-pillar-71281e2a19f842738f8766f5bab6ca86?utm_medium=embed&utm_campaign=share-popup&utm_content=71281e2a19f842738f8766f5bab6ca86" 
                   target="_blank" 
                   rel="nofollow" 
                   style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                    Doric Pillar
                </a> 
                by 
                <a href="https://sketchfab.com/gtsever?utm_medium=embed&utm_campaign=share-popup&utm_content=71281e2a19f842738f8766f5bab6ca86" 
                   target="_blank" 
                   rel="nofollow" 
                   style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                    gtsever
                </a> 
                on 
                <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=71281e2a19f842738f8766f5bab6ca86" 
                   target="_blank" 
                   rel="nofollow" 
                   style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                    Sketchfab
                </a>
            </p>
        </div>
    );
}

export default SketchfabEmbed1;