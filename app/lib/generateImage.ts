import satori from 'satori';
import { html } from 'satori-html';
import puppeteer from 'puppeteer';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { config } from 'dotenv';

config();

const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

const generateImage = async (data: any) => {
  try {
    const { up, down } = data ?? {};
    const template = html(`
  <div style="display: flex; flex-direction: column; height: 100%; width: 100%; background-color: #000; color: #fff; font-size: 32; font-weight: 600; align-items: center; justify-content: center;" >
    <h2>Here's your FC neighbours!</h2>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 100;" >
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
        <img src="${down?.Social?.[0]?.profileImageContentValue?.image?.medium}" width="250px" height="250px" style="object-fit: cover; object-position: 25% 25%;" />
        <p>@${down?.Social?.[0]?.profileName}</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center" >
        <img src="${up?.Social?.[0]?.profileImageContentValue?.image?.medium}" width="250px" height="250px" style="object-fit: cover; object-position: 25% 25%;" />  
        <p>@${up?.Social?.[0]?.profileName}</p>
        </div>
    </div>
    <div style="display: flex;">Powered by<img width="130px" src="https://assets-global.website-files.com/625f12b8c305bac86b872acd/64d0940ab6c6593d16483399_Airstack-logo-RGB%20-%20dark%20mode%20without%20padding.svg" style="margin-left: 12px;" /></div>
  </div>`);

    const robotoMono400 = fetch(
      new URL(
        '../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff',
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer());

    // @ts-ignore
    const svg = await satori(template, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Roboto',
          data: await robotoMono400,
          weight: 400,
          style: 'normal',
        },
      ],
    });

    // @ts-ignore
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport size if necessary
    await page.setViewport({ width: 1200, height: 630 });

    // Set HTML content
    await page.setContent(svg, {
      waitUntil: 'networkidle0', // Wait for all network connections to finish
    });
    const pngBuffer = await page.screenshot();

    await browser.close();
    const upload = await storage.upload(pngBuffer);
    return storage.resolveScheme(upload);
  } catch (e) {
    console.error(e);
  }
};

export default generateImage;
