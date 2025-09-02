import {
    AbsoluteFill,
    Audio,
    Img,
    Sequence,
    useCurrentFrame,
    interpolate,
    staticFile,
} from 'remotion';
import './styles.css';

export const MyVideo = () => {
    const scenesData = [
        {
            imageSrc: staticFile('assets/Enjoy forest pools at Bee Falls and Apsara Vihar.webp'),
            title: "Welcome to",
            subtitle: "Apsara Vihar",
            description: "Discover the enchanting forest pools of Bee Falls and Apsara Vihar, where crystal-clear waters meet lush greenery in perfect harmony.",
            startFrame: 0,
            duration: 150
        },
        {
            imageSrc: staticFile('assets/taj-mahal.jpg'),
            title: "Discover",
            subtitle: "Taj Mahal",
            description: "Experience the eternal symbol of love and architectural magnificence, where Mughal craftsmanship creates timeless beauty in white marble.",
            startFrame: 150,
            duration: 150
        },
        {
            imageSrc: staticFile('assets/london.jpg'),
            title: "Explore",
            subtitle: "London",
            description: "Journey through centuries of history in this vibrant metropolis, where royal heritage meets modern innovation at every corner.",
            startFrame: 300,
            duration: 150
        },
        {
            imageSrc: staticFile('assets/shogran swat kpk.jpg'),
            title: "Adventure in",
            subtitle: "Swat Valley KPK",
            description: "Escape to the Switzerland of Pakistan, where emerald valleys and snow-capped peaks create a paradise for nature lovers.",
            startFrame: 450,
            duration: 150
        },
        {
            imageSrc: staticFile('assets/Whitehaven Beach and Hamilton Island Cruise from Airlie Beach.jpg'),
            title: "Paradise at hellow",
            subtitle: "Whitehaven Beach",
            description: "Experience pristine white silica sand and turquoise waters at one of the world's most beautiful beaches in the Whitsunday Islands.",
            startFrame: 600,
            duration: 150
        }
    ];

    return (
        <AbsoluteFill className="container-main">
            <Audio src={staticFile('assets/Dawn of change.mp3')} />

            {scenesData.map((scene, index) => (
                <Sequence key={index} from={scene.startFrame} durationInFrames={scene.duration}>
                    <ImageTextScene
                        imageSrc={scene.imageSrc}
                        title={scene.title}
                        subtitle={scene.subtitle}
                        description={scene.description}
                    />
                </Sequence>
            ))}

            <Sequence from={750} durationInFrames={800}>
                <FadeOverlay />
            </Sequence>
        </AbsoluteFill>
    );
};

// Reusable scene component
const ImageTextScene = ({ imageSrc, title, subtitle, description }) => {
    const frame = useCurrentFrame();

    // Animations
    const imageScale = interpolate(frame, [0, 30, 90], [1.1, 1, 1.05], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const titleTranslateY = interpolate(frame, [10, 40], [50, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',

    });

    const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const subtitleTranslateY = interpolate(frame, [25, 55], [30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',

    });

    const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const descriptionTranslateY = interpolate(frame, [90, 120], [25, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const descriptionOpacity = interpolate(frame, [40, 60], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const descriptionProgress = interpolate(frame, [70, 120], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const visibleDescriptionText = description
        ? description.substring(0, Math.floor(description.length * descriptionProgress))
        : '';

    const accentLineWidth = interpolate(frame, [35, 65], [0, 200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    console.log(imageScale, 'imageScale')
    return (
        <AbsoluteFill>
            <div className="image-container">
                <Img
                    src={imageSrc}
                    className="image"
                    style={{
                        transform: `scale(${imageScale})`,
                        opacity: imageOpacity,
                    }}
                />
                <div className="overlay" />
            </div>

            <AbsoluteFill className="text-container">
                <h1
                    className="title"
                    style={{
                        transform: `translateY(${titleTranslateY}px)`,
                        opacity: titleOpacity,
                    }}
                >
                    {title}
                </h1>

                <p
                    className="subtitle"
                    style={{
                        transform: `translateY(${subtitleTranslateY}px)`,
                        opacity: subtitleOpacity,
                    }}
                >
                    {subtitle}
                </p>

                <div
                    className="accent-line"
                    style={{
                        width: accentLineWidth,
                        opacity: subtitleOpacity,
                    }}
                />

                {description && (
                    <div
                        className="description-container"
                        style={{
                            transform: `translateY(${descriptionTranslateY}px)`,
                            opacity: descriptionOpacity,
                        }}
                    >
                        <p className="description">
                            {visibleDescriptionText}
                            {descriptionProgress < 1 && (
                                <span
                                    className="cursor"
                                    style={{
                                        opacity: Math.sin(frame * 0.5) * 0.5 + 0.5,
                                    }}
                                >
                                    |
                                </span>
                            )}
                        </p>
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// Fade overlay component
const FadeOverlay = () => {
    const frame = useCurrentFrame();

    const backgroundOpacity = interpolate(frame, [0, 30], [0, 1]);
    const textOpacity = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const textScale = interpolate(frame, [20, 60], [0.8, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',

    });

    const textTranslateY = interpolate(frame, [20, 50], [30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const lineWidth = interpolate(frame, [40, 70], [0, 300], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            className="fade-overlay-container"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
            }}
        >
            <h3
                className="fade-overlay-text"
                style={{
                    opacity: textOpacity,
                    transform: `translateY(${textTranslateY}px) scale(${textScale})`,
                }}
            >
                Thanks for watching!
            </h3>

            <div
                className="fade-overlay-line"
                style={{
                    width: lineWidth,
                    opacity: textOpacity,
                }}
            />
        </AbsoluteFill>
    );
};

export { MyVideo as default };