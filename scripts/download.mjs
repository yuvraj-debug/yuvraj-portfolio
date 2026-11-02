import fs from 'fs';
import path from 'path';
import https from 'https';

const baseUrl = 'https://www.duingzforge.site/kit/portfolio';

const files = [
  // Data
  { url: `${baseUrl}/Asset/data/projects.json`, dest: 'src/data/projects.json' },
  { url: `${baseUrl}/Asset/data/brands.json`, dest: 'src/data/brands.json' },

  // Assets
  { url: `${baseUrl}/Asset/cv/Renando_Editor_VFX.pdf.pdf`, dest: 'Asset/cv/Renando_Editor_VFX.pdf.pdf' },
  { url: `${baseUrl}/Asset/img/SERTIFIKAT/dalang.jpg`, dest: 'Asset/img/SERTIFIKAT/dalang.jpg' },
  { url: `${baseUrl}/Asset/img/SERTIFIKAT/juara2.jpg`, dest: 'Asset/img/SERTIFIKAT/juara2.jpg' },
  { url: `${baseUrl}/Asset/img/SERTIFIKAT/mindplace2.jpg`, dest: 'Asset/img/SERTIFIKAT/mindplace2.jpg' },
  { url: `${baseUrl}/Asset/img/SERTIFIKAT/peringkat2.jpg`, dest: 'Asset/img/SERTIFIKAT/peringkat2.jpg' },
  { url: `${baseUrl}/Asset/img/SERTIFIKAT/shortmovie.jpeg`, dest: 'Asset/img/SERTIFIKAT/shortmovie.jpeg' },
  { url: `${baseUrl}/Asset/img/SERTIFIKAT/videolabs.jpg`, dest: 'Asset/img/SERTIFIKAT/videolabs.jpg' },
  { url: `${baseUrl}/Asset/img/favicon.svg`, dest: 'Asset/img/favicon.svg' },
  { url: `${baseUrl}/Asset/img/gwe.jpeg`, dest: 'Asset/img/gwe.jpeg' },
  { url: `${baseUrl}/Asset/img/renando-portrait.png`, dest: 'Asset/img/renando-portrait.png' },
  { url: `${baseUrl}/Asset/svg/CUI.svg`, dest: 'Asset/svg/CUI.svg' },
  { url: `${baseUrl}/Asset/svg/EBS.svg`, dest: 'Asset/svg/EBS.svg' },
  { url: `${baseUrl}/Asset/svg/EG.svg`, dest: 'Asset/svg/EG.svg' },
  { url: `${baseUrl}/Asset/svg/PF.svg`, dest: 'Asset/svg/PF.svg' },
  { url: `${baseUrl}/Asset/svg/SB.svg`, dest: 'Asset/svg/SB.svg' },
  { url: `${baseUrl}/Asset/svg/SD.svg`, dest: 'Asset/svg/SD.svg' },
  { url: `${baseUrl}/Asset/svg/UE.svg`, dest: 'Asset/svg/UE.svg' },
  { url: `${baseUrl}/Asset/svg/ae.svg`, dest: 'Asset/svg/ae.svg' },
  { url: `${baseUrl}/Asset/svg/ai.svg`, dest: 'Asset/svg/ai.svg' },
  { url: `${baseUrl}/Asset/svg/am.svg`, dest: 'Asset/svg/am.svg' },
  { url: `${baseUrl}/Asset/svg/bl.svg`, dest: 'Asset/svg/bl.svg' },
  { url: `${baseUrl}/Asset/svg/brand/Extrajoss.png`, dest: 'Asset/svg/brand/Extrajoss.png' },
  { url: `${baseUrl}/Asset/svg/brand/Netflix.svg`, dest: 'Asset/svg/brand/Netflix.svg' },
  { url: `${baseUrl}/Asset/svg/brand/SevenDragon.png`, dest: 'Asset/svg/brand/SevenDragon.png' },
  { url: `${baseUrl}/Asset/svg/brand/Whatsin.png`, dest: 'Asset/svg/brand/Whatsin.png' },
  { url: `${baseUrl}/Asset/svg/brand/diskominfo.png`, dest: 'Asset/svg/brand/diskominfo.png' },
  { url: `${baseUrl}/Asset/svg/brand/dpmptsp.png`, dest: 'Asset/svg/brand/dpmptsp.png' },
  { url: `${baseUrl}/Asset/svg/brand/hara.png`, dest: 'Asset/svg/brand/hara.png' },
  { url: `${baseUrl}/Asset/svg/brand/jeta.png`, dest: 'Asset/svg/brand/jeta.png' },
  { url: `${baseUrl}/Asset/svg/brand/logogatsu.png`, dest: 'Asset/svg/brand/logogatsu.png' },
  { url: `${baseUrl}/Asset/svg/brand/magma.png`, dest: 'Asset/svg/brand/magma.png' },
  { url: `${baseUrl}/Asset/svg/brand/mbc.png`, dest: 'Asset/svg/brand/mbc.png' },
  { url: `${baseUrl}/Asset/svg/brand/pemda.png`, dest: 'Asset/svg/brand/pemda.png' },
  { url: `${baseUrl}/Asset/svg/brand/raincreation.png`, dest: 'Asset/svg/brand/raincreation.png' },
  { url: `${baseUrl}/Asset/svg/brand/seven.png`, dest: 'Asset/svg/brand/seven.png' },
  { url: `${baseUrl}/Asset/svg/brand/sma1seragen.png`, dest: 'Asset/svg/brand/sma1seragen.png' },
  { url: `${baseUrl}/Asset/svg/brand/sma2indramayu.png`, dest: 'Asset/svg/brand/sma2indramayu.png' },
  { url: `${baseUrl}/Asset/svg/brand/unwir.png`, dest: 'Asset/svg/brand/unwir.png' },
  { url: `${baseUrl}/Asset/svg/brand/vianos.png`, dest: 'Asset/svg/brand/vianos.png' },
  { url: `${baseUrl}/Asset/svg/cc.svg`, dest: 'Asset/svg/cc.svg' },
  { url: `${baseUrl}/Asset/svg/cv.svg`, dest: 'Asset/svg/cv.svg' },
  { url: `${baseUrl}/Asset/svg/cx.svg`, dest: 'Asset/svg/cx.svg' },
  { url: `${baseUrl}/Asset/svg/ibis.svg`, dest: 'Asset/svg/ibis.svg' },
  { url: `${baseUrl}/Asset/svg/is.svg`, dest: 'Asset/svg/is.svg' },
  { url: `${baseUrl}/Asset/svg/km.svg`, dest: 'Asset/svg/km.svg' },
  { url: `${baseUrl}/Asset/svg/lr.svg`, dest: 'Asset/svg/lr.svg' },
  { url: `${baseUrl}/Asset/svg/lrc.svg`, dest: 'Asset/svg/lrc.svg' },
  { url: `${baseUrl}/Asset/svg/pa.svg`, dest: 'Asset/svg/pa.svg' },
  { url: `${baseUrl}/Asset/svg/pl.svg`, dest: 'Asset/svg/pl.svg' },
  { url: `${baseUrl}/Asset/svg/pr.svg`, dest: 'Asset/svg/pr.svg' },
  { url: `${baseUrl}/Asset/svg/ps.svg`, dest: 'Asset/svg/ps.svg' },
  { url: `${baseUrl}/Asset/svg/vn.svg`, dest: 'Asset/svg/vn.svg' },
  { url: `${baseUrl}/Asset/svg/vs.svg`, dest: 'Asset/svg/vs.svg' },
  { url: `${baseUrl}/Asset/svg/vsco.svg`, dest: 'Asset/svg/vsco.svg' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const req = https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          const stats = fs.statSync(dest);
          resolve({ dest, size: stats.size });
        });
      });
      fileStream.on('error', err => {
        fs.unlink(dest, () => reject(err));
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function main() {
  console.log(`Starting download of ${files.length} files...`);
  let successCount = 0;
  let failCount = 0;
  const errors = [];

  // Download with concurrency limit of 5
  const queue = [...files];
  const workers = Array(5).fill(null).map(async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      try {
        let attempts = 3;
        let lastErr;
        let done = false;
        while (attempts > 0 && !done) {
          try {
            const res = await downloadFile(item.url, item.dest);
            console.log(`[OK] ${item.dest} (${res.size} bytes)`);
            successCount++;
            done = true;
          } catch (err) {
            lastErr = err;
            attempts--;
            if (attempts > 0) await new Promise(r => setTimeout(r, 1000));
          }
        }
        if (!done) {
          console.error(`[FAIL] ${item.dest}: ${lastErr.message}`);
          failCount++;
          errors.push({ file: item.dest, error: lastErr.message });
        }
      } catch (err) {
        console.error(`[ERROR] ${item.dest}: ${err.message}`);
        failCount++;
        errors.push({ file: item.dest, error: err.message });
      }
    }
  });

  await Promise.all(workers);
  console.log(`\nFinished: ${successCount} succeeded, ${failCount} failed.`);
  if (errors.length > 0) {
    console.log('Failed files:', errors);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
