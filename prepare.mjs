import {writeFile, existsSync} from 'node:fs';

const files = {
    "libv86.js": "https://github.com/copy/v86/releases/download/latest/libv86.js",
    "libv86-debug.js": "https://github.com/copy/v86/releases/download/latest/libv86-debug.js",

    "v86.wasm": "https://github.com/copy/v86/releases/download/latest/v86.wasm",
    "v86-debug.wasm": "https://github.com/copy/v86/releases/download/latest/v86-debug.wasm",
    "v86-fallback.wasm": "https://github.com/copy/v86/releases/download/latest/v86-fallback.wasm",

    "seabios.bin": "https://raw.githubusercontent.com/copy/v86/master/bios/seabios.bin",
    "libwabt.js": "https://raw.githubusercontent.com/WebAssembly/wabt/main/docs/demo/libwabt.js",
    "capstone-x86.min.js": "https://github.com/AlexAltea/capstone.js/releases/download/v3.0.5-rc1/capstone-x86.min.js"
};

await Promise.all(Object.entries(files).map(async ([name, url]) => {
    if (existsSync(name)) return false;
    let res = await fetch(url);
    let data = await res.arrayBuffer();
    await new Promise((res, rej) => {
        writeFile(name, Buffer.from(data), (err) => {
            if (err) rej(err);
            else res();
        });
    });
}));

console.log("Done!");
