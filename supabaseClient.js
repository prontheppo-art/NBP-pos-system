// ========================================================
// FILE: supabaseClient.js
// Description: Supabase Client Initialization
// ========================================================

const SUPABASE_URL = 'https://wmhweeeyulhmoilypklz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yXKK7aSunM_KCqRiUhGupQ__Qs1nyCd';

if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase Client initialized successfully');
} else {
    console.error('❌ ไม่พบ Supabase SDK! กรุณาตรวจสอบว่าได้ใส่ CDN ของ Supabase ก่อนไฟล์นี้ในหน้า HTML');
}
    