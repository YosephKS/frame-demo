import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { INITIAL_IMAGE_URL } from './lib/constants';

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: 'Fetch Your Onchain Data', action: 'post' },
    { label: 'Go to Airstack Explorer', action: 'post_redirect' },
  ],
  image: INITIAL_IMAGE_URL,
  post_url: 'https://frame-demo-seven.vercel.app/api/frame',
  input: {
    text: 'Type your Farcaster fname here!',
  },
});

export const metadata: Metadata = {
  title: 'Airstack Frames',
  description: 'Testing new Airstack Frames here',
  openGraph: {
    title: 'Airstack Frames',
    description: 'Testing new Airstack Frames here',
    images: INITIAL_IMAGE_URL,
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Airstack Frames</h1>
    </>
  );
}
