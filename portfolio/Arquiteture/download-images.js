const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const filesToDownload = {
  'hero.jpg': 'File:3D Rendering of Modern Luxury Villa Exterior with Pool.jpg',
  'casa-horizonte.jpg': 'File:Sala Choengmon Pool Villa.jpg',
  'casa-patio.jpg': 'File:Modern living room with stylish furniture and a view of the outdoors in a cozy apartment setting.jpg',
  'casa-mare.jpg': 'File:A Stone House With a Stone Wall.jpg',
  'estudio-luz.jpg': 'File:Angel shadow on dining room wall.jpg',
  'arquiteto-lucas.jpg': 'File:Sumner M. Spaulding 1926 portrait photo.jpg',
  'servicos-dining.jpg': 'File:Restaurant room of Amantaka luxury Resort & Hotel in Luang Prabang Laos.jpg',
  'mat-pedra.jpg': 'File:Veronese masonry.JPG',
  'mat-madeira.jpg': 'File:Weathered wood texture.jpg',
  'mat-tecido.jpg': 'File:Book cover fabric - Flickr - Delany Dean.jpg',
  'mat-vegetacao.jpg': 'File:Sunlight on beech leaves in Gullmarsskogen ravine 2.jpg',
  'contato-patio.jpg': 'File:Courtyard Garden - Moving the olive tree (c60bba73-5d6d-443c-9f0f-9a2bd985c8e2).jpg'
};

function getThumbUrl(title) {
  return new Promise((resolve, reject) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json';
    https.get(url, { headers: { 'User-Agent': 'LumiereArch/1.0 (contact@lumiere.arq.br)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const page = Object.values(json.query.pages)[0];
          const info = page.imageinfo && page.imageinfo[0];
          resolve(info ? (info.thumburl || info.url) : null);
        } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  for (const [filename, title] of Object.entries(filesToDownload)) {
    const thumbUrl = await getThumbUrl(title);
    if (!thumbUrl) {
      console.log('No URL found for', title);
      continue;
    }
    const dest = 'public/images/' + filename;
    process.stdout.write(`Downloading ${filename} from ${thumbUrl.substring(0, 60)}... `);
    try {
      execSync(`curl.exe -A "LumiereArch/1.0 (contact@lumiere.arq.br)" -L "${thumbUrl}" -o "${dest}" --silent`);
      const sz = fs.statSync(dest).size;
      console.log(`OK (${Math.round(sz / 1024)} KB)`);
    } catch (err) {
      console.log('FAILED:', err.message);
    }
  }
  console.log('All downloads processed!');
}

run();
