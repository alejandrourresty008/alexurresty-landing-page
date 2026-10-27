// Worker de Cloudflare delante de la web estática (out/).
// Una sola dirección oficial para Google: https://alexurresty.com
// www.alexurresty.com y http:// redirigen ahí con 301 (permanente); todo lo demás se sirve tal cual.
const CANONICAL = 'alexurresty.com';

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === `www.${CANONICAL}` || (url.hostname === CANONICAL && url.protocol === 'http:')) {
      url.hostname = CANONICAL;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};

export default worker;
