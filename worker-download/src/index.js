export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\/api\/download\//, "");

    const obj = await env.MY_BUCKET.get(key);
    if (!obj) {
      return new Response("File not found", { status: 404 });
    }

    // 删除文件（异步）
    ctx.waitUntil(env.MY_BUCKET.delete(key));

    return new Response(obj.body, {
      headers: {
        "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
        "Content-Disposition": attachment; filename="${key}",
      },
    });
  },
};
