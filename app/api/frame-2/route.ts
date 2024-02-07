import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_IMAGE_URL } from '../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
              <meta name="fc:frame:button:1" content="Try again?" />
              <meta name="fc:frame:post_url" content="https://frame-demo-seven.vercel.app" />
          </head>
        </html>
    `);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
