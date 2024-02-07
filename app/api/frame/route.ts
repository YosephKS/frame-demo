import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { SUCCESS_CLAIM_IMAGE_URL } from '../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { buttonIndex, inputText, fid } = body?.untrustedData ?? {};
  switch (buttonIndex) {
    case 1:
      return new NextResponse(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
              <meta name="fc:frame:button:1" content="${inputText} ${fid}" />
          </head>
        </html>
    `);
    case 2:
    default:
      return NextResponse.redirect(
        `https://explorer.airstack.xyz/onchain-graph?identity=fc_fid:${fid}`,
        { status: 302 },
      );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
