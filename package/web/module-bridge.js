(() => {
  const pending = new Map();
  let sequence = 0;

  window.addEventListener("message", (event) => {
    if (event.source !== window.parent || !event.data || event.data.channel !== "skaicloud-module-runtime-v1") return;
    const request = pending.get(event.data.requestId);
    if (!request) return;
    pending.delete(event.data.requestId);
    event.data.ok ? request.resolve(event.data.result) : request.reject(new Error(event.data.error || "Module bridge request failed."));
  });

  function request(operation, resource, data = {}) {
    return new Promise((resolve, reject) => {
      const requestId = `marketplace-${Date.now()}-${sequence++}`;
      pending.set(requestId, { resolve, reject });
      window.parent.postMessage({ channel: "skaicloud-module-runtime-v1", requestId, operation, resource, ...data }, "*");
      setTimeout(() => {
        if (!pending.has(requestId)) return;
        pending.delete(requestId);
        reject(new Error("The host runtime did not respond."));
      }, 15000);
    });
  }

  window.SkaiCloudModuleBridge = {
    list: (resource, pageSize = 5000, publicScope = false) => request("data.list", resource, { page: 1, pageSize, ...(publicScope ? { scope: "public" } : {}) }),
    create: (resource, recordKey, data, published) => request("data.create", resource, { recordKey, data, published }),
    update: (resource, recordKey, data, published) => request("data.update", resource, { recordKey, data, published }),
    remove: (resource, recordKey) => request("data.delete", resource, { recordKey }),
    upload: (fileName, mimeType, base64) => request("media.upload", undefined, { fileName, mimeType, base64 }),
  };
})();
