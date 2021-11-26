self.onmessage = async function (e) {
  const { type } = e.data;
  if (type == "done") {
    await done();
  } else {
    await write(
      e.data.directory,
      e.data.sharedBufferArray,
      e.data.filename,
      e.data.contents,
      e.data.newValue
    );
  }
};

let writables = {};

async function write(
  directory,
  sharedBufferArray,
  filename,
  contents,
  newValue
) {
  let writable = writables[filename];
  if (writable == null) {
    const handle = await directory.getFileHandle(filename, {
      create: true,
    });
    writable = await handle.createWritable();
    writables[filename] = writable;
  }
  await writable.write(contents);
  // Trigger atomic update
  Atomics.store(sharedBufferArray, 0, newValue);
  Atomics.notify(sharedBufferArray, 0, 1);
}

async function done() {
  const files = Object.values(writables);
  for (let i = 0; i < files.length; i++) {
    await files[i].close();
  }
  self.postMessage({ type: "done" });
}
