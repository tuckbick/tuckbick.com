export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/privacy") {
      return new Response(
        "This app is a personal tool used only by its owner to let Claude access the owner’s own Google account. No data is shared with third parties.",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Cloudflare",
      });
    }
		return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
