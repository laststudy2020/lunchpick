export default function AdBanner({ banner }) {
  if (!banner) return null;
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '3px solid #e94560',
    }}>
      <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>
        {banner.company_name.slice(0, -2)}
        <span style={{ color: '#e94560' }}>
          {banner.company_name.slice(-2)}
        </span>
      </div>
      <div style={{ color: '#a8b2d8', fontSize: 13, flex: 1, textAlign: 'center' }}>
        {banner.tagline}
      </div>
      <div style={{
        background: '#e94560', color: '#fff', fontSize: 11,
        fontWeight: 600, padding: '4px 10px', borderRadius: 20,
      }}>
        📞 {banner.phone}
      </div>
    </div>
  );
}