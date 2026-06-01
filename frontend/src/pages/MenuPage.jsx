import { useEffect, useState } from 'react';
import { fetchToday, fetchBanners } from '../api';
import AdBanner from '../components/AdBanner';
import RestaurantCard from '../components/RestaurantCard';
import dayjs from 'dayjs';

const FILTERS = [
  { key: 'all',     label: '전체' },
  { key: 'buffet',  label: '한식뷔페' },
  { key: 'korean',  label: '한식' },
  { key: 'chinese', label: '중식' },
  { key: 'japanese',label: '일식' },
  { key: 'western', label: '양식' },
];

export default function MenuPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [banner,      setBanner]      = useState(null);
  const [filter,      setFilter]      = useState('all');
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    fetchToday().then(res => {
      setRestaurants(res.data.restaurants);
      setLoading(false);
    });
    fetchBanners().then(res => {
      if (res.data.length > 0) setBanner(res.data[0]);
    });
  }, []);

  const filtered = filter === 'all'
    ? restaurants
    : restaurants.filter(r => r.category === filter);

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f7f7f5' }}>
      <AdBanner banner={banner} />

      <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>
          오늘 뭐 먹지? <span style={{ color: '#e94560' }}>점심픽</span>
        </div>
        <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>
          근처 식당 오늘의 메뉴를 한눈에
        </div>
      </div>

      <div style={{
        padding: '12px 24px', background: '#fff',
        borderBottom: '1px solid #eee',
        display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{
          background: '#e94560', color: '#fff',
          fontSize: 12, fontWeight: 600,
          padding: '5px 12px', borderRadius: 20,
        }}>
          {dayjs().format('M월 D일')} 점심
        </span>
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            background: filter === f.key ? '#1a1a2e' : '#fff',
            color:      filter === f.key ? '#fff'    : '#666',
            border: `1px solid ${filter === f.key ? '#1a1a2e' : '#ddd'}`,
            fontSize: 12, padding: '5px 12px',
            borderRadius: 20, cursor: 'pointer',
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#aaa' }}>
          메뉴 불러오는 중...
        </div>
      ) : (
        <div style={{
          padding: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          {filtered.length === 0 && (
            <div style={{ color: '#aaa', padding: 40, gridColumn: '1/-1', textAlign: 'center' }}>
              등록된 식당이 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}