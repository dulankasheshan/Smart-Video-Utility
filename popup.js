document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');

    // Load saved state (Default to TRUE if not set)
    chrome.storage.local.get('isEnabled', (data) => {
        toggle.checked = (data.isEnabled !== false);
    });

    // Save state when switched
    toggle.addEventListener('change', () => {
        chrome.storage.local.set({ 'isEnabled': toggle.checked });
    });
});