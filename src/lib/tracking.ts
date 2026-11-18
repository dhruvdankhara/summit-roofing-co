// Whop Pixel Telemetry & Custom Event Tracking

declare global {
  interface Window {
    whop?: {
      track: (eventName: string, data?: Record<string, any>) => void;
      [key: string]: any;
    };
  }
}

export type WhopTrackingEvent = 'estimate_requested' | 'service_viewed' | 'deposit_started';

export interface PixelEventDetail {
  event: WhopTrackingEvent;
  payload: Record<string, any>;
  timestamp: string;
}

export function trackWhopEvent(
  event: WhopTrackingEvent,
  payload: Record<string, any> = {}
): void {
  const timestamp = new Date().toISOString();

  // 1. Execute Whop global pixel tracker if available
  if (typeof window !== 'undefined' && window.whop && typeof window.whop.track === 'function') {
    try {
      window.whop.track(event, payload);
    } catch (err) {
      console.warn('[Whop Pixel] Failed to track on window.whop:', err);
    }
  } else {
    // Development console indicator
    console.log(`[Whop Pixel Event] -> ${event}`, payload);
  }

  // 2. Dispatch browser CustomEvent for the Live Telemetry HUD
  if (typeof window !== 'undefined') {
    try {
      const customEvent = new CustomEvent<PixelEventDetail>('whop-pixel-fired', {
        detail: {
          event,
          payload,
          timestamp,
        },
      });
      window.dispatchEvent(customEvent);
    } catch (err) {
      console.warn('[Whop Pixel] Failed to dispatch CustomEvent:', err);
    }
  }
}
