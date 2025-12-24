import React from 'react';

const ChristmasGarland: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-[60] pointer-events-none flex justify-between items-start overflow-hidden px-4" style={{ height: '100px' }}>
            {/* Fil de la guirlande */}
            <div className="absolute top-[-10px] left-0 right-0 h-[20px] rounded-[50%]"
                style={{
                    borderBottom: '4px solid #165B33',
                    transform: 'scaleX(1.1)'
                }}>
            </div>

            {/* Boules */}
            {Array.from({ length: 12 }).map((_, i) => {
                const colors = ['bg-red-500', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'];
                const color = colors[i % colors.length];
                const delay = i * 0.1;

                return (
                    <div key={i} className="relative group">
                        {/* Fil qui tient la boule */}
                        <div className="w-[2px] h-[15px] bg-gray-400 mx-auto"></div>

                        {/* La boule */}
                        <div
                            className={`w-8 h-8 rounded-full ${color} shadow-lg relative animate-bounce`}
                            style={{
                                animationDuration: '3s',
                                animationDelay: `${delay}s`,
                                boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5)'
                            }}
                        >
                            {/* Reflet brillant */}
                            <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-60 blur-[1px]"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChristmasGarland;
