import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { SUCCESS_CLAIM_IMAGE_URL } from '../../lib/constants';
import fetch from 'node-fetch';

const AIRSTACK_API_URL = 'https://app.airstack.xyz/graphql';
const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;

const query = /* GraphQL */ `
  query MyQuery($upFid: String!, $downFid: String!) {
    up: Socials(input: { filter: { userId: { _eq: $upFid } }, blockchain: ethereum }) {
      Social {
        profileName
      }
    }
    down: Socials(input: { filter: { userId: { _eq: $downFid } }, blockchain: ethereum }) {
      Social {
        profileName
      }
    }
  }
`;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { fid } = body?.untrustedData ?? {};
  const upFid = (fid + 1).toString();
  const downFid = (fid - 1).toString();
  const res = await fetch(AIRSTACK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AIRSTACK_API_KEY ?? '',
    },
    body: JSON.stringify({ query, variables: { upFid: '1', downFid: '3' } }),
  });
  const json = await res?.json();
  const data = (json as { data?: any })?.data;
  console.log(res);
  try {
    const up = data?.up?.Social?.[0]?.profileName;
    const down = data?.down?.Social?.[0]?.profileName;
    return new NextResponse(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
              <meta name="fc:frame:button:1" content="@${down}" />
              <meta name="fc:frame:button:1:action" content="link" />
              <meta name="fc:frame:button:1:target" content="https://explorer.airstack.xyz/token-balances?address=fc_fid:${downFid}&rawInput=%23%E2%8E%B1fc_fid:${downFid}%E2%8E%B1%28fc_fid:${fid - 1}++ethereum+null%29&inputType=ADDRESS" />
              <meta name="fc:frame:button:2" content="@${up}" />
              <meta name="fc:frame:button:2:action" content="link" />
              <meta name="fc:frame:button:2:target" content="https://explorer.airstack.xyz/token-balances?address=fc_fid:${upFid}&rawInput=%23%E2%8E%B1fc_fid:${upFid}%E2%8E%B1%28fc_fid:${fid + 1}++ethereum+null%29&inputType=ADDRESS" />
          </head>
        </html>
    `);
  } catch (error) {
    console.error(error);
    return new NextResponse(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://gateway.ipfs.io/ipfs/QmSho42fWi25oBWp5MrrFH9zUGFvnspxVHvcymNJoe3DEZ/output.png" />
              <meta name="fc:frame:button:1" content="Try again?" />
              <meta name="fc:frame:button:1:action" content="post" />
              <meta name="fc:frame:button:1:target" content="https://frame-demo-seven.vercel.app/api/frame" />
          </head>
        </html>
    `);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
