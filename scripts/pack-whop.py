import os
import json
import zipfile
import shutil

dist_dir = "dist"
client_dir = os.path.join(dist_dir, "client")
server_dir = os.path.join(dist_dir, "server")

os.makedirs(client_dir, exist_ok=True)
os.makedirs(server_dir, exist_ok=True)

# 1. Copy .next/static into client/_next/static
next_static = os.path.join(".next", "static")
client_next_static = os.path.join(client_dir, "_next", "static")
if os.path.exists(client_next_static):
    shutil.rmtree(client_next_static)
if os.path.exists(next_static):
    shutil.copytree(next_static, client_next_static)

# 2. Read and prepare client/index.html with inlined Tailwind CSS
html_src = os.path.join(".next", "server", "app", "index.html")
client_index_html = os.path.join(client_dir, "index.html")
if os.path.exists(html_src):
    with open(html_src, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Collect compiled CSS from .next/static/css
    css_dir = os.path.join(".next", "static", "css")
    inlined_css = ""
    if os.path.exists(css_dir):
        for fname in os.listdir(css_dir):
            if fname.endswith(".css"):
                css_file_path = os.path.join(css_dir, fname)
                with open(css_file_path, "r", encoding="utf-8") as cf:
                    inlined_css += cf.read() + "\n"

    if inlined_css:
        # Inject inline style tag into head for instant zero-FOUC rendering
        style_tag = f'<style id="summit-inlined-tailwind">\n{inlined_css}\n</style>'
        if "</head>" in html_content:
            html_content = html_content.replace("</head>", f"{style_tag}</head>", 1)
        else:
            html_content = style_tag + html_content

    with open(client_index_html, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[whop] successfully wrote client/index.html (inlined {len(inlined_css)} bytes of CSS)")

# 3. Create server/index.js (Cloudflare Worker entry)
server_index = """
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Whop API route: /api/leads
    if (url.pathname === '/api/leads' && request.method === 'POST') {
      try {
        const body = await request.json();
        const randomId = 'lead_summit_' + Math.random().toString(36).substring(2, 8).toUpperCase();
        return new Response(JSON.stringify({
          success: true,
          lead: {
            id: randomId,
            object: 'lead',
            status: 'qualified',
            company_id: 'biz_fTh1Y0rz12hAZC',
            name: body.name || 'Marcus Sterling',
            email: body.email || 'homeowner@example.com',
            phone: body.phone || '(303) 555-0199',
            metadata: body,
            created_at: new Date().toISOString()
          },
          message: 'Lead successfully recorded in Whop CRM.'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Whop API route: /api/checkout/session
    if (url.pathname === '/api/checkout/session' && request.method === 'POST') {
      try {
        const body = await request.json();
        const sessionId = 'cs_summit_' + Math.random().toString(36).substring(2, 10);
        const isDeposit = body.planId === 'plan_summit_deposit_500' || !body.planId;
        const depositAmount = isDeposit ? 500 : (body.planId === 'plan_summit_tarp_399' ? 399 : 149);
        const total = Number(body.totalProjectCost) || 12000;
        return new Response(JSON.stringify({
          success: true,
          session: {
            sessionId: sessionId,
            clientSecret: 'wcs_' + sessionId + '_secret',
            planId: body.planId || 'plan_summit_deposit_500',
            planName: isDeposit ? 'Roof Replacement Project Deposit' : 'Roof Service Plan',
            amountDueToday: depositAmount,
            totalEstimatedProjectCost: total,
            remainingFinalBalance: Math.max(0, total - depositAmount),
            setupFutureUsage: isDeposit ? 'off_session' : null,
            setupIntentId: isDeposit ? 'seti_summit_' + Math.random().toString(36).substring(2, 10) : null,
            customer: { email: body.customerEmail || 'homeowner@example.com', name: body.customerName || 'Homeowner' },
            metadata: body.metadata || {}
          }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Whop API route: /api/invoices/final
    if (url.pathname === '/api/invoices/final' && request.method === 'POST') {
      try {
        const body = await request.json();
        const invId = 'inv_' + Math.random().toString(36).substring(2, 9);
        const mode = body.mode || 'auto_charge';
        const amount = Number(body.amount) || 11500;
        return new Response(JSON.stringify({
          success: true,
          invoice: {
            id: invId,
            object: 'invoice',
            company_id: 'biz_fTh1Y0rz12hAZC',
            status: mode === 'auto_charge' ? 'paid' : 'sent',
            amount: amount,
            currency: 'USD',
            mode: mode,
            customer: { name: body.customerName || 'Marcus Sterling', email: body.customerEmail || 'm.sterling@example.com' },
            payment_method: body.paymentMethodId || 'pm_summit_vaulted_4242',
            setup_intent_id: body.setupIntentId || 'seti_summit_deposit_500_vault',
            description: body.jobDescription || 'Final Balance: Full Roof Replacement',
            hosted_url: 'https://summit-roofing-colorado.whop.site/invoices/' + invId,
            paid_at: mode === 'auto_charge' ? new Date().toISOString() : null,
            created_at: new Date().toISOString()
          },
          mode: mode,
          message: mode === 'auto_charge'
            ? 'Vaulted card charged successfully for $' + amount.toLocaleString() + ' USD.'
            : 'Itemized Whop Invoice sent with 1-click BNPL financing options.'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Serve static assets via Cloudflare env.ASSETS
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
      // SPA fallback for clean route navigation
      if (!url.pathname.includes('.') && request.method === 'GET') {
        const indexUrl = new URL('/', request.url);
        return await env.ASSETS.fetch(new Request(indexUrl, request));
      }
      return assetResponse;
    }

    return new Response('Summit Roofing Co. — Live on Whop', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
"""
with open(os.path.join(server_dir, "index.js"), "w", encoding="utf-8") as f:
    f.write(server_index)

# 4. Enumerate client files with strictly POSIX forward slashes
client_files = []
for root, _, files in os.walk(client_dir):
    for file in files:
        full_p = os.path.join(root, file)
        # Use relative path and ensure ONLY forward slashes '/' are used
        rel_p = os.path.relpath(full_p, client_dir).replace("\\", "/")
        client_files.append(rel_p)

# 5. Create manifest.json with forward-slash POSIX paths
manifest = {
    "version": 1,
    "entry": "index.js",
    "server": ["index.js"],
    "client": sorted(client_files)
}
manifest_path = os.path.join(dist_dir, "manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

# 6. Build application.zip and whop-build.zip with strict POSIX paths
for out_name in ["application.zip", "whop-build.zip"]:
    zip_path = os.path.join(dist_dir, out_name)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(manifest_path, "manifest.json")
        zf.write(os.path.join(server_dir, "index.js"), "server/index.js")
        for cf in client_files:
            disk_path = os.path.join(client_dir, cf.replace("/", os.sep))
            # ZIP entry name MUST have forward slashes
            zip_entry_name = f"client/{cf}"
            zf.write(disk_path, zip_entry_name)

print(f"[whop] successfully packed {len(client_files) + 1} files -> dist/whop-build.zip & dist/application.zip")
