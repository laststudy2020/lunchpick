const CATEGORY_LABEL = {
  korean: '한식', chinese: '중식', japanese: '일식',
  western: '양식', buffet: '한식뷔페', other: '기타',
};

const CATEGORY_STYLE = {
  korean:   { background: '#FAEEDA', color: '#854F0B' },
  chinese:  { background: '#FCEBEB', color: '#A32D2D' },
  japanese: { background: '#FBEAF0', color: '#993556' },
  western:  { background: '#EEEDFE', color: '#534AB7' },
  buffet:   { background: '#E1F5EE', color: '#0F6E56' },
  other:    { background: '#F1EFE8', color: '#5F5E5A' },
};

export default function RestaurantCard({ restaurant }) {
  const { name, category, distance, price_range,
          is_open, fixed_menus, daily_menus } = restaurant;
  const menus   = daily_menus.length > 0 ? daily_menus : fixed_menus;
  const isDaily = daily_menus.length > 0;

  return (
    <div style={{
      background: '#fff', border: '1px solid #eee',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{name}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, padding: '2px 7px', borderRadius: 10,
              fontWeight: 500, ...CATEGORY_STYLE[category],
            }}>
              {CATEGORY_LABEL[category]}
            </span>
            <span style={{ fontSize: 11, color: '#999' }}>📍 {distance}</span>
          </div>
        </div>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', marginTop: 5,
          background: is_open ? '#1D9E75' : '#E24B4A',
        }}/>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
          {isDaily ? '🗓 오늘의 메뉴' : '📋 고정 메뉴'}
        </div>
        {menus.slice(0, 4).map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '5px 0', borderBottom: '1px solid #f5f5f5',
            fontSize: 13,
          }}>
            <span>{m.name}</span>
            <span style={{ color: '#888' }}>{m.price}</span>
          </div>
        ))}
      </div>

      <div style={{
        padding: '10px 16px', background: '#fafafa',
        borderTop: '1px solid #f0f0f0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{price_range}</span>
        <span style={{ fontSize: 11, color: is_open ? '#0F6E56' : '#A32D2D' }}>
          {is_open ? '● 영업중' : '● 영업종료'}
        </span>
      </div>
    </div>
  );
}