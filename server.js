
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"
import { bundle } from '@remotion/bundler';
import { getCompositions, renderFrames, stitchFramesToVideo } from '@remotion/renderer';
const app = express()

const PORT = process.env.PORT || 3000;

app.get('/render/:comositionId', async (req, res) => {

    try {
        const requests = req.params
        const comositionId = requests.comositionId;
        console.log('rendering')



        const fileName = fileURLToPath(import.meta.url)
        const dirName = path.dirname(fileName)
        const srcPath = path.join(dirName, './src/remotion/index.js')

        if (!fs.existsSync(srcPath)) {
            return res.status(404).json({
                error: "Source file is not found.",
            })
        }

        const bundleLocation = await bundle(srcPath);
        console.log('bundeled')
        const comps = await getCompositions(bundleLocation, {
            inputProps: { custom: 'data' }
        })

        const compostion = comps.find((c) => c.id === comositionId);
        console.log(comositionId, compostion)
        if (!compostion) {
            return res.status(404).json({
                error: "Compostion " + comositionId + " not found.",
            })
        }

        const timeStamp = Date.now();
        const outputDir = path.join(dirName, 'output', `render-${timeStamp}`);
        const framesDir = path.join(outputDir, 'frames');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {
                recursive: true
            })
        }

        if (!fs.existsSync(framesDir)) {
            fs.mkdirSync(framesDir, { recursive: true })
        }

        const { assetsInfo } = await renderFrames({
            composition: compostion,
            serveUrl: bundleLocation,
            onStart: () => console.log('Rendering Frames .....'),
            onFrameUpdate: (f) => {
                if (f % 10 === 0) {
                    console.log(`Rending frame ${f}/${compostion?.durationInFrames}`)
                }
            },
            parallelism: null,
            outputDir: framesDir,
            imageFormat: 'jpeg'
        })

        const videoFileName = `${comositionId}-${timeStamp}.mp4`
        const videoOutputPath = path.join(outputDir, videoFileName)
        await stitchFramesToVideo({
            dir: framesDir,
            force: true,
            fps: compostion.fps,
            height: compostion.height,
            width: compostion.width,
            imageFormat: "jpeg",

            pixelFormat: "yuv420p",
            assetsInfo,
            webpackBundle: bundleLocation,
            onProgress: (f) => {
                if (f % 10 === 0) {
                    console.log(`Stitching progress ${f}/${compostion?.durationInFrames}`)
                }
            },
            outputLocation: videoOutputPath
        })

        res.json({
            message: 'video is generated',
            outputResult: videoOutputPath
        })

    } catch (error) {
        console.log(error, ':error')
    }
})

app.listen(PORT, () => {
    console.log(' Remotion API server is running')
})
