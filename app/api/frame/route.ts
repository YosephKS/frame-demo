import { getFrameAccountAddress, getFrameValidatedMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_IMAGE_URL, SUCCESS_CLAIM_IMAGE_URL } from '../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
