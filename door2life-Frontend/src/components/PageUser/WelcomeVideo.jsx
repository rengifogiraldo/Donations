import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const WelcomeVideo = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Cargar el script de Vimeo después de que el componente se monte
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Limpiar el script cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 shadow-xl max-w-[100%] rounded-md">
      <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        {t("Bienvenido a Opening Doors 2 Life")}
      </h1>
      <div className="w-full max-w-4xl mx-auto">
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe 
            src="https://player.vimeo.com/video/1066956095?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            title="2 - 50 usd - NUEVO  OPE 50 JUAN MARZO 9 2025"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WelcomeVideo;