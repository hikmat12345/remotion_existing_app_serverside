import { Composition } from "remotion"
import MyVideo from "./Collection/Collection"



export const RemotionRoot = () => {

    return (
        <>
            <Composition
                id="CompIdAA"
                component={MyVideo}
                durationInFrames={900}
                fps={30}
                width={1280}
                height={720}
            />
        </>
    )
}