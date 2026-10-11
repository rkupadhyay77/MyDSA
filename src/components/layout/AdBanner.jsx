import { useEffect, useRef } from 'react';
import { useRouter } from '../../app/router.jsx';

const ADSENSE_CLIENT_ID = 'ca-pub-4535665839114092';

/**
 * Bottom Responsive Google AdSense Banner Component
 *
 * - Renders a responsive horizontal display ad unit at the bottom of pages.
 * - Safely initialises (window.adsbygoogle = window.adsbygoogle || []).push({})
 *   while avoiding duplicate pushes in React 19 StrictMode.
 */
export default function AdBanner({ slot = 'auto' }) {
  const { path } = useRouter();
  const adRef = useRef(null);
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  useEffect(() => {
    try {
      if (
        adRef.current &&
        !adRef.current.getAttribute('data-adsbygoogle-status')
      ) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ad blockers or localhost dev mode may block adsbygoogle; fail gracefully
      console.debug('AdSense init note:', err?.message);
    }
  }, [path]);

  return (
    <div className="bottom-ad-container" aria-label="Sponsored Advertisement">
      <div className="bottom-ad-inner">
        <div className="bottom-ad-header">
          <span className="ad-label-tag">Sponsored Advertisement</span>
          {isLocalhost && (
            <span className="ad-dev-note">
              AdSense ({ADSENSE_CLIENT_ID}) — Live ads render on your public domain
            </span>
          )}
        </div>

        {/* Google AdSense Responsive Display Unit */}
        <ins
          ref={adRef}
          key={path}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px', width: '100%' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest={isLocalhost ? 'on' : undefined}
        />
      </div>
    </div>
  );
}
