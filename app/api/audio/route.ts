import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const { prompt  } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await replicate.run(
      "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
      {
        input: {
          prompt,
        }
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log('[AUDIO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
