/**
 * Smart Video Utility - Content Script
 * This script monitors the video player and streamlines playback.
 */

const optimizePlayback = () => {
    // Locate the video element on the page
    const video = document.querySelector('video');
    
    // Identify if the current segment is an advertisement
    const isAdActive = document.querySelector('.ad-showing') || 
                       document.querySelector('.video-ads .ytp-ad-module');

    if (isAdActive && video) {
        // STRATEGY: Fast-forward the ad to the very end
        // This effectively completes the ad segment instantly
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
            
            // Check if current time is not already at the end to prevent loops
            if (video.currentTime < video.duration - 0.1) {
                video.currentTime = video.duration; 
                console.log("Segment optimized: Fast-forwarded to end.");
            }
        }

        // BACKUP: Interact with UI elements if teleportation is delayed
        const actionBtn = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
        if (actionBtn) {
            // Directly invoke the click method from the HTMLElement prototype
            HTMLElement.prototype.click.call(actionBtn);
            console.log("Interaction triggered: Skip button initiated.");
        }

        // Mute the audio during the optimization process
        video.muted = true;
    }
};

// Polling interval set to 50ms for high-speed responsiveness
setInterval(optimizePlayback, 50);