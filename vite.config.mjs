// @cloudflare/vite-plugin
import { whop } from '@whop/cli/vite';

export default {
  plugins: [
    whop({ disableTanstackDevtools: true }),
  ],
};
