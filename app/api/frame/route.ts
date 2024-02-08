import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { SUCCESS_CLAIM_IMAGE_URL } from '../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { fid } = body?.untrustedData ?? {};
  return new NextResponse(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
              <meta name="fc:frame:button:1" content="${fid - 1}" />
              <meta name="fc:frame:button:1:action" content="link" />
              <meta name="fc:frame:button:1:target" content="https://explorer.airstack.xyz/token-balances?address=fc_fid:${fid - 1}&rawInput=%23%E2%8E%B1fc_fid:${fid - 1}%E2%8E%B1%28fc_fid:${fid - 1}++ethereum+null%29&inputType=ADDRESS" />
              <meta name="fc:frame:button:2" content="${fid + 1}" />
              <meta name="fc:frame:button:2:action" content="link" />
              <meta name="fc:frame:button:2:target" content="https://explorer.airstack.xyz/token-balances?address=fc_fid:${fid + 1}&rawInput=%23%E2%8E%B1fc_fid:${fid + 1}%E2%8E%B1%28fc_fid:${fid + 1}++ethereum+null%29&inputType=ADDRESS" />
          </head>
        </html>
    `);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
