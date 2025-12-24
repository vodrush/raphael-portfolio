import React from 'react';
import Snowfall from 'react-snowfall';

const SnowEffect: React.FC = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            <Snowfall
                snowflakeCount={200}
                radius={[0.5, 3.0]}
                speed={[0.5, 3.0]}
                wind={[-0.5, 2.0]}
                color="#ffffff"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 50, // Moins agressif que 9999 pour laisser les modales au dessus si besoin
                }}
            />
        </div>
    );
};

export default SnowEffect;
