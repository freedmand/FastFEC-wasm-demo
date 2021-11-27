# FastFEC Wasm test

Demo here: https://fastfec.pages.dev/

A proof-of-concept demo of running [FastFEC](https://github.com/washingtonpost/FastFEC) in the browser with WebAssembly (wasm) entirely locally. No data ever leaves your device. This demo only works on Chrome/Edge since it depends on [FileSystemWritableFileStream](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream), which grants access to the user's filesystem.

The compiled wasm library comes from the [releases page](https://github.com/washingtonpost/FastFEC/releases/latest) of FastFEC.

### Time benchmarks

Using massive `1464847.fec` (8.4gb) on an M1 MacBook Air

- 4m 16s (compared to 1m 42s running native binary = ~2.5x slower)

### Running locally

`npx serve` will run the page locally at http://localhost:5000 using the headers defined in `serve.json` (which are necessary for using SharedArrayBuffers to provide atomic file callbacks in the C code).
