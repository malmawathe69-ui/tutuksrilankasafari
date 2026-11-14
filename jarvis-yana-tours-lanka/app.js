/* JARVIS AI — Yana Tours Lanka
 * Free static app. No API keys. Lead records stay in browser localStorage.
 * Add your verified WhatsApp number below in international digits, no + or spaces.
 */
const CONFIG = {
  website: "https://www.yanatourslanka.com/",
  whatsappNumber: "" // Example: "94771234567" — replace with your real business number.
};
const STORAGE_KEY = "yanaJarvisLeads_v1";
let leads = loadLeads();
let selectedLeadId = null;
const $ = (id) => document.getElementById(id);

function loadLeads() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveLeads() { localStorage.setItem(STORAGE_KEY, JSON.stringify(leads)); render(); }
function toast(message) {
  const el = $("toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function score(intent) { return ({hot:90,warm:60,early:25})[intent] || 0; }
function render() {
  $("statLeads").textContent = leads.length;
  $("statHot").textContent = leads.filter(x => x.intent === "hot").length;
  $("statApproved").textContent = leads.filter(x => x.status === "approved").length;
  const q = $("leadFilter").value.trim().toLowerCase();
  const filtered = leads.filter(x => [x.need,x.country,x.platform,x.url,x.travelDate].join(" ").toLowerCase().includes(q));
  $("leadRows").innerHTML = filtered.length ? filtered.map(x => `
    <tr>
      <td><strong>${escapeHtml(x.need)}</strong><small>${x.url ? `<a href="${escapeHtml(x.url)}" target="_blank" rel="noopener">Open public post ↗</a>` : "No post URL"}</small></td>
      <td>${escapeHtml(x.country || "—")}<br><small>${escapeHtml(x.platform)}</small></td>
      <td><span class="intent intent-${escapeHtml(x.intent)}">${escapeHtml(x.intent.toUpperCase())} · ${score(x.intent)}</span></td>
      <td><span class="stage stage-${escapeHtml(x.status)}">${escapeHtml(x.status.toUpperCase())}</span></td>
      <td>${escapeHtml(x.added)}</td>
      <td><div class="row-actions"><button class="mini-btn" data-action="select" data-id="${x.id}">Reply</button><button class="mini-btn" data-action="status" data-id="${x.id}">Status</button><button class="mini-btn" data-action="delete" data-id="${x.id}">×</button></div></td>
    </tr>`).join("") : '<tr><td colspan="6" class="empty-state">No matching leads. Search for a conversation or add a lead above.</td></tr>';
  if (CONFIG.whatsappNumber) $("whatsappLink").href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Yana Tours Lanka, I would like to plan a Sri Lanka trip.")}`;
}
function addLead(data) {
  leads.unshift({id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), ...data, status:"new", added:new Date().toLocaleDateString()});
  saveLeads(); toast("Lead saved on this device.");
}
$("leadForm").addEventListener("submit", e => {
  e.preventDefault();
  const url = $("leadUrl").value.trim();
  try { const parsed = new URL(url); if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported URL scheme"); } catch { toast("Please enter a valid http or https post URL."); return; }
  addLead({url, need:$("leadNeed").value.trim(), country:$("leadCountry").value.trim(), travelDate:$("leadDate").value.trim(), intent:$("leadIntent").value, platform:$("leadSource").value});
  e.target.reset();
});
$("leadRows").addEventListener("click", e => {
  const btn = e.target.closest("button[data-action]"); if (!btn) return;
  const lead = leads.find(x => x.id === btn.dataset.id); if (!lead) return;
  if (btn.dataset.action === "delete") {
    if (confirm("Delete this lead from this browser?")) { leads = leads.filter(x => x.id !== lead.id); if (selectedLeadId === lead.id) selectedLeadId = null; saveLeads(); toast("Lead deleted."); }
  } else if (btn.dataset.action === "status") {
    const states = ["new","approved","contacted","booked"];
    lead.status = states[(states.indexOf(lead.status) + 1) % states.length]; saveLeads(); toast("Status: " + lead.status);
  } else {
    selectedLeadId = lead.id; $("replyText").value = makeReply(lead); $("replyText").focus(); toast("Reply draft prepared for review.");
  }
});
function makeReply(lead) {
  const name = lead.country ? "travellers from " + lead.country : "travellers";
  const need = lead.need ? "I saw your post about " + lead.need.toLowerCase() + "." : "I saw you are planning a Sri Lanka trip.";
  return `Hello! ${need} If you are still planning, Yana Tours Lanka is a local Kandy-based team offering private transport and tailor-made Sri Lanka tours with experienced drivers. We would be happy to help you plan a route and provide a clear quotation based on your dates and group size. You can see our services here: ${CONFIG.website}\n\nNo pressure at all — wishing you a wonderful trip to Sri Lanka!\nYana Tours Lanka`;
}
$("draftBtn").addEventListener("click", () => {
  const lead = leads.find(x => x.id === selectedLeadId);
  if (!lead) { toast("Choose Reply on a lead first."); return; }
  $("replyText").value = makeReply(lead);
});
$("copyBtn").addEventListener("click", async () => {
  const text = $("replyText").value.trim(); if (!text) { toast("There is no reply to copy."); return; }
  try { await navigator.clipboard.writeText(text); toast("Reply copied. Review before sending."); }
  catch { $("replyText").select(); toast("Select and copy the reply manually."); }
});
$("leadFilter").addEventListener("input", render);
$("searchBtn").addEventListener("click", () => {
  const topic = $("searchTopic").value;
  const platform = $("searchPlatform").value;
  const q = encodeURIComponent(topic + " after:" + new Date().getFullYear() + "-01-01");
  const urls = {
    all: [
      "https://www.google.com/search?q=" + encodeURIComponent(topic + " Sri Lanka travel"),
      "https://www.google.com/search?q=" + encodeURIComponent("site:reddit.com " + topic),
      "https://www.google.com/search?q=" + encodeURIComponent("site:tripadvisor.com " + topic)
    ],
    reddit:["https://www.reddit.com/search/?q="+encodeURIComponent(topic)],
    facebook:["https://www.google.com/search?q="+encodeURIComponent("site:facebook.com "+topic)],
    instagram:["https://www.google.com/search?q="+encodeURIComponent("site:instagram.com "+topic)],
    threads:["https://www.google.com/search?q="+encodeURIComponent("site:threads.net "+topic)],
    x:["https://x.com/search?q="+q],
    tripadvisor:["https://www.google.com/search?q="+encodeURIComponent("site:tripadvisor.com "+topic)],
    web:["https://www.google.com/search?q="+encodeURIComponent(topic+" Sri Lanka")]
  };
  (urls[platform] || urls.all).forEach(url => window.open(url, "_blank", "noopener"));
  toast("Search tabs opened. Review public posts and save qualified leads.");
});
$("exportBtn").addEventListener("click", () => {
  if (!leads.length) { toast("No leads to export yet."); return; }
  const cols = ["need","country","travelDate","platform","intent","status","url","added"];
  const csv = [cols.join(","), ...leads.map(x => cols.map(k => '"' + String(x[k] ?? "").replace(/"/g,'""') + '"').join(","))].join("\n");
  const blob = new Blob(["\ufeff"+csv], {type:"text/csv;charset=utf-8;"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "yana-jarvis-leads.csv"; a.click(); URL.revokeObjectURL(a.href);
  toast("Lead CSV exported.");
});
const trackingUrl = CONFIG.website + "?utm_source=jarvis&utm_medium=organic&utm_campaign=lead_research";
$("trackingUrl").textContent = trackingUrl;
$("copyLinkBtn").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(trackingUrl); toast("Tracking link copied."); }
  catch { toast("Copy the link shown above."); }
});
render();
