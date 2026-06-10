type GoogleMapFallbackProps = {
  title: string;
  query: string;
  className: string;
};

const GoogleMapFallback = ({ title, query, className }: GoogleMapFallbackProps) => (
  <iframe
    title={title}
    aria-label={title}
    src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className={className}
  />
);

export default GoogleMapFallback;