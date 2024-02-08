import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { INITIAL_IMAGE_URL } from './lib/constants';

const frameMetadata = getFrameMetadata({
  buttons: [{ label: 'Find your FC neighbours!', action: 'post' }],
  image: INITIAL_IMAGE_URL,
  post_url: 'https://frame-demo-seven.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Airstack Frames',
  description: 'Testing new Airstack Frames here',
  openGraph: {
    title: 'Airstack Frames',
    description: 'Testing new Airstack Frames here',
    images:
      'https://gateway.ipfs.io/ipfs/QmSho42fWi25oBWp5MrrFH9zUGFvnspxVHvcymNJoe3DEZ/output.png',
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
