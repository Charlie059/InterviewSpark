/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3.

Purpose:
This file handles the transcription of speech to text using AWS Transcribe

*/

import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming'
import MicrophoneStream from 'microphone-stream'
import { StartStreamTranscriptionCommand } from '@aws-sdk/client-transcribe-streaming'
import { Buffer } from 'buffer'
import { Auth } from 'aws-amplify'

const SAMPLE_RATE = 44100
let microphoneStream = undefined
let transcribeClient = undefined
let transcribedText = ''

export const startRecording = async (language, callback) => {
  if (!language) {
    return false
  }
  if (microphoneStream || transcribeClient) {
    stopRecording()
  }

  await createTranscribeClient()
  createMicrophoneStream()
  await startStreaming(language, callback)
}

export const stopRecording = function () {
  if (microphoneStream) {
    microphoneStream.stop()
    microphoneStream = undefined
  }

  if (transcribeClient) {
    transcribeClient = undefined
    transcribedText = ''
  }
}

const createTranscribeClient = async () => {
  try {
    const credentials = await Auth.currentCredentials()
    const region = credentials.identityId.split(':')[0]
    transcribeClient = new TranscribeStreamingClient({
      region: region,
      credentials
    })
  } catch (error) {
    throw new Error(`Error creating Transcribe client: ${error.message}`)
  }
}

const createMicrophoneStream = async () => {
  try {
    microphoneStream = new MicrophoneStream()
    microphoneStream.setStream(
      await window.navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      })
    )
  } catch (error) {
    throw new Error(`Error creating microphone stream: ${error.message}`)
  }
}

const startStreaming = async (language, callback) => {
  if (!transcribeClient) {
    return
  }

  const command = new StartStreamTranscriptionCommand({
    LanguageCode: language,
    MediaEncoding: 'pcm',
    MediaSampleRateHertz: SAMPLE_RATE,
    AudioStream: getAudioStream()
  })

  try {
    const data = await transcribeClient.send(command)

    for await (const event of data.TranscriptResultStream) {
      for (const result of event.TranscriptEvent.Transcript.Results || []) {
        if (result.IsPartial === false) {
          const noOfResults = result.Alternatives[0].Items.length
          for (let i = 0; i < noOfResults; i++) {
            const content = result.Alternatives[0].Items[i].Content
            transcribedText += content + ' '
            callback(transcribedText)
          }
        }
      }
    }
  } catch (error) {
    throw new Error(`Error in transcription: ${error.message}`)
  }
}

const getAudioStream = async function* () {
  for await (const chunk of microphoneStream) {
    if (chunk.length <= SAMPLE_RATE) {
      yield {
        AudioEvent: {
          AudioChunk: encodePCMChunk(chunk)
        }
      }
    }
  }
}

const encodePCMChunk = chunk => {
  const input = MicrophoneStream.toRaw(chunk)
  let offset = 0
  const buffer = new ArrayBuffer(input.length * 2)
  const view = new DataView(buffer)
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }

  return Buffer.from(buffer)
}
