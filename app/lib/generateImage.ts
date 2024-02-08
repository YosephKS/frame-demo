import { readFile } from 'fs/promises';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { config } from 'dotenv';

config();

const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

const generateImage = async (data: any) => {
  const { up, down } = data ?? {};
  const template = html(`
  <div style="display: flex; flex-direction: column; height: 100%; width: 100%; background-color: #000; color: #fff; font-size: 32; font-weight: 600; align-items: center; justify-content: center;" >
    <h2>Here's your FC neighbours!</h2>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 100;" >
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
        <img src="${down?.Social?.[0]?.profileImage}" style="width: 250px; height: 250px; object-fit: cover; object-position: 25% 25%;" />
        <p>@${down?.Social?.[0]?.profileName}</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center" >
        <img src="${up?.Social?.[0]?.profileImage}" style="width: 250px; height: 250px; object-fit: cover; object-position: 25% 25%;" />  
        <p>@${up?.Social?.[0]?.profileName}</p>
        </div>
    </div>
    <div style="display: flex;">Powered by<img width="130px" src="https://assets-global.website-files.com/625f12b8c305bac86b872acd/64d0940ab6c6593d16483399_Airstack-logo-RGB%20-%20dark%20mode%20without%20padding.svg" style="margin-left: 12px;" /></div>
  </div>`);
  // @ts-ignore
  const svg = await satori(template, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Roboto',
        data: await readFile('./Roboto/Roboto-Black.ttf'),
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg, {
    background: 'rgba(238, 235, 230, .9)',
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return pngBuffer;
};

export default generateImage;
