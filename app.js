// Mock Data Generator
const mockParts = [
  { id: "PART-1001", status: "In Stock", qty: 450, alert: false },
  { id: "PART-1002", status: "Low Stock", qty: 12, alert: true },
  { id: "PART-1003", status: "Out of Stock", qty: 0, alert: true },
  { id: "PART-1004", status: "In Stock", qty: 1200, alert: false }
];

// DOM Elements
const partInput = document.getElementById('part-input');
const checkBtn = document.getElementById('check-btn');
const demoBtn = document.getElementById('demo-btn');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const resultsTable = document.getElementById('results-table');
const tableBody = document.getElementById('table-body');
const summaryBadge = document.getElementById('summary-badge');

// Load Mock Batch Click Handler
demoBtn.addEventListener('click', () => {
  partInput.value = "PART-1001, PART-1002, PART-1003, PART-1004";
});

// Run Verification (Simulating API Request with UX Feedback)
checkBtn.addEventListener('click', () => {
  const query = partInput.value.trim();

  // UX Error Prevention: Validate input before triggering action
  if (!query) {
    alert("UX Note: Preventing empty API calls. Please enter at least one part number!");
    return;
  }

  // UX State Management: Hide empty state, show loading spinner
  emptyState.classList.add('hidden');
  resultsTable.classList.add('hidden');
  loadingState.classList.remove('hidden');

  const delay = parseInt(document.getElementById('speed').value);

  setTimeout(() => {
    loadingState.classList.add('hidden');
    resultsTable.classList.remove('hidden');
    renderResults();
  }, delay);
});

function renderResults() {
  tableBody.innerHTML = '';
  
  mockParts.forEach(part => {
    const row = document.createElement('tr');
    row.className = "hover:bg-slate-700/30 transition-colors";

    // UX Visual Hierarchy: Color-coded badges for fast scanning
    let badgeClass = "";
    if (part.status === "In Stock") {
      badgeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    } else if (part.status === "Low Stock") {
      badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    } else {
      badgeClass = "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }

    row.innerHTML = `
      <td class="p-3 font-mono text-xs text-indigo-300">${part.id}</td>
      <td class="p-3">
        <span class="text-xs px-2.5 py-1 rounded-full border ${badgeClass} font-medium">
          ${part.status}
        </span>
      </td>
      <td class="p-3 font-semibold">${part.qty} units</td>
      <td class="p-3">
        <button onclick="copyToClipboard('${part.id}')" class="text-xs text-slate-400 hover:text-white underline">
          Copy ID
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  summaryBadge.textContent = `${mockParts.length} Items Analyzed`;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  // UX Feedback: Toast notification
  alert(`Copied ${text} to clipboard! (Feedback to user that action succeeded)`);
}
