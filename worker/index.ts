// Static assets (including `/` → index.html) are served directly by Cloudflare.
// Any request that doesn't match an asset reaches this Worker: /privacy is
// served here, and everything else is rejected.
export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/privacy") {
      return new Response(
        "This app is a personal tool used only by its owner to let Claude access the owner's own Google account. No data is shared with third parties.",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
} satisfies ExportedHandler<Env>;
