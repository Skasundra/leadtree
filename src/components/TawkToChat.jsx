import { useEffect } from 'react';

export const TawkToChat = () => {
  useEffect(() => {
    // Tawk.to script integration
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    (function() {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      
      s1.async = true;
      s1.src = 'https://embed.tawk.to/68e4db4e36ce7e19507dc2c4/1j6uvhb3f';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Cleanup function
    return () => {
      // Remove Tawk.to widget on component unmount
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};
